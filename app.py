from quart import Quart, websocket, jsonify
import asyncio
import faker
from marshmallow import Schema, fields

app = Quart(__name__)
clients = set()

class ItemSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)

fake = faker.Faker()
items = [{"id": i, "name": fake.word().capitalize(), "description": fake.sentence()} for i in range(1, 101)]
item_schema = ItemSchema(many=True)

async def broadcast(message):
    for ws in clients:
        await ws.send(message)

@app.websocket('/ws')
async def ws():
    clients.add(websocket._get_current_object())
    try:
        await websocket.send(item_schema.dumps(items))
        while True:
            data = await websocket.receive_json()
            action = data.get('action')
            item_data = data.get('data')

            if action == 'create':
                new_id = max(item['id'] for item in items) + 1 if items else 1
                new_item = {"id": new_id, **item_data}
                items.append(new_item)
                await broadcast(item_schema.dumps(items))
            elif action == 'update':
                for index, item in enumerate(items):
                    if item['id'] == item_data['id']:
                        items[index].update(item_data)
                        break
                await broadcast(item_schema.dumps(items))
            elif action == 'delete':
                items[:] = [item for item in items if item['id'] != item_data['id']]
                await broadcast(item_schema.dumps(items))
    finally:
        clients.remove(websocket._get_current_object())

if __name__ == '__main__':
    app.run(debug=True, port=5000)

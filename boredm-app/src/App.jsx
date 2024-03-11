import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useWebSocket } from './useWebSocket';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './App.css';

function App() {
  const { data, send } = useWebSocket('ws://127.0.0.1:8000/ws');
  const [open, setOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({ id: null, name: '', description: '' });

  const handleOpen = () => {
    setItemToEdit({ id: null, name: '', description: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemToEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateItem = () => {
    if (itemToEdit.id === null) {
      send('create', { name: itemToEdit.name, description: itemToEdit.description });
    } else {
      send('update', itemToEdit);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    send('delete', { id });
  };

  const startEditItem = (item) => {
    setItemToEdit(item);
    setOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => startEditItem(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
    <h3>RealSync Grid: A Real-Time Collaborative Data Management Platform</h3>
    <div style={{ height: '75vh', width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Item
      </Button>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{itemToEdit.id ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={itemToEdit.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={itemToEdit.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddOrUpdateItem}>{itemToEdit.id ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

export default App;

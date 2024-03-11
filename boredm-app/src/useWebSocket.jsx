import { useCallback, useEffect, useRef, useState } from 'react';

export const useWebSocket = (url) => {
  const [data, setData] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(url);
    
    socket.current.onopen = () => {
      console.log("WebSocket Connected");
    };
    
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(message);
    };
    
    socket.current.onclose = () => console.log("Disconnected from WebSocket");
    
    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [url]);

  const send = useCallback((action, itemData) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ action, data: itemData }));
    } else {
      console.error("WebSocket is not connected.");
    }
  }, []);

  return { data, send };
};

export default useWebSocket;

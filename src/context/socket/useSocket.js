import io from "socket.io-client";
import { useState, useEffect } from "react";

function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  }, []);

  return socket;
}

export { useSocket };

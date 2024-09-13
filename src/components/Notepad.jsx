import React, { useEffect, useState } from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { io } from 'socket.io-client';

const Notepad = () => {
  const [note, setNote] = useState('');
  const [socket, setSocket] = useState(null); // Track socket instance

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SERVER_URL); // Create socket connection
    setSocket(newSocket);

    newSocket.on('noteUpdate', (updatedNote) => {
      setNote(updatedNote);
    });

    return () => {
      newSocket.off('noteUpdate'); // Clean up listeners
      newSocket.disconnect(); // Close socket connection on unmount
    };
  }, []);

  const handleChange = (e) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);
    socket?.emit('noteUpdate', updatedNote); // Emit only if socket exists
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" h="full">
      <Textarea
        value={note}
        onChange={handleChange}
        placeholder="Start typing..."
        size="lg"
        height="100%"
        borderRadius="md"
        _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
      />
    </Box>
  );
};

export default Notepad;


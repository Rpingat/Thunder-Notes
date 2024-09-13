import React, { useEffect, useState } from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { io } from 'socket.io-client';

const serverUrl = import.meta.env.VITE_SERVER_URL;
const socket = io(serverUrl);

const Notepad = () => {
  const [note, setNote] = useState('');

  useEffect(() => {
    socket.on('noteUpdate', (updatedNote) => {
      setNote(updatedNote);
    });

    return () => {
      socket.off('noteUpdate');
    };
  }, []);

  const handleChange = (e) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);
    socket.emit('noteUpdate', updatedNote);
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


import React, { useEffect, useState } from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { supabase } from '../supabaseClient'; // Correct Supabase import

const Notepad = ({ isLoggedIn, user }) => {
  const [note, setNote] = useState('');
  const [socket, setSocket] = useState(null); // Track socket instance

  useEffect(() => {
    const loadNotes = async () => {
      if (isLoggedIn && user) {
        // Load notes from Supabase for authenticated users
        loadNotesFromSupabase(user.id);
      } else {
        // Load notes from localStorage for anonymous users
        const localNote = localStorage.getItem('note');
        if (localNote) setNote(localNote);
      }
    };

    loadNotes();

    const newSocket = io(import.meta.env.VITE_SERVER_URL);
    setSocket(newSocket);

    newSocket.on('noteUpdate', (updatedNote) => {
      setNote(updatedNote);
      if (!isLoggedIn) {
        localStorage.setItem('note', updatedNote); // Save to localStorage for anonymous users
      }
    });

    return () => {
      newSocket.off('noteUpdate'); // Clean up listeners
      newSocket.disconnect(); // Close socket connection on unmount
    };
  }, [isLoggedIn, user]);

  const loadNotesFromSupabase = async (userId) => {
    const { data, error } = await supabase
      .from('notes')
      .select('content')
      .eq('user_id', userId)
      .single();
    if (data) setNote(data.content);
  };

  const saveNoteToSupabase = async (updatedNote) => {
    const { error } = await supabase
      .from('notes')
      .upsert({ user_id: user.id, content: updatedNote });
    if (error) {
      console.error('Error saving note to Supabase:', error.message);
    }
  };

  const handleChange = (e) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);

    if (isLoggedIn && user) {
      socket.emit('noteUpdate', updatedNote); // Broadcast update to server
      saveNoteToSupabase(updatedNote); // Save note to Supabase
    } else {
      localStorage.setItem('note', updatedNote); // Save locally for anonymous users
      socket.emit('noteUpdate', updatedNote); // Broadcast update to server
    }
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


import React, { useCallback, useEffect, useState } from 'react';
import { Box, Textarea, Spinner, useToast } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { supabase } from '../supabaseClient';

const Notepad = ({ isLoggedIn, user }) => {
  const [note, setNote] = useState('');
  const [socket, setSocket] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const loadNotes = async () => {
      if (isLoggedIn && user) {
        try {
          const { data, error } = await supabase
            .from('notes')
            .select('content')
            .eq('user_id', user.id)
            .single();
          if (error) throw error;
          if (data) setNote(data.content);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load notes.",
            status: "error",
          });
        }
      } else {
        const localNote = localStorage.getItem('note');
        if (localNote) setNote(localNote);
      }
    };

    loadNotes();

    if (isLoggedIn) {
      const newSocket = io(import.meta.env.VITE_SERVER_URL);
      setSocket(newSocket);

      newSocket.on('noteUpdate', (updatedNote) => {
        setNote(updatedNote);
        if (!isLoggedIn) {
          localStorage.setItem('note', updatedNote);
        }
      });

      return () => {
        newSocket.off('noteUpdate');
        newSocket.disconnect();
      };
    }
  }, [isLoggedIn, user, toast]);

  const saveNoteToSupabase = useCallback(async (updatedNote) => {
    try {
      const { error } = await supabase
        .from('notes')
        .upsert({ user_id: user.id, content: updatedNote });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save note.",
        status: "error",
      });
    }
  }, [user, toast]);

  const handleChange = (e) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);

    if (isLoggedIn && user) {
      socket.emit('noteUpdate', updatedNote);
      saveNoteToSupabase(updatedNote);
    } else {
      localStorage.setItem('note', updatedNote);
      if (socket) {
        socket.emit('noteUpdate', updatedNote);
      }
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


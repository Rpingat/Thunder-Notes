import express from 'express';
import path from 'path';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route - Serve the React app for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// File path where notes will be saved on the server
const notesFilePath = path.join(__dirname, 'notes.txt');

// Function to save notes to the server file system
const saveNoteToFile = (note) => {
  fs.writeFileSync(notesFilePath, note, 'utf8', (err) => {
    if (err) {
      console.error('Error saving note to server file:', err);
    }
  });
};

// Set up Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('noteUpdate', (data) => {
    // Handle note updates from clients
    socket.broadcast.emit('noteUpdate', data);

    // Save the note on the server
    saveNoteToFile(data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


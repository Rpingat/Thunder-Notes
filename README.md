Thunder Notes
=============

Overview
------
The Notepad App is a real-time collaborative note-taking application built with React, Chakra UI, and Socket.IO. It supports authentication via Supabase and allows users to synchronize notes in real-time. The application is served via an Express server, which also handles Socket.IO connections.

Features
------
• Real-Time Collaboration: Notes are synchronized across all clients in real-time using Socket.IO.

• Theming: Switch between light, dark, and yellow themes using Chakra UI.

• Authentication: Users can log in or sign up using Supabase.

• Local Storage: Unauthenticated users can save notes locally.

Frameworks Used
------
Frontend: React, Chakra UI

Backend: Express, Socket.IO

Database: Supabase

Deployment: Vite for building the React app, PM2 for process management

Getting Started
-----

Prerequisites

#Node.js (version 16 or higher)
#npm (version 7 or higher)

Installation
----
Clone the repository

```bash
git clone https://github.com/rpingat/ThunderNotes.git
cd ThunderNotes
npm install #Install dependencies for the server
```
Configuration
------
Set up Supabase

Create a Supabase project at supabase.io.

Obtain the supabaseUrl and supabaseKey from your Supabase project.

Update these values in src/supabaseClient.js and server.js.

Environment Variables
----
If needed, create a .env file in the server directory and set the following environment variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SERVER_URL=your_server_url
```
Running the Application
----
Build and start the application
```
npm run build
node server.js
```
Alternatively, if using PM2 to manage the server:
```
pm2 start server.js --name notepad
```

Usage
----
Access the Application: Navigate to http://localhost:5000 (or your server's address) to use the notepad app.

Authentication: Users can log in or sign up via Supabase. For unauthenticated users, notes are saved locally.

Real-Time Collaboration: Notes are synchronized in real-time for authenticated users through Socket.IO.

Theming: Switch between light, dark, and yellow themes using the theme toggle button in the UI.

Contributing
-----
Fork the repository

Create a new branch: ```git checkout -b feature-branch```

Commit your changes: ```git commit -am 'Add new feature'```

Push to the branch: ```git push origin feature-branch```

Create a new Pull Request

License
---
This project is licensed under the MIT License. See the LICENSE file for details.

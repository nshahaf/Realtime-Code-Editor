# Collaborative online coding platform

## Objective
**The goal is to create a collaborative online coding platform with real-time features, including:**

- A lobby page where users choose a code block. 
- Code block pages where mentor and students can interact with code. 
- Real-time updates using sockets. 
- Syntax highlighting  
- code Solution validation.
- Managing and displaying user roles (mentor | student). 

## Required Features
### 1. Lobby Page:

- Title: "Choose code block". [x]
- List of at least 4 code blocks stored in a database. [x]
- Clicking on an item redirects to the corresponding code block page. [x]

### 2. Code Block Page:
- Title [x], text editor [x], and role indicator. [x]
- Role Logic:
    - The first user on a code block page becomes the mentor. [x]
    - Subsequent users are students. [x]
- Mentor:
    - Read-only view of the code block. [x]
- Students:
    - Editable code block with syntax highlighting. [x]
    - Updates are displayed in real-time via sockets. [x]
- Solution Check:
    - Compare the student’s code to a predefined solution. [x]
    - Display a big smiley face upon match. [x]

### 3. Real-time Features:
- Updates through a socket-based system (e.g., Socket.IO). [x]
- Show the count of students in the room. [x]

### Backend
- **Framework:** Node.js with Express 
- **Real-time Communication:** Socket.IO for WebSocket implementation.
- **Database:** MongoDB with mongoose library for integration and access

### Frontend
- **Framework:** Vite + React with CSS Modules for scoped styling

#### EndPoints
- **GET /codeblocks**: Retrieve all code blocks for the lobby page.
- **GET /codeblocks/:id**: Retrieve details of a specific code block (id, title, initial template, solution).

#### Socket Events:
- **connection:** open socket connection between server and client.
- **Join/Leave Room:** Track users entering/leaving a code block page.
- **code changes** Emit code changes to other connected clients in the same room.
- **code reset** to reset after succesfullt compliting the task.
- **code solved** to notify when the solution is valid.
- **Mentor Disconnect:** Notify students and redirect back to the lobby. (unsave code changes)
- **Discconection** when socket disconnect

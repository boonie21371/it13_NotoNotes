const express = require('express');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    keys: ['5dV&4vY$2zG8sH*L'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_noto',
});

//main note functionality (crud)

app.get('/notes', (request, response) => {
  const user = request.session.user;

  if (user) {
    const user_id = user.user_id;
    const sql = 'SELECT * FROM notes WHERE user_id = ?';
    db.query(sql, [user_id], (error, data) => {
      if (error) {
        console.error('Error fetching notes:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      } else {
        response.status(200).json(data);
      }
    });
  } else {
    const sql = 'SELECT * FROM notes WHERE user_id IS NULL';
    db.query(sql, (error, data) => {
      if (error) {
        console.error('Error fetching notes:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      } else {
        response.status(200).json(data);
      }
    });
  }
});

app.post('/add_note', (request, response) => {
  const { note_id, note, note_date } = request.body;

  if (request.session.user) {
    // If the user is logged in, use the user_id from the session
    const user_id = request.session.user.user_id;

    const sql = 'INSERT INTO notes (note_id, note, note_date, user_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [note_id, note, note_date, user_id], (error, result) => {
      if (error) {
        console.error('Error adding note:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Note added successfully');
        response.status(200).json({ message: 'Note added successfully' });
      }
    });
  } else {
    // If there's no user session, save user_id as null
    const sql = 'INSERT INTO notes (note_id, note, note_date, user_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [note_id, note, note_date, null], (error, result) => {
      if (error) {
        console.error('Error adding note:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Note added successfully');
        response.status(200).json({ message: 'Note added successfully' });
      }
    });
  }
});

app.delete('/delete_note/:noteId', (request, response) => {
  const noteId = request.params.noteId;

  // Add your database logic to delete the note with the specified noteId
  const sql = 'DELETE FROM notes WHERE note_id = ?';
  db.query(sql, [noteId], (error, result) => {
    if (error) {
      console.error('Error deleting note:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Check if any rows were affected
      if (result.affectedRows > 0) {
        response.send('Note Deleted Successfully!');
      } else {
        response.status(404).json({ error: 'Note not found' });
      }
    }
  });
});

app.put('/update_note/:noteId', (request, response) => {
  const { noteId } = request.params;
  const { note, note_date } = request.body;

  const sql = 'UPDATE notes SET note = ?, note_date = ? WHERE note_id = ?';

  db.query(sql, [note, note_date, noteId], (error, result) => {
    if (error) {
      console.error('Error updating note:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    } else {
      response.status(200).json({ message: 'Note updated successfully' });
    }
  });
});



//sign in & sign up

app.post('/sign_up', (request, response) => {
    const { user_id, username, email, password } = request.body;
    const sql = 'INSERT INTO user (user_id, user_name, user_email, user_pass) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, username, email, password], (error, result) => {
        if (error) {
            console.error('Error adding user:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            response.send('User Added Successfully!');
        }
    });
});


app.post('/sign_in', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM user WHERE user_name = ? AND user_pass = ?';

  db.query(sql, [username, password], (error, results) => {
    if (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        req.session.user = results[0];
        console.log('User logged in:', results[0]);
        res.json({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

app.post('/sign_out', (req, res) => {
  req.session = null; // Clear the session data
  res.status(200).json({ message: 'Logout successful' });
});

// Example login status check route
app.get('/sign_check', (req, res) => {
  const isLoggedIn = !!req.session.user;
  res.json({ isLoggedIn });
});

app.listen(8081, () => {
  console.log('Listening...');
});

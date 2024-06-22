import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import NoteList from "./NoteList";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import "./css/Note.css";

interface Note {
  note_id: string;
  note: string;
  note_date: string;
  user_id: string | null;
}

function Note() {
  const [showAddNote, setShowAddNote] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [editedNote, setEditedNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const toggleAddNote = () => {
    setShowAddNote(!showAddNote);
  };

  const toggleEditNote = (note: SetStateAction<null>) => {
    setEditedNote(note);
    setShowEditNote(!showEditNote);
  };

  const handleSaveNote = async (noteData: any) => {
    try {
      const currentDate = new Date().toISOString();

      const updatedNoteData = {
        ...noteData,
        note_date: currentDate,
      };

      const response = await fetch("http://localhost:8081/add_note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNoteData),
      });

      if (!response.ok) {
        console.error("Failed to save note:", response.statusText);
      } else {
        console.log("Note saved successfully:", updatedNoteData);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/sign_out",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Logout Successful:", response.data);
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8081/sign_check", {
        withCredentials: true,
      });
      console.log("Login status check:", response.data.isLoggedIn);
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleSignIn = () => {
    navigate("/sign_in");
  };

  const handleEditNoteUpdate = (updatedNote: Note | null) => {
    if (updatedNote) {
      console.log("Updated note:", updatedNote);
    }
  };

  return (
    <div>
      <Container>
        <div className="header-container">
          <h1>Noto Notes</h1>
          {isLoggedIn ? (
            <Button onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </Button>
          ) : (
            <Button onClick={handleSignIn}>
              <i className="fas fa-user"></i> Sign In
            </Button>
          )}
        </div>
      </Container>

      {/* AddNote */}
      <Container className="mt-4">
        <Button onClick={toggleAddNote}>
          <i className="fas fa-sticky-note"></i> Add Note
        </Button>
        {showAddNote && (
          <AddNote onClose={toggleAddNote} onSave={handleSaveNote} />
        )}
      </Container>

      {/* EditNote Popup */}
      {showEditNote && (
        <Container className="edit-note-popup">
          <EditNote
            noteData={editedNote}
            onClose={() => setShowEditNote(false)}
            onUpdate={handleEditNoteUpdate}
          />
        </Container>
      )}

      {/* NoteList */}
      <Container className="mt-4">
        <NoteList onEditNote={toggleEditNote} />
      </Container>
    </div>
  );
}

export default Note;

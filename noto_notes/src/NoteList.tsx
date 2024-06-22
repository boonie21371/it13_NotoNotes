import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/NoteList.css";

interface Note {
  note_id: string;
  note: string;
  note_img: string | null;
  note_date: string;
  user_id: string | null;
}

interface NoteListProps {
  onEditNote: (note: any) => void;
}

const NoteList: React.FC<NoteListProps> = ({ onEditNote }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user_id, setUser_id] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8081/user", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser_id(userData.user_id);
        } else {
          setUser_id(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser_id(null);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8081/notes", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched notes:", data);

          if (user_id) {
            const filteredNotes = data.filter(
              (note: Note) => note.user_id === user_id
            );
            setNotes(filteredNotes);
          } else {
            setNotes(data);
          }
        } else {
          console.error("Error fetching notes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchUserData()
      .then(() => {
        fetchNotes();
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser_id(null);
      });
  }, [user_id]);

  const handleDeleteNote = async (noteId: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (shouldDelete) {
      try {
        const response = await fetch(
          `http://localhost:8081/delete_note/${noteId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          console.error("Failed to delete note:", response.statusText);
        } else {
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note.note_id !== noteId)
          );
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <div className="note-list-container mt-4">
      {notes.length === 0 ? (
        <h4>No notes saved yet :(</h4>
      ) : (
        notes.map((note) => (
          <div key={note.note_id} className="note-item">
            <ReactQuill value={note.note} readOnly={true} theme="snow" />
            {note.note_img && <img src={note.note_img} alt="Note Image" />}
            <div className="timestamp">{formatTimestamp(note.note_date)}</div>
            <div className="action-buttons">
              <Button
                variant="outline-primary"
                className="edit-button"
                onClick={() => onEditNote(note)}
              >
                <i className="fas fa-edit"></i>
              </Button>
              <Button
                variant="outline-danger"
                className="delete-button"
                onClick={() => handleDeleteNote(note.note_id)}
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const formattedDate = `${padZero(date.getDate())}/${padZero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
  const formattedTime = `${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}`;
  return `${formattedDate} ${formattedTime}`;
};

const padZero = (value: number) => (value < 10 ? `0${value}` : value);

export default NoteList;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/EditNote.css";
import { Container } from "react-bootstrap";

interface NoteData {
  note_id: string;
  note: string;
  note_date: string;
  user_id: string | null;
}

interface EditNoteProps {
  noteData: NoteData | null;
  onClose: () => void;
  onUpdate: (updatedNote: NoteData) => void;
}

const EditNote: React.FC<EditNoteProps> = ({ noteData, onClose, onUpdate }) => {
  const [editedNote, setEditedNote] = useState<NoteData | null>(null);

  useEffect(() => {
    if (noteData) {
      setEditedNote({ ...noteData });
    }
  }, [noteData]);

  const handleUpdate = async () => {
    try {
      if (editedNote) {
        const response = await fetch(
          `http://localhost:8081/update_note/${editedNote.note_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              note: editedNote.note,
              note_date: editedNote.note_date,
            }),
          }
        );

        if (!response.ok) {
          console.error("Failed to update note:", response.statusText);
        } else {
          onUpdate(editedNote);
          onClose();
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="edit-note-container">
      {editedNote && (
        <>
          <ReactQuill
            value={editedNote.note}
            onChange={(value) =>
              setEditedNote({
                ...editedNote,
                note: value,
              })
            }
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
              ],
            }}
          />
          <Container>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={onClose}>Cancel</button>
          </Container>
        </>
      )}
    </div>
  );
};

export default EditNote;

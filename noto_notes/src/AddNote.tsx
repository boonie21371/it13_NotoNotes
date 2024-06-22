import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/AddNote.css";

interface AddNoteProps {
  onClose: () => void;
  onSave: (noteData: any) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ onClose }) => {
  const [newNote, setNewNote] = useState("");

  const generateRandomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    for (let i = 0; i < 8; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomId;
  };

  const handleSave = async () => {
    const randomNoteId = generateRandomId();

    const currentDate = new Date().toISOString();

    try {
      const response = await fetch("http://localhost:8081/add_note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          note_id: randomNoteId,
          note: newNote,
          note_date: currentDate,
          user_id: null,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save note:", response.statusText);
      } else {
        const responseData = await response.json();
        console.log("Note saved successfully:", responseData);
        window.location.reload();
        onClose();
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="add-note-container">
      <ReactQuill
        value={newNote}
        onChange={setNewNote}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        }}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddNote;

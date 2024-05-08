import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote, editNote } from "../redux/slices/notesSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const NoteForm = ({ note, onSave }) => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // When a note is provided for editing, populate the fields with its data
    if (note) {
      setInput(note.content);
      setTags(note.tags.join(", "));
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTags = tags.split(",")
                       .map(tag => tag.trim().toLowerCase());
    
    if (note) {
      // Editing existing note
      dispatch(editNote({
        ...note,
        content: input,
        tags: newTags,
      }));
    } else {
      // Adding a new note
      const createdDate = new Date().toISOString();
      dispatch(addNote({
        content: input,
        tags: newTags,
        id: Date.now(), // Normally, you would want a more robust method to generate IDs
        createdDate
      }));
    }

    setInput("");
    setTags("");
    if (onSave) onSave(); // If an onSave callback is provided, call it
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, width: "100%" }}>
      <TextField
        label="Add a new note..."
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Tags (comma-separated)"
        variant="outlined"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {note ? "Update Note" : "Add Note"}
      </Button>
    </Box>
  );
};

export default NoteForm;

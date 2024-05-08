import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotes, deleteNote } from '../redux/slices/notesSlice';
import { List, ListItem, ListItemText, Typography, Divider, Paper, Button, Box, Dialog, DialogContent } from '@mui/material';
import NoteForm from './NoteForm';

const NoteList = () => {
    const notes = useSelector(selectNotes);
    const dispatch = useDispatch();
    const [editNote, setEditNote] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            dispatch(deleteNote(id));
        }
    };

    const handleCloseEdit = () => {
        setEditNote(null);
    };

    return (
      <Paper elevation={1} sx={{ backgroundColor: '#f9f9f9', padding: 2 }}>
        <List component="nav" aria-label="notes list">
          {notes.map((note, index) => (
            <React.Fragment key={note.id}>
              <ListItem sx={{ backgroundColor: '#fff', my: 0.5, borderRadius: '4px', boxShadow: 1 }}>
                <ListItemText 
                  primary={
                    <Typography variant="body1">{note.content}</Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      {`Created: ${new Date(note.createdDate).toLocaleDateString()} - Tags: ${note.tags.join(', ')}`}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button onClick={() => setEditNote(note)} variant="outlined" size="small">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(note.id)} variant="outlined" size="small" color="error">
                    Delete
                  </Button>
                </Box>
              </ListItem>
              {index < notes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        {editNote && (
          <Dialog open={true} onClose={handleCloseEdit} fullWidth maxWidth="sm">
            <DialogContent>
              <NoteForm note={editNote} onSave={handleCloseEdit} />
            </DialogContent>
          </Dialog>
        )}
      </Paper>
    );
};

export default NoteList;

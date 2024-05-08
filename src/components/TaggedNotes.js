import React from 'react';
import { useSelector } from 'react-redux';
import { selectNotes } from '../redux/slices/notesSlice';
import { Typography, List, ListItem, ListItemText } from '@mui/material';


const TaggedNotes = () => {
    const notes = useSelector(selectNotes);
    const tags = notes.reduce((acc, note) => {
      note.tags.forEach(tag => {
        if (!acc.includes(tag)) acc.push(tag);
      });
      return acc;
    }, []);
  
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Notes by Tag
        </Typography>
        {tags.map(tag => (
          <List key={tag} subheader={<Typography variant="h6">{tag}</Typography>} style={{ margin: '20px 0' }}>
            {notes.filter(note => note.tags.includes(tag)).map(filteredNote => (
              <ListItem key={filteredNote.id} divider>
                <ListItemText
                  primary={<Typography variant="body1">{filteredNote.content}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        ))}
      </div>
    );
  };
  
  export default TaggedNotes;
  

import React from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import TaggedNotes from './components/TaggedNotes'; // New component for tag-based notes
import { Grid, Paper } from '@mui/material';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <NoteForm />
            <SearchBar />
          </Paper>
            <NoteList />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <TaggedNotes/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

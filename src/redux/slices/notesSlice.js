import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    searchQuery: '',
  },
  reducers: {
    addNote: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    },
    editNote: (state, action) => {
        const { id, content, tags } = action.payload;
        const existingNote = state.items.find(note => note.id === id);
        if (existingNote) {
          existingNote.content = content;
          if (tags) {
            existingNote.tags = tags;
          }
        }
      },
      deleteNote: (state, action) => {
        state.items = state.items.filter(note => note.id !== action.payload);
      },
    setSearchQuery: (state, action) => {

      return {
        ...state,
        searchQuery: action.payload
      };
    },
  },

});

export const { addNote, setSearchQuery ,editNote, deleteNote} = notesSlice.actions;

export const selectNotes = (state) => state.notes.items.filter(note =>
  note.content.toLowerCase().includes(state.notes.searchQuery.toLowerCase()) ||
  note.tags.some(tag => tag.toLowerCase().includes(state.notes.searchQuery.toLowerCase()))
);

export const selectSearchQuery = (state) => {
    return state.notes.searchQuery;
};
export default notesSlice.reducer;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/slices/notesSlice";
import { Button, TextField } from "@mui/material";

const SearchBar = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
  
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setInput(newValue);
      dispatch(setSearchQuery(newValue)); // Dispatch search query update as input changes
    };

    const handleSearch = () => {
      dispatch(setSearchQuery(input)); // Explicitly handle search, may not be necessary
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search notes..."
          value={input}
          onChange={handleInputChange} // Update input and dispatch Redux action on change
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch} // Handle explicit search (if additional logic is needed)
        >
          Search
        </Button>
      </div>
    );
  };
  
  export default SearchBar;

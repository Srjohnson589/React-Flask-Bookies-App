
import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar() => {

  return (
    <>  
        <input 
        type="text" 
        class="form-control form-rounded" 
        placeholder="Text input"></input>
        <SearchRoundedIcon />
    </>
  );
}

export default SearchBar


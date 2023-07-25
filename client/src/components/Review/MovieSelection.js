import * as React from 'react';
import { useState } from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { Select, MenuItem } from '@mui/material';

const MovieSelection = (props) => {

  const movieNames = props.movies.map((movie) => movie.name);

  return (
    <>
      <Typography variant="h6">Select a Movie:</Typography>
      <Select value={props.selectedMovie} onChange={props.onChangeSelectedMovies} sx={{ height: '45px', width: 450 }}>
      {movieNames.map((name) => (
          <MenuItem key={name} value={name}>{name}</MenuItem>
        ))}
      </Select>
    </>
  );
}

export default MovieSelection;
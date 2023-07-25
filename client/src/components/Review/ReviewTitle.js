import * as React from 'react';
import { useState } from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const ReviewTitle = (props) => {
  
  return (
    <>
    <Typography variant="h6">Review Title:</Typography>
    <TextField
      //label="Review Title"
      value={props.enteredTitle}
      onChange={props.onChangeEnteredTitle}
      variant="outlined"
      sx={{
        width: '90%',
        height: '70px', 
        '& .MuiOutlinedInput-root': {
          borderWidth: '5px', 
          borderRadius: '15px', 
        },
        '& .MuiOutlinedInput-inputMultiline': {
          padding: '13px', 
        },
      }}
    />

    </>
  );
}

export default ReviewTitle;
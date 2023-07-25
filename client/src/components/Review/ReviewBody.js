import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { TextField, Box } from '@mui/material';

const ReviewBody = (props) => {

  return (
    <>
      <Typography variant="h6">Enter a Review:</Typography>
      <TextField
        label="Enter Your Review Here:"
        value={props.enteredReview}
        onChange={props.onChangeEnteredReview}
        multiline
        rows={8}
        variant="outlined"
        sx={{
          width: '90%',
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
};

export default ReviewBody;
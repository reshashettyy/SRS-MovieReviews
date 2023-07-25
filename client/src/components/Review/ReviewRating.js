import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Rating from '@mui/material/Rating';


const ReviewRating = (props) => {

    return (
      <>
       <FormControl style={{width: '100%'}}>
        {<FormLabel style={{textAlign: 'left', font: 12}}>Movie Rating</FormLabel> }
        <RadioGroup
          row
          labelPlacement="bottom"
          value={props.selectedRating}
          onChange={props.onChangeEnteredRating}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="1"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="2"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="3"
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label="4"
          />
          <FormControlLabel
            value="5"
            control={<Radio />}
            label="5"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default ReviewRating;
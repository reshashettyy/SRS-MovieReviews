import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import { useState } from 'react';
import Button from '@mui/material/Button';

//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, Typography, createTheme, ThemeProvider, TextField, Box } from '@mui/material';
import { purple } from '@mui/material/colors';

let serverURL = "";


const Review = () => {

  const [userID, setUserID] = useState('1');

  const [movies, setMovies] = useState([]);
  const [movieID, setMovieID] = useState();
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  
  const [movieSelectionError, setMovieSelectionError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [reviewBodyError, setReviewBodyError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [correctSubmission, setCorrectSubmission] = useState(false);

  const [testEnteredTitle, setTestEnteredTitle] = useState("");
  const [testSelectedMovie, setTestSelectedMovie] = useState("");
  const [testEnteredReview, setTestEnteredReview] = useState("");
  const [testSelectedRating, setTestSelectedRating] = useState("");

  //Callback
  const onChangeSelectedMovies = (event) => {
    setSelectedMovie(event.target.value);
    setMovieSelectionError(false);
  }
  const onChangeEnteredTitle = (event) => {
    setEnteredTitle(event.target.value);
    setTitleError(false);
  }
  const onChangeEnteredReview = (event) => {
    setEnteredReview(event.target.value);
    setReviewBodyError(false);
  }
  const onChangeEnteredRating = (event) => {
    setSelectedRating(event.target.value);
    setRatingError(false);
  }

  const clearForm = () => {
    setSelectedMovie('');
    setEnteredTitle('');
    setEnteredReview('');
    setSelectedRating('');
    console.log("test if form cleared")
  };


  const handleSubmit = () => {


    if (selectedMovie === '') {
      setMovieSelectionError(true);
    }
    if (enteredTitle === '') {
      setTitleError(true);
    }
    if (enteredReview === '') {
      setReviewBodyError(true);
    }
    if (selectedRating === '') {
      setRatingError(true);
    }
    if (
      selectedMovie !== '' &&
      enteredTitle !== '' &&
      enteredReview !== '' &&
      selectedRating !== ''
    ) {
      setTestEnteredTitle(enteredTitle);
      setTestSelectedMovie(selectedMovie);
      setTestEnteredReview(enteredReview);
      setTestSelectedRating(selectedRating);
      setCorrectSubmission(true);
      callApiAddReview(reviewData);
      clearForm();
    }
    else {
      setCorrectSubmission(false);
    }
  };
  
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#800080',
      },
    },
  });

  const getMovieID = (movies, movieName) => {
    const movie = movies.find((m) => m.name === movieName);
    if (movie) {
      setMovieID(movie.id);
    }
  };

  React.useEffect(() => {
    getMovieID(movies, selectedMovie);
  }, [selectedMovie]);

  React.useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
    callApiLoadMovies(serverURL)
      .then(res => {
        console.log("callApiLoadRecipes returned: ", res)
        console.log("callApiLoadRecipes parsed: ", res);
        setMovies(res);
      })
  }

  //call movies API
  const callApiLoadMovies = async (serverURL) => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  }

  const reviewData = {
    movieId: movieID,
    userId: userID, 
    reviewTitle: enteredTitle,
    reviewContent: enteredReview,
    reviewScore: selectedRating
  };


const callApiAddReview = async (reviewData) => {
const url = serverURL + '/api/addReview';
console.log(url);

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(reviewData),
});

const body = await response.json();
if (response.status !== 200) throw Error(body.message);
return body;
};


  return (

    <>
    <Grid container>
    <ThemeProvider theme={theme}>
    <Grid item xs={12}>
            <Box
              p={4}
              height="50px"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="center"
              border="4px solid #800080"
            >
        <div style={{ marginBottom: 'auto' }}>
          <Typography variant="h3">Review A Movie!</Typography>
        </div>
        </Box>
      </Grid>
      </ThemeProvider>

      {/* Two columns */}
        <Grid item xs={9}>
        {/* Content for the 75% column */}
        <MovieSelection
            selectedMovie={selectedMovie}
            movies={movies}
            setSelectedMovie={setSelectedMovie}
            onChangeSelectedMovies={onChangeSelectedMovies}
            
          />
          {movieSelectionError && (
            <Typography variant="body2" color="error">
              Select your movie
            </Typography>
          )}
        <Grid item xs={12}>
            <ReviewTitle enteredTitle = {enteredTitle} setEnteredTitle={setEnteredTitle} onChangeEnteredTitle={onChangeEnteredTitle} />
            {titleError && (
              <Typography variant="body2" color="error">
                Enter your review title
              </Typography>
            )}
          </Grid>
        <Grid item xs={12}> 
        <ReviewBody enteredReview ={enteredReview} setEnteredReview={setEnteredReview} onChangeEnteredReview={onChangeEnteredReview} />
        {reviewBodyError && (
              <Typography variant="body2" color="error">
                Enter your review
              </Typography>
            )}
        </Grid> 
        <Grid item xs={12}>
            <ReviewRating setSelectedRating={setSelectedRating} onChangeEnteredRating={onChangeEnteredRating} selectedRating={selectedRating}/>
            {ratingError && (
              <Typography variant="body2" color="error">
                Select the rating
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained" style={{ backgroundColor: '#c2c3df'}}
                    onClick={handleSubmit} >
                Submit   

        </Button> 
        </Grid>
        {correctSubmission && (
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Your review has been received
              </Typography>
              <Typography variant="body1">
                Movie: {testSelectedMovie}
              </Typography>
              <Typography variant="body1">
                Title: {testEnteredTitle}
              </Typography>
              <Typography variant="body1">
                Review: {testEnteredReview}
              </Typography>
              <Typography variant="body1">
                Rating: {testSelectedRating}
              </Typography>
            </Grid>
          )}
        </Grid>

      <Grid item xs={3}>
        {/* 25% column */}
      </Grid>
    </Grid>
    </>
  );
}

export default Review;
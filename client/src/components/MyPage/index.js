import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Select, MenuItem, TextField, Button } from '@mui/material';

let serverURL = "";

const MyPage = () => {
  const navigate = useNavigate();

  const[intialMovies, setintialMovies] = useState([
    {
      id: 1,
      title: 'Hunger Games',
      description: 'A dystopian action-adventure film based on the novel by Suzanne Collins.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'The Notebook',
      description: 'A romantic drama film based on the novel by Nicholas Sparks.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Tangled',
      description: 'An animated musical adventure film from Walt Disney Studios.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'Divergent',
      description: 'A science fiction action film based on the novel by Veronica Roth.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      title: 'Miracles',
      description: 'A drama film based on the true story of a young girls miraculous recovery.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      title: 'Crazy Rich Asians',
      description: 'A romantic comedy-drama showcasing the opulent lifestyle of a wealthy family.',
      image: 'https://via.placeholder.com/150',
    },
    // {
    //   id: 7,
    //   title: 'Spiderman',
    //   description: 'A superhero film based on the Marvel Comics character.',
    //   image: 'https://via.placeholder.com/150',
    // },
    // {
    //   id: 8,
    //   title: 'Avengers',
    //   description: 'A blockbuster superhero film featuring a team of Marvel characters.',
    //   image: 'https://via.placeholder.com/150',
    // },
    // {
    //   id: 9,
    //   title: 'Batman',
    //   description: 'A superhero film based on the DC Comics character.',
    //   image: 'https://via.placeholder.com/150',
    // },
  ]);



    const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [trailerLink, setTrailerLink] = useState('');
  const [movieID, setMovieID] = useState();

  React.useEffect(() => {
    getMovieID(movies, selectedMovie);
  }, [selectedMovie]);

  React.useEffect(() => {
    loadMovies();
  }, []);

  const getMovieID = (movies, movieName) => {
    const movie = movies.find((m) => m.name === movieName);
    if (movie) {
      setMovieID(movie.id);
    }
  };

  const loadMovies = () => {
    callApiLoadMovies(serverURL)
      .then(res => {
        console.log("callApiLoadMovies returned: ", res)
        console.log("callApiLoadMovies parsed: ", res);
        setMovies(res);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
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


  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTrailerChange = (event) => {
    setTrailerLink(event.target.value);
  };

  const handleAddTrailer = () => {
    // Perform any action you want with the selected movie and trailer link
    console.log('Selected Movie:', selectedMovie);
    console.log('Trailer Link:', trailerLink);
    // Reset the input fields after adding the trailer
    setSelectedMovie('');
    setTrailerLink('');
  };


  const headingStyle = {
    background: '#E1F5FE',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  };

  const movieBoxStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
    background: '#f2f2f2', // Light gray background color
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.1)', // Shadow effect
    transition: 'transform 0.3s ease-in-out', 
  };

  const movieBoxHover = {
    transform: 'scale(1.1)',
  };

  const handleMouseEnter = (intialMovies) => {
    // Set the isHovered property to true for the hovered movie
    setintialMovies((prevMovies) =>
      prevMovies.map((m) => (m.id === intialMovies.id ? { ...m, isHovered: true } : m))
    );
  };

  const handleMouseLeave = (intialMovies) => {
    // Set the isHovered property to false for the unhovered movie
    setintialMovies((prevMovies) =>
      prevMovies.map((m) => (m.id === intialMovies.id ? { ...m, isHovered: false } : m))
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Landing
          </Typography>
          <Link
            color="inherit"
            style={{ cursor: 'pointer', marginRight: '20px' }}
            onClick={() => navigate('/')}
          >
            Landing
          </Link>
          <Link
            color="inherit"
            style={{ cursor: 'pointer', marginRight: '20px' }}
            onClick={() => navigate('/review')}
          >
            Review
          </Link>
          <Link
            color="inherit"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/search')}
          >
            Search
          </Link>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '20px' }}>
        <div style={headingStyle}>
          <Typography variant="h3" color="inherit" noWrap>
            My Page
          </Typography>
          <Typography variant="h5" color="inherit" noWrap>
            View and manage your favorite movies!
          </Typography>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            Top Movies
          </Typography>

          <Grid container spacing={2}>
            {intialMovies.map((intialMovies) => (
              <Grid key={intialMovies.id} item xs={12} sm={4}>
                <div
                  style={{
                    ...movieBoxStyle,
                    ...(intialMovies.isHovered ? movieBoxHover : null),
                  }}
                  onMouseEnter={() => handleMouseEnter(intialMovies)}
                  onMouseLeave={() => handleMouseLeave(intialMovies)}
                >
                  <img
                    src={intialMovies.image}
                    alt={intialMovies.name}
                    style={{ width: '80%', maxWidth: '150px', height: 'auto', filter: 'grayscale(100%)' }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {intialMovies.title}
                  </Typography>
                  <Typography variant="body2">{intialMovies.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            Add Movie Trailer
          </Typography>
          <div>
            <Select
              value={selectedMovie}
              onChange={handleMovieChange}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: '10px' }}
            >
              <MenuItem value="">
                <em>Select a movie</em>
              </MenuItem>
              {movies.map((movie) => (
                <MenuItem key={movie.id} value={movie.name}>
                  {movie.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Trailer Link"
              fullWidth
              variant="outlined"
              value={trailerLink}
              onChange={handleTrailerChange}
              sx={{ marginBottom: '10px' }}
            />
            <Button variant="contained" onClick={handleAddTrailer}>
              Add Trailer
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyPage;
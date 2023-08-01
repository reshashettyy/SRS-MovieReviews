import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

let serverURL = "";

const MyPage = () => {
  const navigate = useNavigate();
  // const serverURL = "";

  const [intialMovies, setintialMovies] = useState([
    {
      id: 1,
      title: "Hunger Games",
      description:
        "A dystopian action-adventure film based on the novel by Suzanne Collins.",
      image:
        "https://movieguide.b-cdn.net/wp-content/uploads/2012/06/98068201-0cc9-42ed-81ee-dcd480c4cba8-768x1152.jpg",
      trailerLink: "https://www.youtube.com/watch?v=PbA63a7H0bo",
    },
    {
      id: 2,
      title: "The Notebook",
      description:
        "A romantic drama film based on the novel by Nicholas Sparks.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/86/Posternotebook.jpg",
      trailerLink: "https://www.youtube.com/watch?v=BjJcYdEOI0k",
    },
    {
      id: 3,
      title: "Tangled",
      description:
        "An animated musical adventure film from Walt Disney Studios.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTAxNDYxMjg0MjNeQTJeQWpwZ15BbWU3MDcyNTk2OTM@._V1_FMjpg_UX1000_.jpg",
      trailerLink: "https://www.youtube.com/watch?v=2f516ZLyC6U",
    },
    {
      id: 4,
      title: "Divergent",
      description:
        "A science fiction action film based on the novel by Veronica Roth.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTYxMzYwODE4OV5BMl5BanBnXkFtZTgwNDE5MzE2MDE@._V1_.jpg",
      trailerLink: "https://www.youtube.com/watch?v=sutgWjz10sM",
    },
    {
      id: 5,
      title: "Miracles",
      description:
        "A drama film based on the true story of a young girls miraculous recovery.",
      image:
        "https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/chameleon/title-movie/696050_MiraclesFromHeaven_EST_1400x2100v2.jpg?itok=V9hBwR77",
      trailerLink: "https://www.youtube.com/watch?v=CldGTG6iVrU",
    },
    {
      id: 6,
      title: "Crazy Rich Asians",
      description:
        "A romantic comedy-drama showcasing the opulent lifestyle of a wealthy family.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_.jpg",
      trailerLink: "https://www.youtube.com/watch?v=ZQ-YX-5bAs0",
    },
  ]);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [movieID, setMovieID] = useState();
  // const [showTrailerLink, setShowTrailerLink] = useState(false);
  const [databaseTrailerLink, setDatabaseTrailerLink] = useState("");

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
      .then((res) => {
        // console.log("callApiLoadMovies returned: ", res);
        console.log("callApiLoadMovies parsed: ", res[0]);
        setMovies(res);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  //call movies API
  const callApiLoadMovies = async (serverURL) => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
    //checkTrailerLink(event.target.value);
  };

  const handleTrailerChange = (event) => {
    setTrailerLink(event.target.value);
  };

  const callApiAddTrailer = async () => {
    const url = serverURL + "/api/addTrailer";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieID: movieID,
        trailerLink: trailerLink,
      }),
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const handleAddTrailer = () => {
    const selectedMovieInfo = movies.find(
      (movie) => movie.name === selectedMovie
    );

    if (selectedMovieInfo && selectedMovieInfo.trailerLink) {
      // If the selected movie has a trailer link in the database
      const userResponse = window.confirm(
        `The movie "${selectedMovieInfo.name}" already has a trailer in the database. Do you want to watch it?`
      );

      if (userResponse) {
        // Open the trailer link in a new tab/window
        window.open(selectedMovieInfo.trailerLink, "_blank");
        return; // Return here to prevent adding the trailer link again
      }
    }

    // If the selected movie does not have a trailer link in the database or the user declined to watch the trailer, proceed to add it
    callApiAddTrailer();
    setSelectedMovie("");
    setTrailerLink("");
    setDatabaseTrailerLink("");
  };

  const handleMovieClick = (trailerLink) => {
    window.open(trailerLink, "_blank"); // Open the trailer link in a new tab/window
  };

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleShowTrailer = () => {
    if (selectedMovie) {
      const selectedMovieInfo = movies.find(
        (movie) => movie.name === selectedMovie
      );
      if (selectedMovieInfo && selectedMovieInfo.trailers) {
        setDatabaseTrailerLink(selectedMovieInfo.trailers);
        setShowErrorMessage(false); // Hide the error message
      } else {
        // If the trailer link is not available in the database, set databaseTrailerLink to an empty string and show the error message
        setDatabaseTrailerLink("");
        setShowErrorMessage(true);
      }
    }
  };

  const headingStyle = {
    background: "#E1F5FE",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
  };

  const movieBoxStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
    background: "#f2f2f2", // Light gray background color
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.1)", // Shadow effect
    transition: "transform 0.3s ease-in-out",
  };

  const newsBoxStyle = {
    width: "85%", // Adjust the width of the news boxes
    height: "382px", // Adjust the height of the news boxes
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
    background: "#f2f2f2", // Light gray background color
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.1)", // Shadow effect
    marginLeft: "20px",
  };

  const movieBoxHover = {
    transform: "scale(1.1)",
  };

  const handleMouseEnter = (intialMovies) => {
    // Set the isHovered property to true for the hovered movie
    setintialMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.id === intialMovies.id ? { ...m, isHovered: true } : m
      )
    );
  };

  const handleMouseLeave = (intialMovies) => {
    // Set the isHovered property to false for the unhovered movie
    setintialMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.id === intialMovies.id ? { ...m, isHovered: false } : m
      )
    );
  };

  const handleNewsBoxClick = (articleLink) => {
    window.open(articleLink, "_blank"); // Open the news article link in a new tab/window
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Page
          </Typography>
          <Link
            color="inherit"
            style={{ cursor: "pointer", marginRight: "20px" }}
            onClick={() => navigate("/")}
          >
            Landing
          </Link>
          <Link
            color="inherit"
            style={{ cursor: "pointer", marginRight: "20px" }}
            onClick={() => navigate("/review")}
          >
            Review
          </Link>
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/search")}
          >
            Search
          </Link>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: "20px" }}>
        <div style={headingStyle}>
          <Typography variant="h3" color="inherit" noWrap>
            My Page
          </Typography>
          <Typography variant="h5" color="inherit" noWrap>
            View and remanence your favorite movie trailers!
          </Typography>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            Top Movies
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Pssstt! Click on the image to see the trailer.
            </Typography>
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
                  onClick={() => handleMovieClick(intialMovies.trailerLink)}
                >
                  <img
                    src={intialMovies.image}
                    alt={intialMovies.name}
                    style={{
                      width: "80%",
                      maxWidth: "150px",
                      height: "auto",
                      filter: "grayscale(50%)",
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {intialMovies.title}
                  </Typography>
                  <Typography variant="body2">
                    {intialMovies.description}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: "2mm" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Add Movie Trailer
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Select a movie and find the trailer, or add your own trailer link!
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={15} sm={11}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Movie</InputLabel>
                <Select
                  value={selectedMovie}
                  onChange={handleMovieChange}
                  label="Select Movie"
                >
                  <MenuItem value="">
                    <em>Select a movie</em>
                  </MenuItem>
                  {movies.map((intialMovies) => (
                    <MenuItem key={intialMovies.id} value={intialMovies.name}>
                      {intialMovies.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={16} sm={11}>
              <TextField
                label="Trailer Link"
                fullWidth
                variant="outlined"
                value={trailerLink}
                onChange={handleTrailerChange}
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleAddTrailer}>
                Add Trailer
              </Button>
              <Button
                variant="contained"
                onClick={handleShowTrailer}
                style={{ marginLeft: "10px" }}
              >
                Show Trailer Link
              </Button>
              {showErrorMessage && (
                <Typography
                  variant="h6"
                  color="error"
                  style={{ marginTop: "10px" }}
                >
                  Trailer Not Available, Please Add A Trailer Link
                </Typography>
              )}
              {databaseTrailerLink && (
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  {databaseTrailerLink}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h4" gutterBottom sx={{ marginTop: "10px" }}>
                Current News
              </Typography>
            </Grid>

            <Grid container spacing={-2}>
              <Grid item xs={6}>
                <a
                  href="https://www.ctvnews.ca/entertainment/margot-robbie-didn-t-break-character-with-her-barbie-press-looks-1.6500070"
                  target="_blank"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={newsBoxStyle}
                    onClick={() =>
                      handleNewsBoxClick(
                        "https://www.ctvnews.ca/entertainment/margot-robbie-didn-t-break-character-with-her-barbie-press-looks-1.6500070"
                      )
                    }
                  >
                    <img
                      src="https://people.com/thmb/KbXaWZcOfoOjVstqnS3Bd4AgiCo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(551x689:553x691)/Barbie-84bbd2b2160c41c3b051221a3cb382a6.jpg"
                      alt="Margot Robbie Didn't Break Character"
                      style={{ width: "80%", height: "75%" }}
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      Margot Robbie Didn't Break Character
                    </Typography>
                    <Typography variant="body2">
                      Margot Robbie remained in character in press conferences
                      showcasing her dedication to the role.
                    </Typography>
                  </div>
                </a>
              </Grid>
              <Grid item xs={6}>
                <a
                  href="https://www.theguardian.com/film/2023/aug/01/not-big-in-japan-country-rejects-co-marketing-of-barbie-and-oppenheimer-as-trivialising-nuclear-war"
                  target="_blank"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={newsBoxStyle}
                    onClick={() =>
                      handleNewsBoxClick(
                        "https://www.theguardian.com/film/2023/aug/01/not-big-in-japan-country-rejects-co-marketing-of-barbie-and-oppenheimer-as-trivialising-nuclear-war"
                      )
                    }
                  >
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg"
                      alt="Oppenheimer"
                      style={{ width: "80%", height: "75%" }}
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      #Barbenheimer Backlash
                    </Typography>
                    <Typography variant="body2">
                      Japan's rejection of the co-marketing of Barbie and
                      Oppenheimer due to concerns about trivializing nuclear
                      war.
                    </Typography>
                  </div>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyPage;

import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const backgroundImageUrl =
  'https://img.freepik.com/free-photo/movie-background-collage_23-2149876003.jpg?w=1480&t=st=1690725213~exp=1690725813~hmac=745019d56c61fd25f6067da575d9d1f1f2139a4341b6f59c39a0949c51e5dd34';

const Landing = () => {
  const navigate = useNavigate();

  const landingStyle = {
    background: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
  };

  const headingStyle = {
    marginBottom: '20px',
  };

  const navigateToSearch = () => {
    navigate('/Search');
  };

  const navigateToReview = () => {
    navigate('/Review');
  };

  const navigateToMyPage = () => {
    navigate('/MyPage');
  };

  const buttonStyle = {
    background: 'blue',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '0 10px',
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Landing
          </Typography>
          <Link color="inherit" style={{ cursor: 'pointer', marginRight: '20px' }} onClick={navigateToSearch}>
            Search
          </Link>
          <Link color="inherit" style={{ cursor: 'pointer', marginRight: '20px' }} onClick={navigateToReview}>
            Review
          </Link>
          <Link color="inherit" style={{ cursor: 'pointer' }} onClick={navigateToMyPage}>
            My Page
          </Link>
        </Toolbar>
      </AppBar>

      <div style={landingStyle}>
        <Typography variant="h3" color="inherit" noWrap style={headingStyle}>
          Welcome to Lets Review Movie Together WebPage
        </Typography>
        <Typography variant="h5" color="inherit" noWrap>
          Discover and review your favorite movies and movie trailers!
        </Typography>

        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" color="inherit" noWrap>
            Explore more:
          </Typography>
          <div style={{ marginTop: '20px' }}>
            <button onClick={navigateToSearch} style={buttonStyle}>
              Search Page
            </button>
            <button onClick={navigateToReview} style={buttonStyle}>
              Review Page
            </button>
            <button onClick={navigateToMyPage} style={buttonStyle}>
              My Page
            </button>
          </div>
        </div>
      </div>

      {/* You can add more content for the Landing page here */}
    </div>
  );
};

export default Landing;

import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import Review from "./Review"

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Review
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
            onClick={() => navigate('/search')}
          >
            Search
          </Link>
          <Link
            color="inherit"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/mypage')}
          >
            My Page
          </Link>
        </Toolbar>
      </AppBar>

      {/* <div style={{ marginTop: '20px' }}>
        <Typography variant="h3" color="inherit" noWrap>
          Review Page
        </Typography>
        <Typography variant="h5" color="inherit" noWrap>
          Write reviews for your favorite movies!
        </Typography>
      </div> */}

      <Review/>

      {/* You can add more content for the Review page here */}

    </div>
  );
};

export default App;

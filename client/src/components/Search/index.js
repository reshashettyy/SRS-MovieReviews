import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();

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
            onClick={() => navigate('/mypage')}
          >
            My Page
          </Link>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h3" color="inherit" noWrap>
          Search Page
        </Typography>
        <Typography variant="h5" color="inherit" noWrap>
          Search for your favorite movies here!
        </Typography>
      </div>

      {/* You can add more content for the Search page here */}

    </div>
  );
};

export default Search;

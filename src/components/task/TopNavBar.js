import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
  },
  topbar: {
    backgroundColor: '#81D4FA'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

}));

const TopNavBar = ({ userName }) => {
  const classes = useStyles();
  const sessionClear = () => {
    const confirmDelete = window.confirm("Are you sure you want to logout?");
    if (confirmDelete) {
      sessionStorage.clear()
      window.location.href = '/';
    }

  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.topbar} >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {userName.toUpperCase()}
          </Typography>
          <Button variant='contained' size="small" onClick={sessionClear}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNavBar;

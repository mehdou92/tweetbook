import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const { user, signOut, isLogged } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);

  function handleSignOut() {
    setIsLoading(false);
    signOut();

  }

  useEffect(() => {
    if (user)
      setIsLoading(true);
    else
      setIsLoading(false);

  }, [user]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {
            isLoading
              ?
              <>
                <Link to={`/profile/${user.username}`}>
                  <Button color="inherit">Profile</Button>
                </Link>
                <Link to="/logout">
                  <Button color="inherit" onClick={handleSignOut}>Logout</Button>
                </Link>
              </>
              :
              <>
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/register">
                  <Button color="inherit">Register</Button>
                </Link>
              </>
          }
          {console.log("Nav Bar user : ", isLogged())}
        </Toolbar>
      </AppBar>
    </div>
  );
}
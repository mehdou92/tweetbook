import React, { useContext, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ListTweetUser from '../ListTweetUser';

import { FirebaseContext } from '../Firebase';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));

export default function Profile(props) {
  const classes = useStyles();

  const { user, isLogged, getStore } = useContext(FirebaseContext);
  const store = getStore();

  const [username, setUsername] = useState(props.match.params);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const getUser = (value) => {

    let userFromUsername = {};

    store.collection("users").where("username", "==", value.username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          userFromUsername = doc.data();
          // doc.data() is never undefined for query doc snapshots
          //console.log('Result get User ',doc.id, " => ", doc.data());
        });
        setIsLoading(true);
        setProfileUser(userFromUsername);
      })
      .catch(function (error) {
        console.error("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    getUser(username);
  }, [username]);


  return (
    <div className={classes.root}>
      {isLoading
        ?
        <>
          {
            profileUser
            &&
            <>
              <CssBaseline />
              <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                  {console.log(profileUser)}
                  Profile {profileUser.username}
                </Typography>
                <ListTweetUser userId={profileUser.userId} />
                <Typography variant="h5" component="h2" gutterBottom>
                  {'Pin a footer to the bottom of the viewport.'}
                  {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Sticky footer placeholder.</Typography>
              </Container>
              <footer className={classes.footer}>
                <Container maxWidth="sm">
                  <Typography variant="body1">My sticky footer can be found here.</Typography>
                  <MadeWithLove />
                </Container>
              </footer>
            </>
          }

        </>
        :
        <h2>is Loading</h2>
      }
    </div>
  );
}

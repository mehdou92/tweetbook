import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import useForm from '../../customHooks/useForm';
import validate from '../../rules/LoginFormValidationRules';
import 'firebase/auth';
import { FirebaseContext } from '../Firebase';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {

  const classes = useStyles();
  const { getFirebase, getStore, user} = useContext(FirebaseContext);
  const firebase = getFirebase();
  const { values, handleChange, handleSubmit, errors } = useForm(handleSignIn, validate);

  function handleSignIn() {
    console.log('handleSignIn');
    firebaseConnect();
  }

  function firebaseConnect() {
    const db = getStore();
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        db.collection('users').where('email', '==', values.email).get()
        .then(response => {
          response.forEach(user => {
            console.log(" USER DATA : ", user.data());
            localStorage.setItem('user', JSON.stringify(user.data()));
          });
          props.history.push('/')
        });
      }).catch(errors => console.error(errors.message))
  };


  return (
    <Container component="main" maxWidth="xs">
      {user && props.history.push('/profile')}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={errors.email ? errors.email : "Email Address"}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={values.email || ''}
            error={errors.email ? true : false}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={errors.password ? errors.password : "Password"}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password || ''}
            error={errors.password ? true : false}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
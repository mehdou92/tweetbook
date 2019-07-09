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
import validate from '../../rules/RegisterFormValidationRules';

import { FirebaseContext } from "../Firebase";

import 'firebase/auth';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  
  const classes = useStyles();

  const { values, handleChange, handleSubmit, errors } = useForm(handleRegister, validate);

  const { getFirebase, getStore } = useContext(FirebaseContext);
  const firebase = getFirebase();

  function handleRegister() {
    console.log('Handle Register : ', values );
    insertUserFirebase();
  }

  function insertUserFirebase() {
    const db = getStore();
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then(response => {
        db.collection('users').add({
          'username': values.username,
          'email': values.email
        });

        props.history.push('/login')

      }).catch(errors => {
        console.error(errors.message);
      })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label={errors.username ? errors.username : "Username"}
                name="username"
                autoComplete="username"
                onChange={handleChange}
                value={values.username || ''}
                error={errors.username ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={handleChange}
                label={errors.email ? errors.email : "Email Adress"}
                name="email"
                autoComplete="email"
                value={values.email || ''}
                error={errors.email ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                name="password"
                label={errors.password ? errors.password : "Password"}
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password || ''}
                error={errors.password ? true : false}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
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
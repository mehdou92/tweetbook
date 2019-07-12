import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FirebaseContext } from '../Firebase';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));

export default function InputTweet() {
    const classes = useStyles();
    const [values, setValues] = useState({});
    const { getStore, user } = useContext(FirebaseContext);
    const [newTweet, setNewTweet] = useState('');

    const store = getStore();

    //   const handleChange = name => event => {
    //     setValues({ ...values, [name]: event.target.value });
    //   };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    const addNewTweet = () => {

        store.collection('tweets').add({
            'userId': user.userId,
            'username': user.username,
            'text': values.tweet,
            'createdAt' : Date.now(),
            'like': 0,
            'retweet': 0,
            'comment': 0
        });
        setNewTweet('');
    };

    return (
        <div className={classes.container} noValidate autoComplete="off">
            <TextField
                id="input-tweet"
                label="What's happening ?"
                multiline
                placeholder="What's happening ?"
                rowsMax="4"
                fullWidth={true}
                name="tweet"
                value={values.tweet}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 280}}
            />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addNewTweet}
          > Tweet</Button>
        </div>
    );
}
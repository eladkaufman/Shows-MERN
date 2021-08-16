import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    justifyContent: "center",
  },
  submit: {
    margin: theme.spacing(1),
  },
}));

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWorngPassword] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);
  const [user, setUser] = useState({});

  const notExistErr = <label style={{ color: "red" }}>User not exist</label>;
  const wrongPasswordErr = (
    <label style={{ color: "red" }}>Wrong password </label>
  );

  const handleUserNameInput = (e) => {
    setUserName(e.target.value);
    setUserNotExist(false);
  };

  const handlePasword = (e) => {
    setPassword(e.target.value);
    setWorngPassword(false);
  };

  const auth = async () => { //TODO link to shows
    let resp = await axios.get(
      "http://localhost:8000/api/users/login/" + userName
    );
    await setUser(resp.data);

    if (!resp.data) {
      setUserNotExist(true);
    } else if (resp.data.password !== password) {
      setWorngPassword(true);
    } else {

      sessionStorage.setItem("fullName", resp.data.fullName);
      props.setToken(true);
    }
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="uName"
            label="User name"
            name="userName"
            autoFocus
            onChange={(e) => handleUserNameInput(e)}
          />

          {userNotExist && notExistErr}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => handlePasword(e)}
          />
          {wrongPassword && wrongPasswordErr}
          <br />
          <Button
            type="button"
            size="small"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={auth}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}

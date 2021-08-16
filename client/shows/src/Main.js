import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useState } from "react";

import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginComp from "./Login";
import ShowsMainComp from "./shows/ShowsMain";
import AllShowsComp from "./shows/AllShows";

import EditShowComp from "./shows/EditShow";
import EditMemberComp from "./members/EditMember";
import SubscriptionsComp from "./members/Subscriptions";
import { Link } from "react-router-dom";

export default function Main(props) {
  const [token, setToken] = useState();

  const useStyles = makeStyles((theme) => ({
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
  const logout = () => {
    sessionStorage.clear();
    setToken(false);
  };
  const classes = useStyles();
  const ButtonAppBar = (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit">
              {" "}
              <Link
                to={"/showsMain"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Shows
              </Link>
            </Button>
            <Button color="inherit">
              {" "}
              <Link
                to={"/subscriptions"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Subscriptions
              </Link>
            </Button>
          </Typography>

          <label
            style={{
              color: "pink",
              fontSize: "1.2rem",
              marginRight: "1rem",
              marginBottom: "0.3rem",
            }}
          >
            {sessionStorage.getItem("fullName")}
          </label>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  if (!sessionStorage.getItem("fullName")) {
    return <LoginComp setToken={setToken} />; //TODO link to shows
  }

  return (
    <div>
      {ButtonAppBar}
      <h1>Shows Subscription Manger App</h1>
      <Switch>
        <Route exact path="/">
          {" "}
          <Redirect to="/showsMain" />
        </Route>
        <Route path="/showsMain" component={ShowsMainComp} />
        <Route path="/editShow/:id" component={EditShowComp} />
        <Route path="/editMember/:id" component={EditMemberComp} />
        <Route path="/subscriptions" component={SubscriptionsComp} />
      </Switch>
    </div>
  );
}

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import AllShowsComp from "./AllShows";
import AddShowComp from "./AddShow";

export default function ShowsMainComp(props) {
  
  const goToAllShows = () =>{
    sessionStorage.setItem("reload", "true")
     props.history.push("/showsMain/allShows")
  }
  
  return (
    <div>
      <h2>Shows</h2>

      <input
        type="button"
        value="All Shows"
        onClick={goToAllShows}
      />

      <Link to={"/showsMain/addShow"}>
        {" "}
        <input type="button" value="Add Show" />
      </Link>
      <Switch>
        <Route exact path={"/showsMain/"} component={AllShowsComp} />
        <Route exact path={"/showsMain/allShows"} component={AllShowsComp} />
        <Route
          exact
          path={"/showsMain/allShows/:id"}
          component={AllShowsComp}
        />
        <Route
          exact
          path={"/showsMain/allShows/search/:name"}
          component={AllShowsComp}
        />
        <Route exact path={"/showsMain/addShow"} component={AddShowComp} />
      </Switch>
    </div>
  );
}

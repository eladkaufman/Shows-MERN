import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import AllMembersComp from "./AllMembers";
import AddMemberComp from "./AddMember";

export default function SubscriptionsComp(props) {
  const { url } = useRouteMatch();

  return (
    <div>
      <h2>Subscriptions</h2>

      <Link to={url + "/allMembers"}>
        {" "}
        <input type="button" value="All Members" />
      </Link>
      <Link to={url + "/addMember"}>
        {" "}
        <input type="button" value="Add Member" />
      </Link>
      <Switch>
        {/* <Route exact path={"/"} component={AlMembersComp} /> */}
        <Route exact path={"/subscriptions"} component={AllMembersComp} />
        <Route exact path={url + "/allMembers"} component={AllMembersComp} />
        <Route
          exact
          path={url + "/allMembers/:id"}
          component={AllMembersComp}
        />
        <Route exact path={url + "/addMember"} component={AddMemberComp} />
      </Switch>
    </div>
  );
}

import Navbar from "../Same/navbar";
import LeftSide from '../Same/LeftSide';
import Group from "./Group";
import Exploer from "./Exploer";
import Profile from "./Profile";
import Home from "./Home";


import {
    BrowserRouter as Router1,
    Switch,
    Route,
} from "react-router-dom";


export default function Router() {
    return (
        <div className="flex column">
            <Router1>

            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/explore" exact>
                    <Exploer />
                </Route>
                <Route path="/group" exact>
                    <Group />
                </Route>
                <Route path="/profile" exact>
                    <Profile />
                </Route>
            </Switch>
            <LeftSide />
            </Router1>

        </div>
    )
}

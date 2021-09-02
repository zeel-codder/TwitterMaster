import Navbar from "../Same/navbar";
import LeftSide from '../Same/LeftSide';
import Group from "./Group";
import Exploer from "./Exploer";
import Profile from "./Profile";
import Home from "./Home";
import Login from "./Login";


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

            <div className="flex container">

                {/* <div className="notification">

                    Notification
                 </div>  */}

                <div className="feed flex column">

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
                <Route path="/signup" exact>
                    <Login IsSignUp={true} />
                </Route>
                <Route path="/signin" exact>
                <Login IsSignUp={false}/>
                </Route>
            </Switch>
                 </div>   
                 <LeftSide />
            </div>
            </Router1>

        </div>
    )
}

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
import React from "react";

interface Tem{
    Com:React.FC | any;
    type?:string;
}
const Template:React.FC<Tem>=({Com,type})=>{
    console.log(type);
    return (

        <>
        <Navbar />
        <Com type={type}></Com>
        <LeftSide></LeftSide>
        </>
    )
}


export default function Router() {
    return (
        <div className="flex column">
            <Router1>

            {/* <Navbar /> */}

            <div className="flex container">

                {/* <div className="notification">

                    Notification
                 </div>  */}

                <div className="feed flex column">

            <Switch>
                <Route path="/" exact>
                    <Template Com={Home} />
                    {/* <Home /> */}
                </Route>
                <Route path="/explore" exact>
                    <Template Com={Exploer} />
                    {/* <Exploer /> */}
                </Route>
                <Route path="/group" exact>
                    <Template Com={Group} />
                    {/* <Group />/ */}
                </Route>
                <Route path="/profile/group" exact>
                <Template Com={Profile}  type="group"/>
                    {/* <Profile /> */}
                </Route>
                <Route path="/profile" exact>
                <Template Com={Profile}  type="tweet"/>
                    {/* <Profile /> */}
                </Route>
                <Route path="/signup" exact>
                    <Login IsSignUp={true} />
                </Route>
                <Route path="/signin" exact>
                <Login IsSignUp={false}/>
                </Route>
            </Switch>
                 </div>   
                 {/* <LeftSide /> */}
            </div>
            </Router1>

        </div>
    )
}

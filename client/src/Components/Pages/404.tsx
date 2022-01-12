import { Link } from "react-router-dom";

const  _404Page :React.FC<{}> =() =>{

    return (
        <div className="flex column">
        <img src='/404.svg' className="_404" alt='%'></img>
        <Link to="/" className="a">Go To Home</Link>
        </div>
    )
}


export default _404Page;
import { Link } from "react-router-dom";



const  _404Page :React.FC<{}> =() =>{

    return (
        <>
        <h1>Nothing Found Hear</h1>
        <Link to="/" className="a">Go To Home</Link>
        </>
    )
}


export default _404Page;
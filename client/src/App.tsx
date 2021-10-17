
import Home from './Components/Pages/Router';
// import Loading from './Components/Loaders/Loading';


import './App.css';

function App() {

  return (
    <div className="App">

      {/* <Loading /> */}
      {/* <StartLoader ></StartLoader> */}
      <Home></Home>


      <script async src={"https://www.googletagmanager.com/gtag/js?id="+process.env.REACT_APP_Gtag}></script>
      <script dangerouslySetInnerHTML={{
        __html: `
 window.dataLayer = window.dataLayer || [];
 function gtag() { dataLayer.push(arguments); }
 gtag('js', new Date());

 gtag('config', ${process.env.REACT_APP_Gtag});`}} />
    </div>
  );
}

export default App;

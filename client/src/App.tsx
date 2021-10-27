import Home from './Components/Pages/Router';
import './App.css';
import React from 'react';



const App: React.FC<{}> = () => {

  return (
    <div className="App" >

      <Home />

      {/* Google Tags for Analytic */}
      <script async src={"https://www.googletagmanager.com/gtag/js?id=" + process.env.REACT_APP_Gtag}></script>
      <script dangerouslySetInnerHTML={{
        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());

                gtag('config', ${process.env.REACT_APP_Gtag});`
      }} />
    </div>
  );
}

export default App;

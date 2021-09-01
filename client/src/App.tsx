

import StartLoader from './Components/Loaders/MainPage';
import Home from './Components/Pages/Router';



import './App.css';

function App() {

  return (
    <div className="App">
      <StartLoader ></StartLoader>
      <Home></Home>
    </div>
  );
}

export default App;

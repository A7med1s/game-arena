// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';

import SnakeGame from './pages/SnakeGame';
import FlappyBird from './pages/Flappy Bird/FlappyBird';
import TicTacToe from './pages/Tic-Tac-Toe/TicTacToe';

import {Route,BrowserRouter,Routes} from "react-router-dom"
import Logo from './components/Logo';


function App() {


  return(
  <>
  <BrowserRouter>
  <Logo/>
    <Routes>
    <Route index path='/' element={<Home/>}/>
    <Route index path='/flappy-bird' element={<FlappyBird/>}/>
    <Route index path='/snake-game' element={<SnakeGame/>}/>
    <Route index path='/tic-tac-toe' element={<TicTacToe/>}/>

    </Routes>
  </BrowserRouter>
  </>
  )

}




export default App; 


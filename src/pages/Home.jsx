import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import imgOne from '../assets/games images/flappy bird.JPG'
import imgTwo from '../assets/games images/snake game.JPG'
import imgThree from '../assets/games images/tictactoe.JPG'
import comingSoonimg from '../assets/games images/b7e1e580-c611-11ea-9b24-523c65baea0e.png'
const games = [
  {
    id: 1,
    title: 'flappy bird',
    link : '/flappy-bird',
    image: imgOne,
  },
  {
    id: 2,
    title: 'snake game',
    link:'/snake-game',
    image: imgTwo,
  },
  {
    id: 3,
    title: 'tic-tac-toe',
    link:'/tic-tac-toe',
    image: imgThree,
  },
  {
    id: 4,
    title: '2048',
    link:'/',
    image: comingSoonimg,
  },
  {
    id: 4,
    title: 'Hangman',
    link:'/',
    image: comingSoonimg,
  },
  {
    id: 4,
    title: 'sudoku',
    link:'/',
    image: comingSoonimg,
  },
];

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className="bg-sky-800 p-4 rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={game.link}>
            <img src={game.image} alt={game.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2 capitalize">{game.title}</h2></Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
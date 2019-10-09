import React from 'react'
import './styles/App.css'

import Header from './components/Header'
import Game from './components/Game'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;

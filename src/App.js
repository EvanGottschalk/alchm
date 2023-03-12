import React from 'react'
import Navbar from './components/navbar/Navbar'
import Main from './pages/main/Main'
import Footer from './components/footer/Footer'

//E~ Added for background implementation
import Background from './components/background/Background'
//import { Switch, BrowserRouter, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AvatarPage from './pages/avatar/AvatarPage';
import MintPage from './pages/mint/MintPage';
import NFZFILPage from './pages/nfzfil/NFZFIL'

const App = () => {
     return (
          <Router basename="/">
          <Background />
          <Navbar />
          <Routes>
               <Route exact path="/" element={Main} />
               <Route path="/mint" element={MintPage} />
               <Route path="/avatar" element={AvatarPage} />
               <Route path="/test" element={MintPage} />
               <Route path="/nfzfil" element={NFZFILPage} />
          </Routes>
          <Footer />
          </Router>
     )
}

export default App

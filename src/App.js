import React from 'react'
import Navbar from './components/navbar/Navbar'
import Main from './pages/main/Main'
import Footer from './components/footer/Footer'

//E~ Added for background implementation
import Background from './components/background/Background'
import { Switch, BrowserRouter, Route, Routes } from 'react-router-dom';
import AvatarPage from './pages/avatar/AvatarPage';
import MintPage from './pages/mint/MintPage';
import NFZFILPage from './pages/nfzfil/NFZFIL'

const App = () => {
     return (
          <BrowserRouter >
          <Background />
          <Navbar />
          <Routes>
               <Route exact path="/" element={<Main />} />
               <Route exact path="/mint" element={<MintPage />} />
               <Route exact path="/avatar" element={<AvatarPage />} />
               <Route exact path="/test" element={<MintPage />} />
               <Route exact path="/nfzfil" element={<NFZFILPage />} />
          </Routes>
          <Footer />
          </BrowserRouter>
     )
}

export default App

import React from 'react'
import About from '../../components/about/About'
import Animation from '../../components/animation/Animation'
import Roadmap from '../../components/roadmap/Roadmap'
import Team from '../../components/team/Team'
import FAQ from '../../components/faq/FAQ'

import MintGUI from '../../components/mintgui/MintGUI'

import './main.css'

const Main = () => {
  return (
    <div className='main'>
      <MintGUI />
      <About />
      <Roadmap />
      <Team />
      <FAQ />
      <Animation />
    </div>
  )
}

export default Main

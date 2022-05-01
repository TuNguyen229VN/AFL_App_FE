import React, { useEffect } from 'react'
import AboutHome from '../../subcomponents/AboutHome/AboutHome'
import AnotherHome from '../../subcomponents/AnotherHome/AnotherHome'
import BenefitHome from '../../subcomponents/BenefitHome/BenefitHome'
import ButtonTop from '../../subcomponents/ButtonTop/ButtonTop'
import CreateHome from '../../subcomponents/CreateHome/CreateHome'
import FAQ from '../../subcomponents/FAQ/FAQ'
import Slider from '../../subcomponents/Slider/Slider'
import TeamHome from '../../subcomponents/TeamHome/TeamHome'
import TournamentHome from '../../subcomponents/TournamentHome/TournamentHome'
import AOS from 'aos';
import "aos/dist/aos.css";
const HomePage = () => {
  AOS.init();
  return (
    <div>
      <Slider/>
      <TournamentHome/>
      <TeamHome/>
      <CreateHome/>
      <BenefitHome/>
      <AnotherHome/>
      <AboutHome/>
      <ButtonTop/>
      <FAQ/>
    </div>
  )
}

export default HomePage
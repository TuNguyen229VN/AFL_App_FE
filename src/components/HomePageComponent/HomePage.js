import React, { useRef, useEffect } from "react";
import AboutHome from "../../subcomponents/AboutHome/AboutHome";
import AnotherHome from "../../subcomponents/AnotherHome/AnotherHome";
import BenefitHome from "../../subcomponents/BenefitHome/BenefitHome";
import ButtonTop from "../../subcomponents/ButtonTop/ButtonTop";
import CreateHome from "../../subcomponents/CreateHome/CreateHome";
import FAQ from "../../subcomponents/FAQ/FAQ";
import Slider from "../../subcomponents/Slider/Slider";
import TeamHome from "../../subcomponents/TeamHome/TeamHome";
import TournamentHome from "../../subcomponents/TournamentHome/TournamentHome";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import Transitions from "../Transitions/Transitions";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
const HomePage = () => {
  const home = gsap.timeline();
  AOS.init();
  return (
    <div>
      <ScrollToTop />
      <Transitions timeline={home} />
      <Header />
      <Slider />
      <TournamentHome />
      <TeamHome />
      <CreateHome />
      <BenefitHome />
      <AnotherHome />
      <AboutHome />
      <ButtonTop />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;

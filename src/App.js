import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePageComponent/HomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import MyTournaments from "./components/FindTournamentComponent/MyTournament";
import MyTeam from "./components/FindTeamComponent/MyTeam";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import CreateTeam from "./components/CreateTeamComponent/CreateTeam";
import CreateTournament from "./components/CreateTournament/CreateTournament";
import InforTeamDetail from "./components/TeamDetailComponent/InforTeamDetail";
import ListPlayer from "./components/TeamDetailComponent/ListPlayer";
import ReportTeamDetail from "./components/TeamDetailComponent/ReportTeamDetail";
import CommentTeamDetail from "./components/TeamDetailComponent/CommentTeamDetail";
import HeaderTournamentDetail from "./components/TournamentDetailComponent/HeaderTournamentDetail";
import HeaderTeamDetail from "./components/TeamDetailComponent/HeaderTeamDetail";

function App() {
  // const exclusionArray = ["/login", "/signup"];
  //request.auth != null

  return (
    <div>
      <BrowserRouter>
        {/* {HideHeader} */}
        {/* {exclusionArray.indexOf(window.location.pathname) < 0 && <Header />} */}
        {/* <ScrollToTop /> */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/findTournaments" element={<MyTournaments />} />
          <Route exact path="/findTeam" element={<MyTeam />} />
          <Route exact path="/createTeam" element={<CreateTeam />} />
          <Route
            exact
            path="/createTournament"
            element={<CreateTournament />}
          />
          <Route
            exact
            path="/teamDetail/:idTeam/inforTeamDetail"
            element={<HeaderTeamDetail />}
          />
          <Route
            exact
            path="/teamDetail/:idTeam/listPlayer"
            element={<HeaderTeamDetail />}
          />

          <Route
            exact
            path="/teamDetail/:idTeam/reportTeamDeatail"
            element={<HeaderTeamDetail />}
          />
          <Route
            exact
            path="/teamDetail/:idTeam/commentTeamDetail"
            element={<HeaderTeamDetail />}
          />
          <Route
            exact
            path="/tournamentDetail/:idTour/inforTournamentDetail"
            element={<HeaderTournamentDetail />}
          />
          <Route
            exact
            path="/tournamentDetail/:idTour/commentTournamentDetail"
            element={<HeaderTournamentDetail />}
          />
          <Route
            exact
            path="/tournamentDetail/:idTour/galleryTournamentDetail"
            element={<HeaderTournamentDetail />}
          />
          <Route
            exact
            path="/tournamentDetail/:idTour/predictionTournamentDetail"
            element={<HeaderTournamentDetail />}
          />
          <Route
            exact
            path="/tournamentDetail/:idTour/rankTableTournamentDetail"
            element={<HeaderTournamentDetail />}
          />
          <Route
            exact
            path="/tournamentDetail/:idTour/scheduleTournamentDetail"
            element={<HeaderTournamentDetail />}
          />
          <Route
            exact
            path="/tournamentDetail/:idTour/teamInTournament"
            element={<HeaderTournamentDetail />}
            ignoreScrollBehavior={true}
          />
        </Routes>
        {/* {exclusionArray.indexOf(window.location.pathname) < 0 && <Footer />} */}
      </BrowserRouter>
    </div>
  );
}

export default App;

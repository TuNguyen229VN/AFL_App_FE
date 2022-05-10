import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePageComponent/HomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import MyTournamemts from "./components/FindTournamentComponent/MyTournament";
import MyTeam from "./components/FindTeamComponent/MyTeam";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import CreateTeam from "./components/CreateTeamComponent/CreateTeam";
import CreateTournament from "./components/CreateTournament/CreateTournament";
import InforTeamDetail from "./components/TeamDetailComponent/InforTeamDetail";
import ListPlayer from "./components/TeamDetailComponent/ListPlayer";
import ReportTeamDetail from "./components/TeamDetailComponent/ReportTeamDetail";
import CommentTeamDetail from "./components/TeamDetailComponent/CommentTeamDetail";
import InforTournamentDetail from "./components/TournamentDetailComponent/InforTournamentDetail";
import CommentTournamentDetail from "./components/TournamentDetailComponent/CommentTournamentDetail";
import GalleryTournamentDetail from "./components/TournamentDetailComponent/GalleryTournamentDetail";
import PredictionTournamentDetail from "./components/TournamentDetailComponent/PredictionTournamentDetail";
import RankTableTournamentDetail from "./components/TournamentDetailComponent/RankTableTournamentDetail";
import ScheduleTournamentDetail from "./components/TournamentDetailComponent/ScheduleTournamentDetail";
import TeamInTournament from "./components/TournamentDetailComponent/TeamInTournament";

function App() {
  // const exclusionArray = ["/login", "/signup"];
  return (
    <div>
      <BrowserRouter>
        {/* {HideHeader} */}
        {/* {exclusionArray.indexOf(window.location.pathname) < 0 && <Header />} */}
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/findTournaments" element={<MyTournamemts />} />
          <Route exact path="/findTeam" element={<MyTeam />} />
          <Route exact path="/createTeam" element={<CreateTeam />} />
          <Route exact path="/inforTeamDetail" element={<InforTeamDetail />} />
          <Route exact path="/listPlayer" element={<ListPlayer />} />
          <Route
            exact
            path="/reportTeamDeatail"
            element={<ReportTeamDetail />}
          />
          <Route
            exact
            path="/commentTeamDetail"
            element={<CommentTeamDetail />}
          />
          <Route
            exact
            path="/createTournament"
            element={<CreateTournament />}
          />
          <Route
            exact
            path="/inforTournamentDetail"
            element={<InforTournamentDetail />}
          />
           <Route
            exact
            path="/commentTournamentDetail"
            element={<CommentTournamentDetail />}
          />
           <Route
            exact
            path="/galleryTournamentDetail"
            element={<GalleryTournamentDetail />}
          />
           <Route
            exact
            path="/predictionTournamentDetail"
            element={<PredictionTournamentDetail />}
          />
           <Route
            exact
            path="/rankTableTournamentDetail"
            element={<RankTableTournamentDetail />}
          />
           <Route
            exact
            path="/scheduleTournamentDetail"
            element={<ScheduleTournamentDetail />}
          />
           <Route
            exact
            path="/teamInTournament"
            element={<TeamInTournament />}
          />
        </Routes>
        {/* {exclusionArray.indexOf(window.location.pathname) < 0 && <Footer />} */}
      </BrowserRouter>
    </div>
  );
}

export default App;

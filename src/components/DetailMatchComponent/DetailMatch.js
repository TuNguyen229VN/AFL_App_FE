import React, {useState,useEffect} from "react";
import "./style/style.css"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import LoadingAction from "../LoadingComponent/LoadingAction";
import {getTeamInMatchByMatchIdAPI} from "../../api/TeamInMatchAPI"
export default function DetailMatch(props){
    const [loading,setLoading] = useState(false);
    const [teamA,setTeamA] = useState(null);
    const [teamB,setTeamB] = useState(null);
    const { idMatch } = useParams();
    useEffect(() => {
        getTeamInMatchByMatchID();
    },[]);
    const getTeamInMatchByMatchID = () => {
        const response = getTeamInMatchByMatchIdAPI(idMatch);
        response.then(res => {
            if(res.status === 200) {
                const twoTeamUpdate = res.data.teamsInMatch;
                setTeamA(twoTeamUpdate[0]);
                setTeamB(twoTeamUpdate[1])
            }
        }).catch(err => {
            console.error(err);
        })
    }
    return(<div>
        <Header />
        <div className="detailMatch">
            <h1 className="titleDetail">Chi tiết trận đấu của {teamA !== null ? teamA.teamName : null} - {teamB !== null ? teamB.teamName : null}</h1>
        </div>
        {loading ? <LoadingAction /> : null}
        <Footer/>

        
    </div>)
}
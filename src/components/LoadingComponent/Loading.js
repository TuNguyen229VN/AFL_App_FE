import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../FindTournamentComponent/TournamentFind.module.css";


const Loading = () => {
    return (
      <>
        <div className={styles.tournamentload}>
          <Skeleton height={300} />
        </div>
      </>
    );
  };


  export default Loading;
import React from "react";

function PenaltyMatch(props) {
  const {
    scoreA,
    scoreB,
    playerA,
    playerB,
    renderInputByNumberPenalty,
    detailPenalty,
  } = props;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 30,
        width: "110%",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {detailPenalty !== null || scoreA !== 0
          ? renderInputByNumberPenalty(scoreA, playerA, "A")
          : null}
      </div>
      <div>
        {detailPenalty !== null || scoreB !== 0 ? renderInputByNumberPenalty(scoreB , playerB, "B") : null}
      </div>
    </div>
  );
}

export default PenaltyMatch;

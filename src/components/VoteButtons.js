import React from "react";
import IconPlus from "./icons/IconPlus";
import IconMinus from "./icons/IconMinus";

import './VoteButtons.scss';

export const VOTE_STATE = Object.freeze({
  UPVOTE: 0,
  DOWNVOTE: 1,
  NONE: 2,
});

const VoteButtons = ({score, state, handleUpvote, handleDownvote}) => {
  return (
    <div className="VoteButtons">
      <IconPlus highlight={state === VOTE_STATE.UPVOTE} onClick={handleUpvote}/>
      <div className="VoteButtons_score">{score}</div>
      <IconMinus highlight={state === VOTE_STATE.DOWNVOTE} onClick={handleDownvote}/>
    </div>
  )
};

export default VoteButtons;

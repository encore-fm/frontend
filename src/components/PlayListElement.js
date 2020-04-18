import React from "react";

import './PlayListElement.scss'
import VoteButtons, {VOTE_STATE} from "./VoteButtons";

const PlayListElement = ({song, username, handleVote}) => {
  const {
    trackName,
    trackID,
    albumName,
    artists,
    coverUrl,
    // trackDuration,
    suggestedBy,
    score,
    upvoters,
    downvoters,
  } = song;

  let state = VOTE_STATE.NONE;
  if (upvoters.includes(username)) {
    state = VOTE_STATE.UPVOTE
  } else if (downvoters.includes(username)) {
    state = VOTE_STATE.DOWNVOTE
  }

  const handleUpvote = () => handleVote(trackID, true);
  const handleDownvote = () => handleVote(trackID, false);


  return (
    <div className="PlayListElement">
      <img className="PlayListElement_image" src={coverUrl} alt={trackName}/>
      <div className="PlayListElement_info">
        <div className="PlayListElement_info_song">
          {trackName}<br/>
          {albumName}<br/>
          {artists.join(',')}<br/>
        </div>
        <br/>
        suggested by <span className="highlight">{suggestedBy}</span>
      </div>
      <div className="PlayListElement_voteButtons">
        <VoteButtons state={state} score={score} handleUpvote={handleUpvote} handleDownvote={handleDownvote}/>
      </div>
    </div>
  )
};

export default PlayListElement;

import React from "react";

import './PlayListElement.scss'
import VoteButtons, {VOTE_STATE} from "./VoteButtons";
import SongInfo from "./SongInfo";

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

  const infoStyle = {
    marginLeft: '1em',
    fontSize: '14px',
    flexGrow: 1,
  };

  return (
    <div className="PlayListElement">
      <img className="PlayListElement_image" src={coverUrl} alt={trackName}/>
      <SongInfo
        style={infoStyle}
        songName={trackName}
        album={albumName}
        artists={artists}
        suggestedBy={suggestedBy}
      />
      <div className="PlayListElement_voteButtons">
        <VoteButtons state={state} score={score} handleUpvote={handleUpvote} handleDownvote={handleDownvote}/>
      </div>
    </div>
  )
};

export default PlayListElement;

import React from "react";

import "./GetStartedView.scss";
import {Link, useHistory} from "react-router-dom";

const GetStartedView = () => {

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="GetStartedView">

      <div className="highlight link-like" onClick={handleGoBack}>go back</div>
      <br />
      <br />

      <section>
        <h2>getting started</h2>
        <article>
          <h3>creating a session</h3>
          Click on <span className="highlight">create</span> and enter a username. You will be redirected to Spotify's website, where you can log in with a valid Spotify Premium account. This step is required if you're hosting the session. After authorizing encore, you'll be redirected right back to your new session.
        </article>
        <article>
          <h3>joining a session</h3>
          The easiest way to <span className="highlight">join</span> a session is by having the host send you the session url. Alternatively, you can click on join and manually enter the session id. After that, all you need to do is choose a username and decide on whether or not you want to use your Spotify account with encore. If you choose to do so, you can listen to the music being played in the session on any of your active Spotify devices. If you choose not to, you can still join the session and suggest and vote on songs. To use your Spotify account, simply click on authorize when prompted and log in with your Spotify Premium account on Spotify's website. If you don't <span className="highlight">authorize</span> Spotify at first, you can still always do so later on by clicking on the <span className="highlight">sync</span> button.
        </article>
      </section>

      <section>
        <h2>in the session</h2>
        <article>
          <h3>suggesting songs</h3>
          Click on <span className="highlight">add</span> to reveal the search bar. If you don't search for a song, encore automatically displays your favorite tracks from Spotify. Choose a song and click on the <span className="highlight">+</span> to add it to the session. If your song is the first to be suggested, it'll immediately start getting played. Click on the <span className="highlight">X</span> next to the search bar to get back to the playlist.
        </article>
        <article>
          <h3>voting for songs</h3>
          Click on <span className="highlight">+</span> to upvote a song in the session's playlist or - to downvote it. The number of votes a song has is displayed between both buttons. The playlist is sorted by this score.
        </article>
        <article>
          <h3>player actions</h3>
          As a host, you can <span className="highlight">pause</span> or <span className="highlight">resume</span> the current track, change the playback position, or <span className="highlight">skip</span> it altogether by using the buttons and slider on the player in the bottom. These buttons are only visible to the host.
        </article>
        <article>
          <h3>session members</h3>
          Click on <span className="highlight">menu</span> next to the add button to see a <span className="highlight">list of all currently active and inactive users</span> in the session.
        </article>
        <article>
          <h3>inviting other people</h3>
          Click on <span className="highlight">menu</span> next to the add button to reveal the toolbar buttons. Click on <span className="highlight">copy invite link</span>, copy the url and share it with friends. Anyone with this link can directly access the session.
        </article>
      </section>

      <section>
        <h2>leaving the session</h2>
        <article>
          Your <span className="highlight">profile</span>, including the current session you're in, is <span className="highlight">saved in your browser</span>. This means that you can jump back into your previous session as soon as you start <Link to="/">encore-fm.com</Link> - as long as the session still exists. If you want to leave the session, click on <span className="highlight">leave session</span> in the toolbar menu. If you are the session's host, this will read <span className="highlight">delete session</span> instead. Note that deleting the session will also <span className="highlight">delete all the session's users</span> with it.
        </article>
      </section>
    </div>
  )
};

export default GetStartedView;

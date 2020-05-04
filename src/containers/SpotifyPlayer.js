import {fetchAuthToken, setSyncMode} from "../actions/user";
import Script from "react-load-script";
import React from "react";
import {connect} from 'react-redux';

const SpotifyPlayer = (props) => {
  const {user} = props;
  if (!user) return "";
  // initialize Spotify web player
  const initializePlayer = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'encore.',
        getOAuthToken: callback => {
          // fetch a new token every time the old one expires
          props.dispatch(fetchAuthToken(user))
            .then(res => {
              let token = res.authToken;
              callback(token)
            });
        }
      });
      player.connect();
      // notify backend about newly connected device as soon as it's ready
      player.addListener('ready', () => {
        props.dispatch(setSyncMode(user, user.syncMode));
      });
    };
  };

  return (
    <Script url="https://sdk.scdn.co/spotify-player.js" onLoad={initializePlayer}/>
  );
};

export default connect(
  state => ({
    user: state.user,
  })
)(SpotifyPlayer)

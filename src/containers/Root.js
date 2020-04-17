import configureStore from "../configureStore";
import React, {Component} from "react";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from "./App";

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null /*todo*/} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

export default Root;

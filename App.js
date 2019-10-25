import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import PlacesNavigator from './navigation/PlacesNavigation';

// When Adding expo device features to expo apps, no extra config is required

import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

init()
  .then(() => console.log("Database Initilized"))
  .catch(err => console.log(err));

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store} >
      <PlacesNavigator />
    </Provider>
  );
}


// Google static api can be used for maps, routing and places
// google geocoding can be used for converting address into lattitude and longitude and vice versa


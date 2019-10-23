import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import PlacesNavigator from './navigation/PlacesNavigation';

// When Adding expo device features to expo apps, no extra config is required

import placesReducer from './store/places-reducer';

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



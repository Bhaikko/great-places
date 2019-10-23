import * as placeActions from './places-actions';
import Place from './../models/place';

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case placeActions.ADD_PLACE:
            const newPlace = new Place(new Date().toString(), action.placeData.title, action.placeData.image);
            return {
                places: state.places.concat(newPlace)
            }

        default: 
            return state;
    }
}
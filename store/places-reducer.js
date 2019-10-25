import * as placeActions from './places-actions';
import Place from './../models/place';

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case placeActions.ADD_PLACE:
            const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image);
            return {
                places: state.places.concat(newPlace)
            }

        case placeActions.SET_PLACES:
            return {
                places: action.places.map(pl => new Place(pl.id.toString(), pl.title, pl.imageUri))
            }

        default: 
            return state;
    }
}
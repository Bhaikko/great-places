import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from './../helpers/db';

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image) => {
    return async dispatch => {
        // this login moves the temp image path to permanent storage. however, this data is only stored until app closes hence sqlLite database is required store the imageUrl to access
        const fileName = image.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });

            const dbResult = await insertPlace(title, newPath, "Dummy", 15.6, 12.3);
            
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            
            dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

    }
}
import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = "ADD_PLACE";

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
        } catch (err) {
            console.log(err);
            throw err;
        }

        dispatch({
            type: ADD_PLACE,
            placeData: {
                title: title,
                image: newPath
            }
        });
    }

} 
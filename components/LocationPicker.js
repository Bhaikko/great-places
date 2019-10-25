import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreview from './MapPreview';
import Colors from './../constants/Colors';

const LocationPicker = props => {

    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const mapPickedLocation = props.navigation.getParam("pickedLocation");

    const { onLocationPicked } = props;

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            props.onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== "granted") {
            Alert.alert(
                "Insufficient Permissions!!",
                "You need to grant location permissions to app",
                [{
                    text: "Okay"
                }]
            );
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
            });
            
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

        } catch (err) {
            Alert.alert(
                "Could Not Fetch Location",
                "Please try again or manually pick location on map",
                [{
                    text: "Okay"
                }]
            );
        }
        setIsFetching(false);
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate("Map");
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview 
                location={pickedLocation}
                style={styles.mapPreview}
                onPress={pickOnMapHandler}
            > 
                {isFetching ? (
                    <ActivityIndicator size="large" color={Colors.primary} /> 
                ) : (
                    <Text>No Location Chosen Yet!</Text>
                )}
            </MapPreview>
            
            <View style={styles.actions}>
                <Button 
                    title="Get User Location"
                    color={Colors.primary}
                    onPress={getLocationHandler}    
                />

                <Button 
                    title="Pick On Map"
                    color={Colors.primary}
                    onPress={pickOnMapHandler}    
                />
            </View>
        </View>
    );
}   

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 19,
        width: "100%",
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }
});

export default LocationPicker;
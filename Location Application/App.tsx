import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Share } from "react-native";
import * as Location from "expo-location";

export default function App() {

  const [location, setLocation] = 
        useState<Location.LocationObjectCoords | null>(null);



  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    
    setLocation(loc.coords);
  };




  const shareLocation = async () => {
    if (!location) {
      alert("Get location first!");
      return;
    }

    const link = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    const msg = `📍 My Location:\n${link}`;

    await Share.share({ message: msg });
  };





  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Location App</Text>

      <Button title="Get Location" onPress={getLocation} />

      {location && (
        <View style={styles.box}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>

          <Button title="Share Location" onPress={shareLocation} />
        </View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 50, fontWeight: "bold", marginBottom: 20 },
  box: { marginTop: 20, alignItems: "center" },
});

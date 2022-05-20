import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const key = "AIzaSyAdYjmk_Ed-gX1szPlsRp1HVad5su3gCkw";
  const [location, setLocation] = useState([]);
  const [ok, setOk] = useState(true);
  const ask = async () => {
    Location.setGoogleApiKey(key);
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const userLocation = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    // console.log(userLocation[0].city);
    setLocation([userLocation[0].city, userLocation[0].region, userLocation[0].country])
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} style="dark" />
      <View style={styles.header}>
        <Text style={styles.city}>{location[0]}</Text>
        <Text style={styles.regionAndCountry}>{location[1]}, {location[2]}</Text>
        <Text style={styles.date}>Fri Jan 18</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.weekWrapper}>
          <View style={styles.week}>
            <Text style={styles.weekTemp}>27</Text>
            <Text style={styles.weekDesc}>Sunny</Text>
          </View>
          <View style={styles.week}>
            <Text style={styles.weekTemp}>27</Text>
            <Text style={styles.weekDesc}>Sunny</Text>
          </View>
          <View style={styles.week}>
            <Text style={styles.weekTemp}>27</Text>
            <Text style={styles.weekDesc}>Sunny</Text>
          </View>
          <View style={styles.week}>
            <Text style={styles.weekTemp}>27</Text>
            <Text style={styles.weekDesc}>Sunny</Text>
          </View>
          <View style={styles.week}>
            <Text style={styles.weekTemp}>27</Text>
            <Text style={styles.weekDesc}>Sunny</Text>
          </View>
          <View style={styles.week}>
            <Text style={styles.weekTemp}>27</Text>
            <Text style={styles.weekDesc}>Sunny</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flex: 3,
    paddingTop: 100,
  },
  date: {
    fontSize: 18,
    fontWeight: "300",
  },
  city: {
    fontSize: 40,
    fontWeight: "700",
  },
  regionAndCountry: {
    fontWeight:"400",
    marginBottom:28,
    fontSize:20,
  },
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
  },
  temp: {
    fontSize: 120,
    fontWeight: "700",
  },
  desc: {
    fontSize: 24,
    fontWeight: "300",
  },

  weekWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#000",
    borderTopWidth: 2,
  },
  week: {
    flex: 1,
    marginTop: 10,
  },
  weekTemp: {
    fontSize: 22,
    fontWeight: "500",
  },
  weekDesc: {
    fontSize: 13,
    fontWeight: "300",
  },
});

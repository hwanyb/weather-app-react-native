import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as Location from "expo-location";

const GOOGLE_API_KEY = "AIzaSyAdYjmk_Ed-gX1szPlsRp1HVad5su3gCkw";
const WEATHER_API_KEY = "3e41232ce3c0a011d11888cf8f244fef";

export default function App() {
  const [location, setLocation] = useState([]);
  const [current, setCurrent] = useState([]);
  const [daily, setDaily] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [ok, setOk] = useState(true);
  const ask = async () => {
    Location.setGoogleApiKey(GOOGLE_API_KEY);
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

    setLocation([
      userLocation[0].city,
      userLocation[0].region,
      userLocation[0].country,
    ]);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_API_KEY}&units=metric`
    );
    const json = await res.json();
    setCurrent(json.current);
    setCurrentWeather(json.current.weather);
    setDaily(json.daily);
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar animated={true} style='dark' />
      {location.length === 0 ||
      current.length === 0 ||
      daily.length === 0 ||
      currentWeather.length === 0 ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.city}>{location[0]}</Text>
            <Text style={styles.regionAndCountry}>
              {location[1]}, {location[2]}
            </Text>
            <Text style={styles.date}>
              {new Date(current?.dt * 1000).toString().substring(0, 10)}
            </Text>
          </View>
          <View style={styles.weather}>
            <View style={styles.current}>
              <View style={styles.currentWeater}>
                <View style={styles.tempWrapper}>
                  <Text style={styles.temp}>{Math.ceil(current?.temp)}</Text>
                  <Text style={styles.unit}>℃</Text>
                </View>
                <Text style={styles.desc}>
                  {currentWeather[0]?.description}
                </Text>
              </View>
              {/* {daily.map((day, index) => (
                <View style={styles.maxMinTemp} key={index}>
                  <Text style={styles.maxMinTempText}>
                    ⬆ {day?.temp?.max}℃
                  </Text>
                  <Text style={styles.maxMinTempText}>⬇ 18℃</Text>
                </View>
              ))} */}
              <View style={styles.maxMinTemp}>
                <Text style={styles.maxMinTempText}>⬆  {Math.ceil(daily[0]?.temp?.max)}℃</Text>
                <Text style={styles.maxMinTempText}>⬇  {Math.ceil(daily[0]?.temp?.min)}℃</Text>
              </View>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.weekWrapper}
            >
              {daily.map((day, index) => (
                <View key={index} style={styles.week}>
                  <Text style={styles.weekDate}>
                    {new Date(day?.dt * 1000).toString().substring(0, 3)}
                  </Text>
                  <View style={styles.weekTempWrapper}>
                    <Text style={styles.weekTemp}>
                      {Math.ceil(day?.temp?.day)}
                    </Text>
                    <Text>℃</Text>
                  </View>
                  <Text style={styles.weekDesc}>{day?.weather[0]?.main}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  loading: {
    fontSize: 40,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginTop: 350,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flex: 3,
    paddingTop: 80,
  },
  date: {
    fontSize: 24,
    fontWeight: "300",
  },
  city: {
    fontSize: 40,
    fontWeight: "700",
  },
  regionAndCountry: {
    fontWeight: "600",
    marginBottom: 28,
    fontSize: 20,
  },
  weather: {
    flex: 2.5,
  },
  current: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentWeater: {
    flexDirection: "column",
  },
  tempWrapper: {
    flexDirection: "row",
  },
  temp: {
    fontSize: 120,
    fontWeight: "700",
  },
  unit: {
    fontWeight: "400",
    fontSize: 50,
    paddingTop: 20,
    marginLeft: 10,
  },
  desc: {
    fontSize: 24,
    fontWeight: "300",
    marginTop: -15,
  },
  maxMinTemp: {
    paddingVertical: 25,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  maxMinTempText: {
    fontSize: 20,
    fontWeight: "300",
  },
  weekWrapper: {
    borderTopColor: "#000",
    borderTopWidth: 2,
  },
  week: {
    flex: 1,
    marginTop: 10,
    marginRight: 20,
    alignContent: "center",
    alignItems: "center",
  },
  weekDate: {
    fontSize: 20,
    fontWeight: "300",
  },
  weekTempWrapper: {
    flexDirection: "row",
  },

  weekTemp: {
    fontSize: 24,
    fontWeight: "500",
  },
  weekDesc: {
    fontSize: 18,
    fontWeight: "400",
  },
});

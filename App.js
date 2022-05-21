import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";

const GOOGLE_API_KEY = "AIzaSyAdYjmk_Ed-gX1szPlsRp1HVad5su3gCkw";
const WEATHER_API_KEY = "3e41232ce3c0a011d11888cf8f244fef";

const image = { uri: "http://openweathermap.org/img/wn/10d@2x.png" };

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "fog",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightnings",
};
const iconsColor = {
  Clouds: "#8d9aa6",
  Clear: "#ffd900",
  Atmosphere: "#3f576e",
  Snow: "#9cceff",
  Rain: "#7ba1d1",
  Drizzle: "#7ba1d1",
  Thunderstorm: "#050096",
};

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
          <View style={styles.currentIconWrapper}>
            <Fontisto
              style={styles.currentIcon}
              name={icons[daily[0]?.weather[0]?.main]}
              size={300}
              color={iconsColor[daily[0]?.weather[0]?.main]}
            />
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
              <View style={styles.maxMinTemp}>
                <View style={styles.maxMinTempBox}>
                  <FontAwesome5
                    name='long-arrow-alt-up'
                    size={20}
                    color='black'
                    style={styles.arrowIcon}
                  />
                  <Text style={styles.maxMinTempText}>
                    {Math.ceil(daily[0]?.temp?.max)}℃
                  </Text>
                </View>
                <View style={styles.maxMinTempBox}>
                  <FontAwesome5
                    name='long-arrow-alt-down'
                    size={20}
                    color='black'
                    style={styles.arrowIcon}
                  />
                  <Text style={styles.maxMinTempText}>
                    {Math.ceil(daily[0]?.temp?.min)}℃
                  </Text>
                </View>
                {/* <Text style={styles.maxMinTempText}>
                  ⬇ {Math.ceil(daily[0]?.temp?.min)}℃
                </Text> */}
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
                  <View style={styles.weekIconWrapper}>
                    <Fontisto
                      style={styles.weekIcon}
                      name={icons[day?.weather[0]?.main]}
                      size={30}
                      color={iconsColor[day?.weather[0]?.main]}
                    />
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
    flex: 1.5,
    paddingTop: 50,
    alignSelf: "flex-end",
  },
  date: {
    textAlign: "right",

    fontSize: 28,
    fontWeight: "300",
  },
  city: {
    textAlign: "right",
    fontSize: 40,

    fontWeight: "700",
  },
  regionAndCountry: {
    textAlign: "right",

    fontWeight: "600",
    marginBottom: 28,
    fontSize: 20,
  },
  weather: {
    flex: 1.5,
  },
  current: {
    flex: 1,
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
    fontSize: 135,
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
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  maxMinTempBox: {
    textAlign: "right",
    flexDirection: "row",
    lineHeight: 22,
    alignContent: "center",
  },
  maxMinTempText: {
    fontSize: 22,
    fontWeight: "300",
  },
  weekWrapper: {
    borderTopColor: "#000",
    borderTopWidth: 1,
    marginTop: 20,
    flex: 1,
  },
  week: {
    marginTop: 20,
    marginRight: 30,
    alignContent: "center",
    alignItems: "center",
  },
  weekDate: {
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
  },
  weekTempWrapper: {
    flexDirection: "row",
    marginBottom: 10,
  },

  weekTemp: {
    fontSize: 24,
    fontWeight: "500",
  },
  weekIconWrapper: {
    marginBottom: 10,
  },
  weekIcon: {},
  weekDesc: {
    fontSize: 18,
    fontWeight: "400",
  },
  currentIconWrapper: {
    position: "absolute",
    top: 150,
    left: -70,
  },
  currentIcon: {},
  arrowIcon: {
    marginRight: 10,
  },
});

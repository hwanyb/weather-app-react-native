import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityText}>Seoul</Text>
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
  city: {
    flex: 3,
  },
  cityText: {
    fontSize: 26,
    fontWeight: 600,
  },
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
  },
  temp: {
    fontSize: 100,
    fontWeight: 700,
  },
  desc: {
    fontSize: 24,
    fontWeight: 100,
  },

  weekWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor:"#000",
    borderTopWidth:2,
  },
  week: {
    flex: 1,
    marginTop:10,
  },
  weekTemp: {
    fontSize: 22,
    fontWeight: 500,
  },
  weekDesc: {
    fontSize: 13,
    fontWeight: 100,
  },
});

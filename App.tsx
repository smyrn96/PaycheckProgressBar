import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PaycheckProgressBar from "./components/PaycheckProgressBar";

export default function App() {
  return (
    <View style={styles.container}>
      <PaycheckProgressBar daysLeft={7} monthDays={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

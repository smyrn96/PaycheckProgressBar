import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";

type PayCheckProgressBarType = {
  daysLeft: number;
  monthDays?: number;
};

const PayCheckProgressBar = ({
  daysLeft,
  monthDays = 30,
}: PayCheckProgressBarType) => {
  const completed = ((monthDays - daysLeft) / monthDays) * 100;
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "short" });
  const finalDateFormat = month.concat(" ", date.toString());
  const daysOrDayLeft = daysLeft > 1 ? `${daysLeft} days` : `${daysLeft} day`;
  const progressBarText = `${daysOrDayLeft} until next paycheck`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridContainer}>
        <Text style={styles.h1}>{finalDateFormat}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${completed}%` }]}></View>
          <Text style={styles.placeholder}>{progressBarText}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
    width: "90%",
    maxWidth: 400,
  },
  h1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  progressBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: 180,
    maxWidth: 400,
    width: "70%",
    backgroundColor: "#e7e9f1",
    padding: 8,
    borderRadius: 16,
  },
  progress: {
    height: "100%",
    color: "#000000",
    backgroundColor: "#4169e1",
    borderRadius: "inherit",
    textAlign: "right",
    position: "absolute",
    left: 0,
    top: 0,
  },
  placeholder: {
    color: "#9c9c9e",
    fontSize: 12,
  },
});

export default PayCheckProgressBar;

import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from "react-native";

type PayCheckProgressBarType = {
  daysLeft: number;
  monthDays?: number;
};

const PayCheckProgressBar = ({
  daysLeft,
  monthDays = 30,
}: PayCheckProgressBarType) => {
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const isLeapYearValidDays =
    new Date(new Date().getFullYear(), 1, 29).getMonth() === 1 ? 29 : 28;

  const isNotValidData =
    daysLeft > 31 ||
    daysLeft < 0 ||
    daysLeft > monthDays ||
    (monthDays !== 30 && monthDays !== 31 && monthDays !== isLeapYearValidDays);
  const isNotValidDataText = "Please provide some valid data";
  const completed = ((monthDays - daysLeft) / monthDays) * 100;
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "short" });
  const finalDateFormat = date.toString().concat(" ", month);
  const daysOrDayLeft = daysLeft > 1 ? `${daysLeft} days` : `${daysLeft} day`;
  const progressBarText = `${daysOrDayLeft} until next paycheck`;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setLayout({ x, y, width, height });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isNotValidData ? (
        <View style={styles.gridContainer}>
          <Text style={styles.h1}>{isNotValidDataText}</Text>
        </View>
      ) : (
        <View style={styles.gridContainer}>
          <Text style={styles.h1}>{finalDateFormat}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {
                  width: `${completed}%`,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.placeholder,
                  {
                    left: layout.x,
                    top: layout.y,
                    color: "#fff",
                  },
                ]}
              >
                {progressBarText}
              </Text>
            </View>

            <Text style={styles.placeholder} onLayout={handleLayout}>
              {progressBarText}
            </Text>
          </View>
        </View>
      )}
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
    alignItems: "center",
    minWidth: 180,
    maxWidth: 400,
    width: "70%",
    backgroundColor: "#e7e9f1",
    padding: 16,
    borderRadius: 16,
    height: "100%",
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
    overflow: "hidden",
    zIndex: 999,
  },
  placeholder: {
    color: "#9c9c9e",
    fontSize: 12,
    position: "absolute",
  },
});

export default PayCheckProgressBar;

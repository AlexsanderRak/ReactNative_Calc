import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyHistory({ history }) {
  return (
      <View style={styles.display}>
        {history.map((el, ind) => (
          <Text style={styles.text} key={ind}>{el}</Text>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: "#fff",
    width: "100%",
    height: "80%",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: "#bdbdbd",
  },
});

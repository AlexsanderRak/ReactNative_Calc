import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHistory from './myHistory';

export default function MyDisplay({ firstOperand, symbol, display, history }) {
  return (
    <View style={styles.display}>
      <MyHistory history={history} />
      <Text style={styles.text}>
        {firstOperand} {symbol} {display}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  text: {
    fontSize: 40,
    color: "#8d8d8d",
  },
});

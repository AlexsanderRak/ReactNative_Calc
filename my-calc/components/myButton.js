import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MyButton({ item, functionMapping, firstOperand, display }) {
  return (
    <TouchableOpacity style={styles.cell} onPress={functionMapping}>
      {item === 'AC' ?
        <Text style={styles.text}>{firstOperand || display ? 'C' : item}</Text>
        : 
        <Text style={styles.text}>{item}</Text>
      }
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fdd835",
    backgroundColor: "#fdd835",
  },
  text: {
    fontSize: 20,
    color: "#424242",
  },
});

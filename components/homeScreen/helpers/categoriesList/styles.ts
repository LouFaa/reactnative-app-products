import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#0a7ea4",
    textAlign: "center",
  },
  activeItem: {
    backgroundColor: "#0a7ea4", // Active item background color
  },
  activeText: {
    color: "#fefefe",
  },
});
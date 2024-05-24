import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    marginVertical: 10,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0a7ea4",
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  activeItem: {
    backgroundColor: "#0a7ea4", // Active item background color
  },
  activeText: {
    color: "#fefefe",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  badgeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    zIndex: 1,
  },
  badge: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
});
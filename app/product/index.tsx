import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Appbar } from "react-native-paper"; // Assuming you use react-native-paper for AppBar

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log("error when getting products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  if (product) {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>{product.category}</Text>
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>Rating: {product.rating.rate}</Text>
            <Text style={styles.ratingCount}>
              ({product.rating.count} reviews)
            </Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  errorText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    color: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    marginRight: 10,
  },
  ratingCount: {
    fontSize: 16,
    color: "#888",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  badgeContainer: {
    backgroundColor: "#ff6347",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    maxWidth: "auto",
  },
  badge: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;

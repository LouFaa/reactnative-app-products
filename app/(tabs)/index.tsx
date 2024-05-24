import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import SearchInput from "@/components/homeScreen/helpers/searchInput";
import CategoriesList from "@/components/homeScreen/helpers/categoriesList";
import ProductsList from "@/components/homeScreen/helpers/productsList";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState("All");
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.log("error when getting products", error);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.log("error when getting categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categorie === "All" || product.category === categorie;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput search={search} setSearch={setSearch} />
      <CategoriesList
        data={categories}
        categorie={categorie}
        setCategorie={setCategorie}
      />
      {filteredProducts.length > 0 ? (
        <ProductsList data={filteredProducts} />
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>No products found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    color: "#555",
  },
});

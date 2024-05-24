import { useEffect, useState, useRef } from "react";
import axios from "axios";
import TableExample from "@/components/DataTable";
import {
  View,
  ActivityIndicator,
  Modal,
  Alert,
  Button,
  TextInput,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Icon } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

export default function ProductsScreen() {
  const [products, setProductts] = useState<Product[]>([]);
  const [categories, setCat] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDes] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProductts(response.data);
    } catch (error) {
      console.log("error when getting products", error);
    }
  };

  const getCategories = async () => {
    await axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        let result =
          res.data.length > 0
            ? res.data.map((item: String) => {
                return { label: item, value: item };
              })
            : null;
        setCat(result);
      })
      .catch((err) => console.log("error when getting categories", err));
  };
  const addProduct = () => {
    axios
      .post("https://fakestoreapi.com/products", {
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      })
      .then((res) => {
        setModalAdd(false);
        getProducts();
        return Alert.alert("Succés!", "Produit créé avec succés!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((err) => {
        return Alert.alert(
          "Erreur!",
          "Oops, ...Une erreur s'est produite veuillez réessayer",
          [{ text: "FERMER", onPress: () => console.log("Close Pressed") }]
        );
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const ModalCreate = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAdd}
          onRequestClose={() => {
            setModalAdd(!modalAdd);
          }}
        >
          <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.containerImage}>
                  <Pressable style={styles.imageb} onPress={pickImage}>
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Choisissez une image
                    </Text>
                  </Pressable>
                  {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                  )}
                </View>
                <Text style={styles.modalText}>Titre: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setTitle}
                  placeholder="Titre"
                  value={title}
                />
                <Text style={styles.modalText}>Catégorie:</Text>
                <View style={styles.select}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: "Séléctionnez la catégorie",
                      value: null,
                    }}
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                    items={categories}
                  />
                </View>
                <Text style={styles.modalText}>Prix: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setPrice}
                  value={price}
                  placeholder="Prix"
                  keyboardType="numeric"
                />
                <Text style={styles.modalText}>Description:</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={setDes}
                  value={description}
                  placeholder="Description"
                  style={styles.description}
                />
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalAdd(!modalAdd), setImage("");
                    }}
                  >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonUpdate]}
                    onPress={() => addProduct()}
                  >
                    <Text style={styles.textStyle}>Créer</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        navigation.navigate("login");
      }
    };

    // Add event listener for navigation focus
    const unsubscribe = navigation.addListener("focus", () => {
      checkAuthentication();
    });

    // Cleanup function to remove the event listener
    return unsubscribe;
  }, [navigation]); // Include navigation as a dependency
const logout=async ()=>{
  await AsyncStorage.removeItem("authToken")
  navigation.navigate("index");

}
  return products.length > 0 ? (
    <>
      <View style={styles.container}>
        <Text style={styles.titleContainer}>Products screen</Text>
        <TouchableOpacity onPress={() => logout()}>
          <Icon
            name="logout"
            style={{ alignItems: "flex-start", paddingStart: 20 }}
          />
        </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalAdd(true)}>
          <Icon
            name="add-box"
            style={{ alignItems: "flex-end", paddingEnd: 20 }}
          />
        </TouchableOpacity>
        
        <TableExample data={products} />
      </View>
      {modalAdd ? ModalCreate() : null}
    </>
  ) : (
    <View style={[styles.horizontal]}>
      <ActivityIndicator size="large" color={"#0a7ea4"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    marginTop: 18,
    flexDirection: "column",
  },
  horizontal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  titleContainer: {
    alignItems: "center",
    paddingLeft: 20,
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 20,
    gap: 8,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  productsList: {
    backgroundColor: "#eeeeee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  input: {
    height: 30,
    marginBottom: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 200,
  },

  tableHeader: {
    backgroundColor: "#FFFFFF",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },

  buttonUpdate: {
    backgroundColor: "#DDBB11",
  },
  buttonClose: {
    backgroundColor: "#0a7ea4",
  },
  imageb: {
    borderRadius: 5,
    padding: 5,
    width: 200,
    marginBottom: 12,
    backgroundColor: "#0a7ea4",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },

  select: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    width: 200,
  },
  description: {
    borderRadius: 5,
    borderWidth: 1,
    width: 200,
  },
  logo: {
    width: 200,
    height: 250,
  },
});

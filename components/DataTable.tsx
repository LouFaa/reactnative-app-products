import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { DataTable } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "@rneui/themed";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

type productsProps = {
  data: Product[];
};
const TableExample = ({ data }: productsProps) => {
  const [productDetails, setPro] = useState<Product>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [categories, setCat] = useState([]);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDes] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        let result = res.data.length
          ? res.data.map((item: String) => {
              return { label: item, value: item };
            })
          : null;
        setCat(result);
      })
      .catch((err) => console.log("err getCategories", err));
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
      setImage(result?.assets[0]?.uri);
    }
  };

  const deleteProduct = () => {
    axios
      .delete("https://fakestoreapi.com/products/" + productDetails.id)
      .then((res) => {
        setModalDelete(false);
        return Alert.alert("Succés!", "Produit supprimé avec succés!", [
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
  const updateProduct = () => {
    axios
      .put("https://fakestoreapi.com/products/" + productDetails?.id, {
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      })
      .then((res) => {
        setModalUpdate(false);
        return Alert.alert("Succés!", "Produit mis à jour avec succés!", [
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
  const ModalVisibility = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.containerImage}>
                  <Image
                    style={styles.logo}
                    source={{ uri: productDetails?.image }}
                  ></Image>
                </View>
                <Text style={styles.modalText}>
                  Titre:{" "}
                  <Text style={{ fontWeight: "300" }}>
                    {productDetails?.title}
                  </Text>
                </Text>
                <Text style={styles.modalText}>
                  Catégorie:{" "}
                  <Text style={{ fontWeight: "300" }}>
                    {productDetails?.category}
                  </Text>
                </Text>
                <Text style={styles.modalText}>
                  Prix:{" "}
                  <Text style={{ fontWeight: "300" }}>
                    {productDetails?.price}
                  </Text>
                </Text>
                <Text style={styles.modalText}>
                  Description:{" "}
                  <Text style={{ fontWeight: "300" }}>
                    {productDetails?.description}
                  </Text>
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Fermer</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };
  const ModalUpdate = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUpdate}
          onRequestClose={() => {
            setModalUpdate(!modalUpdate);
          }}
        >
          <ScrollView scrollEnabled>
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
                    textInputProps={{ paddingLeft: 5, color: "#000000" }}
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
                  placeholder="Prix"
                  keyboardType="numeric"
                  onChangeText={setPrice}
                  value={`${price}`}
                />
                <Text style={styles.modalText}>Description:</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  placeholder="Description"
                  onChangeText={setDes}
                  value={description}
                  style={styles.description}
                />
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalUpdate(!modalUpdate), setImage(null);
                    }}
                  >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonUpdate]}
                    onPress={() => updateProduct()}
                  >
                    <Text style={styles.textStyle}>Modifier</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };
  const DeleteModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDelete}
          onRequestClose={() => {
            setModalDelete(!modalDelete);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.containerImage}>
                <Text style={styles.modalText}>Êtes-vous sûr? </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    marginBottom: 5,
                    textAlign: "center",
                  }}
                >
                  Êtes-vous sûr de vouloir supprimer cet enregistrement?{" "}
                </Text>
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalDelete(!modalDelete)}
                  >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonDelete]}
                    onPress={() => deleteProduct()}
                  >
                    <Text style={styles.textStyle}>Supprimer</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <>
      <ScrollView>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.title}>Titre</DataTable.Title>
            <DataTable.Title style={styles.title}>Catégorie</DataTable.Title>
            <DataTable.Title>Prix</DataTable.Title>
            <DataTable.Title>Action</DataTable.Title>
          </DataTable.Header>
          {data.map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.title}</DataTable.Cell>
                <DataTable.Cell>{item.category}</DataTable.Cell>
                <DataTable.Cell>{item.price}</DataTable.Cell>
                <DataTable.Cell>
                  <Text>
                    <TouchableOpacity
                      onPress={() => {
                        setModalDelete(true), setPro(item);
                      }}
                    >
                      <Icon name="delete" color={"red"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setModalUpdate(true),
                          setPro(item),
                          setDes(item.description),
                          setCategory(item.category),
                          setTitle(item.title),
                          setImage(item.image),
                          setPrice(item.price);
                      }}
                    >
                      <Icon name="edit" color={"#0a7ea4"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true), setPro(item);
                      }}
                    >
                      <Icon name="visibility" color={"light"} />
                    </TouchableOpacity>
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
      {modalVisible ? ModalVisibility() : null}
      {modalDelete ? DeleteModal() : null}
      {modalUpdate ? ModalUpdate() : null}
    </>
  );
};

export default TableExample;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    height: 30,
    marginBottom: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    width: 100,
  },
  buttonDelete: {
    backgroundColor: "#FF0000",
  },
  buttonUpdate: {
    backgroundColor: "#DDBB11",
  },
  buttonClose: {
    backgroundColor: "#0a7ea4",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageb: {
    borderRadius: 5,
    padding: 5,
    width: 200,
    marginBottom: 12,
    backgroundColor: "#0a7ea4",
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
    paddingLeft: 5,
    width: 200,
  },
  logo: {
    width: 300,
    marginBottom: 12,
    height: 350,
    borderWidth: 1,
    borderColor: "#0a7ea4",
    borderRadius: 20,
  },
});

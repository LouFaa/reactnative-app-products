import { Dispatch, SetStateAction } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";
import { styles } from "./styles";

type categoriesProps = {
  data: string[];
  categorie: string;
  setCategorie: Dispatch<SetStateAction<string>>;
};

export default function CategoriesList({
  data,
  categorie,
  setCategorie,
}: categoriesProps) {
  const dataWithAll = ["All", ...data];

  return (
    <View style={styles.container}>
      <FlatList
        data={dataWithAll}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, categorie === item && styles.activeItem]}
            onPress={() => setCategorie(item)}
          >
            <Text style={[categorie === item && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}
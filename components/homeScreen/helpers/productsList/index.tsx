import React, { useEffect, useRef } from "react";
import { router } from "expo-router";
import { FlatList, View, Text, TouchableOpacity, Image } from "react-native";

import { styles } from "./styles";

type productsProps = {
  data: Product[];
};

export default function ProductsList({ data }: productsProps) {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/product",
                params: { productId: item.id },
              })
            }
          >
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{item.category}</Text>
            </View>
            <Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
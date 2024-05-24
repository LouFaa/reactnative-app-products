import { Dispatch, SetStateAction } from "react";
import { Searchbar } from "react-native-paper";

type searchProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function SearchInput({ search, setSearch }: searchProps) {
  const updateSearch = (search: string) => {
    setSearch(search);
  };
  return (
    <Searchbar
      placeholder="Find your products"
      onChangeText={updateSearch}
      value={search}
      style={{
        backgroundColor: "#fff",
        color: "#A9A9AC",
        borderColor: "#0a7ea4",
        borderWidth: 1,
      }}
      iconColor="#0a7ea4"
      placeholderTextColor="#A9A9AC"
      inputStyle={{ color: "#000" }}
    />
  );
}
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({
  value,
  setValue,
  placeholder,
  pokemonSearch,
  typesFilter,
}) => {
  const navigaton = useNavigation();

  const handleFilter = () => {
    navigaton.navigate("ModalFilter", typesFilter);
  };

  return pokemonSearch ? (
    <View
      style={{
        flexDirection: "row",
        width: "95%",
        justifyContent: "space-between",
      }}
    >
      <View style={[styles.inputContainer, { width: "85%" }]}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <View style={styles.iconContainer}>
          <Ionicons name={"search"} size={20} color={"#8f8f8f"} />
        </View>
      </View>

      <TouchableOpacity style={styles.filter} onPress={handleFilter}>
        <Ionicons name={"funnel"} size={20} color={"#fff"} />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={[styles.inputContainer, { width: "90%" }]}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <View style={styles.iconContainer}>
        <Ionicons name={"search"} size={20} color={"#8f8f8f"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
  },
  inputContainer: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: "#cfcecc",
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    paddingRight: 20,
  },
  filter: {
    backgroundColor: "#24a0ed",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default SearchBar;

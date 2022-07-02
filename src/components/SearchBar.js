import { View, Text, StyleSheet, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = ({ value, setValue, placeholder }) => {
  return (
    <View style={styles.inputContainer}>
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
    width: "95%",
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
});

export default SearchBar;

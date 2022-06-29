import Ionicons from "react-native-vector-icons/Ionicons";

export const setIconTabBar = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Search") {
      iconName = focused ? "search-circle" : "search-circle-outline";
    } else if (route.name === "Settings") {
      iconName = focused ? "settings" : "settings-outline";
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "red",
  tabBarInactiveTintColor: "gray",
});

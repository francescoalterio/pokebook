import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import Screens from "./src/Screens";

import store from "./src/store";

import mobileAds from "react-native-google-mobile-ads";
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";

export default function App() {
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      // Initialization complete!
      AppOpenAd.createForAdRequest(TestIds.APP_OPEN);
    });

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Screens />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

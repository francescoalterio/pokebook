import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import Screens from "./src/Screens";

import store from "./src/store";

import mobileAds from "react-native-google-mobile-ads";
import {
  AppOpenAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";

const adUnitId = TestIds.APP_OPEN;

export default function App() {
  useEffect(() => {
    const ads = async () => {
      const appOpenAd = AppOpenAd.createForAdRequest(adUnitId);

      // Preload an app open ad
      appOpenAd.load();

      // Show the app open ad when user brings the app to the foreground.
      appOpenAd.show();
    };
    ads;
  }, []);

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

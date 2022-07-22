import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import Screens from "./src/Screens";

import store from "./src/store";

import mobileAds from "react-native-google-mobile-ads";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";

export default function App() {
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    TestIds.INTERSTITIAL,
    {
      requestNonPersonalizedAdsOnly: true,
    }
  );
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      // Initialization complete!
      load();
    });

  useEffect(() => {
    if (isLoaded) show();
  }, [isLoaded]);

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

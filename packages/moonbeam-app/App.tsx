import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      // keep splash screen visible for 1.5 seconds, while we preload anything that we want
      await SplashScreen.preventAutoHideAsync()
      await new Promise(resolve => setTimeout(resolve, 1000))
      await SplashScreen.hideAsync()
    }
    prepare()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

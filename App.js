//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navigation from './src/navigation';
import registerNNPushToken from 'native-notify';
export default function App() {
  registerNNPushToken(2795, 'kAzFu7padqSGZXi4kdKb4G');
  return (
    <SafeAreaView style={styles.root}>
    <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6e9',
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: '#f6f6e9'
  }
});

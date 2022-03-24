import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PrivateKey } from './src/PrivateKey';
import { ec as EC } from 'elliptic-expo';

const secp256k1 = new EC('secp256k1');

enum KeyType {
  k1 = 0,
  r1 = 1,
  wa = 2
}

export default function App() {

  const ellipticKeyPair = secp256k1.genKeyPair();

  const privateKey = PrivateKey.fromElliptic(
    ellipticKeyPair,
    KeyType.k1,
    secp256k1,
  ).toString();

  console.log(privateKey);

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

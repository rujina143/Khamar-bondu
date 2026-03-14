import { View, Text } from 'react-native';

export default function Logout() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'red' }}>You are logged out!</Text>
    </View>
  );
}

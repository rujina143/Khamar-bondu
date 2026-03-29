import { View, Text } from 'react-native';
import FooterNavigation from '../components/footer-matketplace';

export default function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Page</Text>
      <FooterNavigation/>
    </View>
  );
}

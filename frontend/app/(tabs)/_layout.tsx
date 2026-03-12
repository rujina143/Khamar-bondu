import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="farmer" options={{ title: 'Farmer Dashboard' }} />
      <Tabs.Screen name="buyer" options={{ title: 'Buyer Dashboard' }} />
    </Tabs>
  );
}

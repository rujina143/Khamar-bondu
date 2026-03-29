import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="farmer"
        options={{ title: 'খামার বন্ধু' }}
      />
      <Tabs.Screen
        name="buyer"
        options={{ title: 'ক্রেতা ড্যাশবোর্ড' }}
      />
    </Tabs>
  );
}

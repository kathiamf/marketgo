import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { colors } from '@/theme';

export default function TabsLayout() {
  const { count } = useCart();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lojas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="storefront"
              size={size}
              color={typeof color === 'string' ? color : colors.muted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart"
              size={size}
              color={typeof color === 'string' ? color : colors.muted}
            />
          ),
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.primary },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt"
              size={size}
              color={typeof color === 'string' ? color : colors.muted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={typeof color === 'string' ? color : colors.muted}
            />
          ),
        }}
      />
    </Tabs>
  );
}

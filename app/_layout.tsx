import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { queryClient } from '@/lib/queryClient';
import { colors, spacing } from '@/theme';

function SupabaseSetupRequired() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.icon}>🛒</Text>
        <Text style={styles.title}>MarketGo</Text>
        <Text style={styles.message}>
          Configure o Supabase para iniciar o aplicativo.
        </Text>
        <Text style={styles.help}>
          Copie .env.example para .env, preencha EXPO_PUBLIC_SUPABASE_URL e
          EXPO_PUBLIC_SUPABASE_KEY com a URL e a chave pública do seu projeto e reinicie
          com npx expo start -c.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  if (!isSupabaseConfigured) return <SupabaseSetupRequired />;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  icon: { fontSize: 56 },
  title: { fontSize: 32, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  message: {
    marginTop: spacing.md,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  help: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 21,
    textAlign: 'center',
  },
});

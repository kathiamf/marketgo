import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { QuantityStepper } from '@/components/QuantityStepper';
import { Screen } from '@/components/Screen';
import { ErrorState, LoadingView } from '@/components/StateViews';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useProduct, useStore } from '@/hooks/useCatalog';
import { colors, spacing } from '@/theme';
import { friendlyError } from '@/utils/errors';
import { formatMoney } from '@/utils/money';

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = useProduct(id);
  const store = useStore(product.data?.store_id);
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  if (product.isLoading || store.isLoading) return <LoadingView />;
  if (product.isError || store.isError || !product.data || !store.data) {
    return (
      <ErrorState
        message={friendlyError(
          product.error ?? store.error ?? 'Produto ou loja não encontrados.',
        )}
        onRetry={() => {
          void product.refetch();
          void store.refetch();
        }}
      />
    );
  }

  const currentProduct = product.data;
  const currentStore = store.data;
  const total = (Math.round(currentProduct.price * 100) * quantity) / 100;

  return (
    <Screen edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>{currentProduct.emoji}</Text>
        </View>
        <Text style={styles.store}>{currentStore.name}</Text>
        <Text style={styles.name}>{currentProduct.name}</Text>
        {currentProduct.description ? (
          <Text style={styles.description}>{currentProduct.description}</Text>
        ) : null}
        <Text style={styles.price}>{formatMoney(currentProduct.price)}</Text>
        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Quantidade</Text>
          <QuantityStepper value={quantity} min={1} onChange={setQuantity} />
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title={`Adicionar · ${formatMoney(total)}`}
          onPress={() =>
            addToCart(currentStore, currentProduct, quantity, () => router.back())
          }
          disabled={!currentStore.is_open}
        />
        {!currentStore.is_open ? (
          <Text style={styles.closed}>Esta loja está fechada agora.</Text>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: spacing.md },
  hero: {
    height: 200,
    borderRadius: 24,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emoji: { fontSize: 96 },
  store: { fontSize: 14, color: colors.muted },
  name: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 2 },
  description: {
    fontSize: 16,
    color: colors.muted,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginTop: spacing.md,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  quantityLabel: { fontSize: 16, fontWeight: '600', color: colors.text },
  footer: { padding: spacing.md, gap: spacing.sm },
  closed: { textAlign: 'center', color: colors.danger, fontSize: 14 },
});

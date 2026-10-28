import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Alert } from 'react-native';
import type { Cart, Product, Store } from '@/types';
import {
  addToCart,
  cartTotals,
  EMPTY_CART,
  isValidCart,
  itemCount,
  removeItem,
  replaceCart,
  setQuantity,
} from '@/utils/cart';
import { useAuth } from './AuthContext';

type CartStore = Pick<Store, 'id' | 'name' | 'delivery_fee' | 'min_order'>;
type CartProduct = Pick<Product, 'id' | 'name' | 'emoji' | 'price'>;

interface CartContextValue {
  cart: Cart;
  count: number;
  totals: ReturnType<typeof cartTotals>;
  add: (
    store: CartStore,
    product: CartProduct,
    quantity?: number,
  ) => 'added' | 'conflict';
  replaceWith: (store: CartStore, product: CartProduct, quantity?: number) => void;
  setCart: (cart: Cart) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const key = user ? `marketgo.cart.${user.id}` : null;
  const [cart, setCartState] = useState<Cart>(EMPTY_CART);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!key) return;

    AsyncStorage.getItem(key)
      .then(async (raw) => {
        if (!raw) return EMPTY_CART;
        try {
          const parsed: unknown = JSON.parse(raw);
          if (!isValidCart(parsed))
            throw new Error('Formato de carrinho armazenado inválido.');
          return parsed;
        } catch (error) {
          console.error('O carrinho salvo não pôde ser lido:', error);
          Alert.alert(
            'Carrinho recuperado',
            'Os dados salvos estavam inválidos e o carrinho foi reiniciado.',
          );
          await AsyncStorage.removeItem(key);
          return EMPTY_CART;
        }
      })
      .then((savedCart) => {
        if (!cancelled) setCartState(savedCart);
      })
      .catch((error: unknown) => {
        console.error('Falha ao carregar o carrinho salvo:', error);
        if (!cancelled) setCartState(EMPTY_CART);
        Alert.alert(
          'Falha ao carregar carrinho',
          'Feche e reabra o app para tentar novamente.',
        );
      })
      .then(() => {
        if (!cancelled) setLoadedFor(key);
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const visibleCart = key && loadedFor === key ? cart : EMPTY_CART;

  useEffect(() => {
    if (!key || loadedFor !== key) return;
    AsyncStorage.setItem(key, JSON.stringify(cart)).catch((error: unknown) => {
      console.error('Falha ao salvar o carrinho:', error);
      Alert.alert(
        'Falha ao salvar carrinho',
        'Verifique o espaço disponível no aparelho.',
      );
    });
  }, [cart, key, loadedFor]);

  const add = useCallback(
    (store: CartStore, product: CartProduct, quantity = 1) => {
      const result = addToCart(visibleCart, store, product, quantity);
      if (result.conflict) return 'conflict' as const;
      setCartState(result.cart);
      return 'added' as const;
    },
    [visibleCart],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart: visibleCart,
      count: itemCount(visibleCart),
      totals: cartTotals(visibleCart),
      add,
      replaceWith: (store, product, quantity = 1) =>
        setCartState(replaceCart(store, product, quantity)),
      setCart: setCartState,
      changeQuantity: (productId, quantity) =>
        setCartState((current) => setQuantity(current, productId, quantity)),
      remove: (productId) => setCartState((current) => removeItem(current, productId)),
      clear: () => setCartState(EMPTY_CART),
    }),
    [visibleCart, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de <CartProvider>');
  return context;
}

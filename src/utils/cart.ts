import type { Cart, CartItem, Order, Product, Store } from '@/types';

export const MAX_QUANTITY = 20;
export const EMPTY_CART: Cart = {
  storeId: null,
  storeName: '',
  deliveryFee: 0,
  minOrder: 0,
  items: [],
};

type CartStore = Pick<Store, 'id' | 'name' | 'delivery_fee' | 'min_order'>;
type CartProduct = Pick<Product, 'id' | 'name' | 'emoji' | 'price'>;
const clamp = (value: number) => Math.max(0, Math.min(MAX_QUANTITY, Math.floor(value)));
const cents = (value: number) => Math.round(value * 100);

function newCart(store: CartStore): Cart {
  return {
    storeId: store.id,
    storeName: store.name,
    deliveryFee: store.delivery_fee,
    minOrder: store.min_order,
    items: [],
  };
}

function withItem(cart: Cart, product: CartProduct, quantity: number): Cart {
  const existing = cart.items.find((item) => item.productId === product.id);
  const total = clamp((existing?.quantity ?? 0) + quantity);
  if (total === 0) {
    return { ...cart, items: cart.items.filter((item) => item.productId !== product.id) };
  }

  const item: CartItem = {
    productId: product.id,
    name: product.name,
    emoji: product.emoji,
    price: product.price,
    quantity: total,
  };
  return existing
    ? {
        ...cart,
        items: cart.items.map((current) =>
          current.productId === product.id ? item : current,
        ),
      }
    : { ...cart, items: [...cart.items, item] };
}

export function addToCart(
  cart: Cart,
  store: CartStore,
  product: CartProduct,
  quantity = 1,
): { cart: Cart; conflict: boolean } {
  if (cart.storeId && cart.storeId !== store.id && cart.items.length > 0) {
    return { cart, conflict: true };
  }
  const base = cart.storeId === store.id ? cart : newCart(store);
  return { cart: withItem(base, product, quantity), conflict: false };
}

export function replaceCart(store: CartStore, product: CartProduct, quantity = 1): Cart {
  return withItem(newCart(store), product, quantity);
}

export function setQuantity(cart: Cart, productId: string, quantity: number): Cart {
  const nextQuantity = clamp(quantity);
  const items =
    nextQuantity === 0
      ? cart.items.filter((item) => item.productId !== productId)
      : cart.items.map((item) =>
          item.productId === productId ? { ...item, quantity: nextQuantity } : item,
        );
  return items.length === 0 ? EMPTY_CART : { ...cart, items };
}

export function removeItem(cart: Cart, productId: string): Cart {
  return setQuantity(cart, productId, 0);
}

export function itemCount(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function quantityOf(cart: Cart, productId: string): number {
  return cart.items.find((item) => item.productId === productId)?.quantity ?? 0;
}

export function cartTotals(cart: Cart): {
  subtotal: number;
  deliveryFee: number;
  total: number;
} {
  const subtotalCents = cart.items.reduce(
    (sum, item) => sum + cents(item.price) * item.quantity,
    0,
  );
  const deliveryCents = cart.items.length > 0 ? cents(cart.deliveryFee) : 0;
  return {
    subtotal: subtotalCents / 100,
    deliveryFee: deliveryCents / 100,
    total: (subtotalCents + deliveryCents) / 100,
  };
}

export function missingForMinimum(cart: Cart): number | null {
  const missing = cents(cart.minOrder) - cents(cartTotals(cart).subtotal);
  return missing > 0 ? missing / 100 : null;
}

export function isValidCart(value: unknown): value is Cart {
  if (typeof value !== 'object' || value === null) return false;
  const cart = value as Record<string, unknown>;
  if (!(cart.storeId === null || typeof cart.storeId === 'string')) return false;
  if (
    typeof cart.storeName !== 'string' ||
    typeof cart.deliveryFee !== 'number' ||
    !Number.isFinite(cart.deliveryFee) ||
    typeof cart.minOrder !== 'number' ||
    !Number.isFinite(cart.minOrder)
  ) {
    return false;
  }
  if (!Array.isArray(cart.items)) return false;

  return cart.items.every((candidate: unknown) => {
    if (typeof candidate !== 'object' || candidate === null) return false;
    const item = candidate as Record<string, unknown>;
    return (
      typeof item.productId === 'string' &&
      typeof item.name === 'string' &&
      typeof item.emoji === 'string' &&
      typeof item.price === 'number' &&
      Number.isFinite(item.price) &&
      item.price > 0 &&
      typeof item.quantity === 'number' &&
      Number.isInteger(item.quantity) &&
      item.quantity >= 1 &&
      item.quantity <= MAX_QUANTITY
    );
  });
}

export function reorderCart(
  order: Pick<Order, 'items'>,
  store: CartStore,
  products: Pick<Product, 'id' | 'name' | 'emoji' | 'price' | 'is_active'>[],
): { cart: Cart; skipped: string[] } {
  let cart = newCart(store);
  const skipped: string[] = [];

  for (const item of order.items ?? []) {
    const product = products.find(
      (candidate) => candidate.id === item.product_id && candidate.is_active,
    );
    if (!product) {
      skipped.push(item.name);
    } else {
      cart = withItem(cart, product, item.quantity);
    }
  }
  return { cart: cart.items.length > 0 ? cart : EMPTY_CART, skipped };
}

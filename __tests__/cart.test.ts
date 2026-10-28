import type { Order, Product, Store } from '@/types';
import {
  addToCart,
  cartTotals,
  EMPTY_CART,
  isValidCart,
  itemCount,
  MAX_QUANTITY,
  missingForMinimum,
  quantityOf,
  removeItem,
  reorderCart,
  replaceCart,
  setQuantity,
} from '@/utils/cart';

const market = { id: 's1', name: 'Mercado', delivery_fee: 5.9, min_order: 20 };
const bakery = { id: 's2', name: 'Padaria', delivery_fee: 3.5, min_order: 10 };
const milk = { id: 'p1', name: 'Leite', emoji: '🥛', price: 5.25 };
const rice = { id: 'p2', name: 'Arroz', emoji: '🍚', price: 29.9 };
const bread = { id: 'p3', name: 'Pão', emoji: '🥖', price: 4.8 };

describe('addToCart', () => {
  it('creates a store cart and accumulates the same product', () => {
    let { cart } = addToCart(EMPTY_CART, market, milk, 2);
    ({ cart } = addToCart(cart, market, milk, 3));
    expect(cart.storeId).toBe('s1');
    expect(cart.items).toHaveLength(1);
    expect(quantityOf(cart, 'p1')).toBe(5);
  });

  it('reports a store conflict without changing the existing cart', () => {
    const { cart } = addToCart(EMPTY_CART, market, milk);
    const result = addToCart(cart, bakery, bread);
    expect(result.conflict).toBe(true);
    expect(result.cart).toBe(cart);
  });

  it('does not exceed the per-product limit', () => {
    const { cart } = addToCart(EMPTY_CART, market, milk, 18);
    expect(quantityOf(addToCart(cart, market, milk, 10).cart, 'p1')).toBe(MAX_QUANTITY);
  });

  it('replaceCart discards the previous store cart', () => {
    const cart = replaceCart(bakery, bread, 2);
    expect(cart.storeId).toBe('s2');
    expect(itemCount(cart)).toBe(2);
  });
});

describe('setQuantity and removeItem', () => {
  it('changes quantities, caps at 20, and removes with zero', () => {
    let { cart } = addToCart(EMPTY_CART, market, milk, 2);
    ({ cart } = addToCart(cart, market, rice, 1));
    expect(quantityOf(setQuantity(cart, 'p1', 7), 'p1')).toBe(7);
    expect(quantityOf(setQuantity(cart, 'p1', 99), 'p1')).toBe(MAX_QUANTITY);
    expect(setQuantity(cart, 'p1', 0).items.map((item) => item.productId)).toEqual([
      'p2',
    ]);
  });

  it('returns the empty cart after removing its last item', () => {
    const { cart } = addToCart(EMPTY_CART, market, milk);
    expect(removeItem(cart, 'p1')).toBe(EMPTY_CART);
  });
});

describe('cartTotals and minimum order', () => {
  it('sums cents and includes delivery', () => {
    let { cart } = addToCart(EMPTY_CART, market, milk, 2);
    ({ cart } = addToCart(cart, market, rice, 1));
    expect(cartTotals(cart)).toEqual({ subtotal: 40.4, deliveryFee: 5.9, total: 46.3 });
  });

  it('does not charge delivery for an empty cart', () => {
    expect(cartTotals(EMPTY_CART)).toEqual({ subtotal: 0, deliveryFee: 0, total: 0 });
  });

  it('avoids floating point addition errors', () => {
    const first = addToCart(
      EMPTY_CART,
      { ...market, delivery_fee: 0 },
      {
        ...milk,
        price: 0.1,
      },
    ).cart;
    const result = addToCart(
      first,
      { ...market, delivery_fee: 0 },
      { id: 'x', name: 'X', emoji: '🍬', price: 0.2 },
    ).cart;
    expect(cartTotals(result).subtotal).toBe(0.3);
  });

  it('calculates the amount missing for a store minimum', () => {
    const { cart } = addToCart(EMPTY_CART, market, milk, 2);
    expect(missingForMinimum(cart)).toBe(9.5);
    expect(missingForMinimum(addToCart(cart, market, rice).cart)).toBeNull();
  });
});

describe('isValidCart', () => {
  it('accepts valid carts and rejects malformed data', () => {
    const { cart } = addToCart(EMPTY_CART, market, milk);
    expect(isValidCart(cart)).toBe(true);
    expect(isValidCart(EMPTY_CART)).toBe(true);
    expect(isValidCart(null)).toBe(false);
    expect(isValidCart({ ...cart, items: [{ productId: 'p1' }] })).toBe(false);
    expect(isValidCart({ ...cart, deliveryFee: '5' })).toBe(false);
    expect(isValidCart({ ...cart, items: [{ ...cart.items[0], quantity: 0 }] })).toBe(
      false,
    );
  });
});

describe('reorderCart', () => {
  const store = market as Store;
  const order = {
    items: [
      { product_id: 'p1', name: 'Leite', quantity: 2 },
      { product_id: 'p2', name: 'Arroz', quantity: 1 },
      { product_id: null, name: 'Produto antigo', quantity: 1 },
    ],
  } as Order;
  const products = [
    { ...milk, price: 5.9, is_active: true },
    { ...rice, is_active: false },
  ] as Product[];

  it('uses current prices and skips unavailable products', () => {
    const { cart, skipped } = reorderCart(order, store, products);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toMatchObject({ productId: 'p1', price: 5.9, quantity: 2 });
    expect(skipped).toEqual(['Arroz', 'Produto antigo']);
  });

  it('returns an empty cart when no ordered products are available', () => {
    expect(reorderCart(order, store, []).cart).toBe(EMPTY_CART);
  });
});

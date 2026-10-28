import type { Product, Store } from '@/types';
import { filterStores, formatEta, groupProducts, sortStores } from '@/utils/catalog';

const store = (partial: Partial<Store> & Pick<Store, 'id' | 'name'>): Store => ({
  category: 'Mercado',
  emoji: '🛒',
  description: '',
  rating: 4.5,
  delivery_fee: 5,
  eta_min: 30,
  eta_max: 45,
  min_order: 0,
  is_open: true,
  created_at: '',
  ...partial,
});

const stores = [
  store({ id: '1', name: 'Mercado Bom Preço', rating: 4.7 }),
  store({ id: '2', name: 'Padaria Pão Quente', category: 'Padaria', rating: 4.8 }),
  store({
    id: '3',
    name: 'Farmácia Vida',
    category: 'Farmácia',
    rating: 4.6,
    description: 'Medicamentos',
  }),
  store({
    id: '4',
    name: 'Sushi Sakura',
    category: 'Restaurante',
    rating: 4.9,
    is_open: false,
  }),
];

describe('filterStores', () => {
  it('searches without accents or case sensitivity', () => {
    expect(filterStores(stores, 'FARMACIA', null).map((item) => item.id)).toEqual(['3']);
    expect(filterStores(stores, 'pao', null).map((item) => item.id)).toEqual(['2']);
  });

  it('also searches store descriptions', () => {
    expect(filterStores(stores, 'medicamentos', null).map((item) => item.id)).toEqual([
      '3',
    ]);
  });

  it('combines category and text filters', () => {
    expect(filterStores(stores, '', 'Padaria').map((item) => item.id)).toEqual(['2']);
    expect(filterStores(stores, 'bom', 'Padaria')).toEqual([]);
  });
});

describe('sortStores', () => {
  it('puts open stores first, ordered by rating', () => {
    expect(sortStores(stores).map((item) => item.id)).toEqual(['2', '1', '3', '4']);
  });

  it('does not mutate the source array', () => {
    const copy = [...stores];
    sortStores(stores);
    expect(stores).toEqual(copy);
  });
});

describe('groupProducts', () => {
  const product = (id: string, section: string) => ({ id, section }) as Product;

  it('groups products while preserving first-seen section order', () => {
    const groups = groupProducts([
      product('a', 'Pães'),
      product('b', 'Doces'),
      product('c', 'Pães'),
    ]);
    expect(groups.map((group) => group.title)).toEqual(['Pães', 'Doces']);
    expect(groups[0].data.map((item) => item.id)).toEqual(['a', 'c']);
  });
});

it('formats an ETA with an en dash', () => {
  expect(formatEta(30, 45)).toBe('30–45 min');
});

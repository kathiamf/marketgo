import type { Product, Store, StoreCategory } from '@/types';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function filterStores(
  stores: Store[],
  query: string,
  category: StoreCategory | null,
): Store[] {
  const normalizedQuery = normalize(query.trim());
  return stores.filter((store) => {
    if (category && store.category !== category) return false;
    return (
      !normalizedQuery ||
      normalize(`${store.name} ${store.category} ${store.description}`).includes(
        normalizedQuery,
      )
    );
  });
}

export function sortStores(stores: Store[]): Store[] {
  return [...stores].sort(
    (left, right) =>
      Number(right.is_open) - Number(left.is_open) || right.rating - left.rating,
  );
}

export interface ProductSection {
  title: string;
  data: Product[];
}

export function groupProducts(products: Product[]): ProductSection[] {
  const sections = new Map<string, Product[]>();
  for (const product of products) {
    const section = sections.get(product.section);
    if (section) section.push(product);
    else sections.set(product.section, [product]);
  }
  return Array.from(sections, ([title, data]) => ({ title, data }));
}

export const formatEta = (min: number, max: number) => `${min}–${max} min`;

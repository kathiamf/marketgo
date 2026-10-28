import { getSupabaseClient } from '@/lib/supabase';
import type { Product, Store } from '@/types';

export async function listStores(): Promise<Store[]> {
  const { data, error } = await getSupabaseClient()
    .from('stores')
    .select('*')
    .order('name');
  if (error) throw error;
  return data;
}

export async function getStore(id: string): Promise<Store> {
  const { data, error } = await getSupabaseClient()
    .from('stores')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function listProducts(storeId: string): Promise<Product[]> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .order('section')
    .order('name');
  if (error) throw error;
  return data;
}

export async function getProduct(id: string): Promise<Product> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

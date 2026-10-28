import { getSupabaseClient } from '@/lib/supabase';
import type { CreateOrderInput, Order, OrderItem } from '@/types';

export async function createOrder(input: CreateOrderInput): Promise<string> {
  const { data, error } = await getSupabaseClient().rpc('create_order', {
    p_store_id: input.storeId,
    p_items: input.items,
    p_payment: input.payment,
    p_change_for: input.changeFor,
    p_street: input.street,
    p_number: input.number,
    p_neighborhood: input.neighborhood,
    p_complement: input.complement,
  });
  if (error) throw error;
  return data;
}

export async function listOrders(): Promise<Order[]> {
  const { data, error } = await getSupabaseClient()
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getOrder(id: string): Promise<Order> {
  const client = getSupabaseClient();
  const { data: order, error: orderError } = await client
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  if (orderError) throw orderError;

  const { data: items, error: itemsError } = await client
    .from('order_items')
    .select('*')
    .eq('order_id', id);
  if (itemsError) throw itemsError;
  return { ...order, items: items satisfies OrderItem[] };
}

export async function advanceOrder(id: string): Promise<void> {
  const { error } = await getSupabaseClient().rpc('advance_order', { p_order_id: id });
  if (error) throw error;
}

export async function cancelOrder(id: string): Promise<void> {
  const { error } = await getSupabaseClient().rpc('cancel_order', { p_order_id: id });
  if (error) throw error;
}

export async function getLastAddress(): Promise<Pick<
  Order,
  'address_street' | 'address_number' | 'address_neighborhood' | 'address_complement'
> | null> {
  const { data, error } = await getSupabaseClient()
    .from('orders')
    .select('address_street, address_number, address_neighborhood, address_complement')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export type StoreCategory =
  'Mercado' | 'Padaria' | 'Farmácia' | 'Restaurante' | 'Hortifrúti';

export type Store = {
  id: string;
  name: string;
  category: StoreCategory;
  emoji: string;
  description: string;
  rating: number;
  delivery_fee: number;
  eta_min: number;
  eta_max: number;
  min_order: number;
  is_open: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  store_id: string;
  section: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  is_active: boolean;
};

export type PaymentMethod = 'pix' | 'card' | 'cash';
export type OrderStatus =
  'received' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  emoji: string;
  unit_price: number;
  quantity: number;
  total_price: number;
};

export type Order = {
  id: string;
  user_id: string;
  store_id: string;
  store_name: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  change_for: number | null;
  address_street: string;
  address_number: string;
  address_neighborhood: string;
  address_complement: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
};

export type CartItem = {
  productId: string;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
};

export type Cart = {
  storeId: string | null;
  storeName: string;
  deliveryFee: number;
  minOrder: number;
  items: CartItem[];
};

export type CreateOrderInput = {
  storeId: string;
  items: { product_id: string; quantity: number }[];
  payment: PaymentMethod;
  changeFor: number | null;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
};

export interface Database {
  public: {
    Tables: {
      stores: {
        Row: Store;
        Insert: Omit<Store, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['stores']['Insert']>;
        Relationships: [];
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
        Relationships: [];
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'user_id' | 'created_at' | 'updated_at'> & {
          id?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
        Relationships: [];
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_order: {
        Args: {
          p_store_id: string;
          p_items: { product_id: string; quantity: number }[];
          p_payment: string;
          p_change_for: number | null;
          p_street: string;
          p_number: string;
          p_neighborhood: string;
          p_complement: string;
        };
        Returns: string;
      };
      advance_order: { Args: { p_order_id: string }; Returns: string };
      cancel_order: { Args: { p_order_id: string }; Returns: undefined };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

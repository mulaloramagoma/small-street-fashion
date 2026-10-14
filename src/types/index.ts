export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: 'customer' | 'seller' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: string;
  seller_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  location: string;
  phone: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  banner_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  is_demo: boolean;
  source_url: string | null;
  research_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  store_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  sku: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  sizes: string[];
  colours: string[];
  main_image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  is_demo: boolean;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields (optional, present when selected with relations)
  store?: Pick<Store, 'id' | 'name' | 'slug' | 'location'>;
  category?: Pick<Category, 'id' | 'name' | 'slug'>;
  product_images?: { id: string; image_url: string; position: number }[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  position: number;
  created_at: string;
}

// Cart item now uses real product IDs from Supabase
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  storeName: string;
  storeSlug?: string;
  category: string;
  size: string;
  colour: string;
  quantity: number;
  stock: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  suburb: string;
  city: string;
  province: string;
  postal_code: string;
  delivery_instructions: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  store_id: string;
  product_name: string;
  product_image: string | null;
  size: string;
  colour: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  created_at: string;
}

export interface PaymentTransaction {
  id: string;
  order_id: string;
  reference: string;
  provider: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled' | 'abandoned';
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  description: string | null;
  fee: number;
  estimated_days: string | null;
  is_active: boolean;
  sort_order: number;
  type: 'delivery' | 'pickup';
  zone_id: string | null;
  created_at: string;
  updated_at: string;
  delivery_zone?: DeliveryZone | null;
}

export interface DeliveryZone {
  id: string;
  name: string;
  description: string | null;
  base_fee: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type DeliveryStatus =
  | 'awaiting_fulfilment'
  | 'processing'
  | 'packed'
  | 'ready_for_collection'
  | 'dispatched'
  | 'in_transit'
  | 'delivered'
  | 'delivery_failed'
  | 'cancelled';

export interface Delivery {
  id: string;
  order_id: string;
  delivery_method_id: string | null;
  delivery_fee: number;
  status: DeliveryStatus;
  tracking_note: string | null;
  dispatched_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  failed_at: string | null;
  zone_id: string | null;
  created_at: string;
  updated_at: string;
  delivery_method?: Pick<DeliveryMethod, 'id' | 'name' | 'estimated_days' | 'type'>;
  order?: Pick<Order, 'id' | 'order_number' | 'status' | 'total' | 'customer_name' | 'customer_email' | 'customer_phone' | 'delivery_address' | 'suburb' | 'city' | 'province' | 'postal_code' | 'delivery_instructions'>;
}

export interface DeliveryStatusHistory {
  id: string;
  delivery_id: string;
  status: DeliveryStatus;
  note: string | null;
  changed_by: string | null;
  created_at: string;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-low'
  | 'price-high';

export interface ProductFilters {
  category: string | 'all';
  priceMin: number;
  priceMax: number;
  sizes: string[];
  colours: string[];
  storeId: string | null;
  search: string;
}

// --- Stage 8: Courier Integration ---

export interface CourierProvider {
  id: string;
  code: string;
  name: string;
  is_active: boolean;
  is_demo: boolean;
  tracking_url_template: string | null;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export type ShipmentStatus =
  | 'created'
  | 'pending_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'cancelled';

export interface Shipment {
  id: string;
  delivery_id: string;
  order_id: string;
  courier_provider_id: string;
  shipment_reference: string;
  tracking_number: string | null;
  status: ShipmentStatus;
  tracking_url: string | null;
  created_by: string | null;
  cancelled_at: string | null;
  cancelled_by: string | null;
  created_at: string;
  updated_at: string;
  courier_provider?: Pick<CourierProvider, 'id' | 'code' | 'name' | 'is_demo' | 'tracking_url_template'>;
}

export interface ShipmentTrackingEvent {
  id: string;
  shipment_id: string;
  status: string;
  description: string | null;
  location: string | null;
  event_timestamp: string;
  received_at: string;
  source: string;
  raw_payload: Record<string, unknown> | null;
}

// --- Stage 9: Admin Dashboard ---

export interface AdminAuditLog {
  id: string;
  actor_id: string;
  action: string;
  target_type: string;
  target_id: string | null;
  target_name: string | null;
  reason: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  actor_profile?: Pick<Profile, 'id' | 'full_name'> | null;
}

export interface AdminStoreWithSeller extends Store {
  seller_profile?: Pick<Profile, 'id' | 'full_name'> | null;
  product_count?: number;
}

// --- Stage 10: WhatsApp Notifications ---

export type NotificationEventType =
  | 'order_confirmation'
  | 'payment_verified'
  | 'order_processing'
  | 'order_dispatched'
  | 'delivery_in_transit'
  | 'delivery_out_for_delivery'
  | 'delivery_delivered'
  | 'delivery_failed'
  | 'order_cancelled';

export type NotificationStatus = 'pending' | 'sent' | 'simulated' | 'failed' | 'skipped';

export interface NotificationEvent {
  id: string;
  event_type: NotificationEventType;
  order_id: string | null;
  delivery_id: string | null;
  shipment_id: string | null;
  channel: string;
  status: NotificationStatus;
  is_simulated: boolean;
  template_key: string | null;
  sent_at: string | null;
  created_at: string;
}

export const NOTIFICATION_EVENT_LABELS: Record<NotificationEventType, string> = {
  order_confirmation: 'Order Placed',
  payment_verified: 'Payment Confirmed',
  order_processing: 'Order Processing',
  order_dispatched: 'Order Dispatched',
  delivery_in_transit: 'In Transit',
  delivery_out_for_delivery: 'Out for Delivery',
  delivery_delivered: 'Delivered',
  delivery_failed: 'Delivery Failed',
  order_cancelled: 'Order Cancelled',
};

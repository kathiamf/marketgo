import { ORDER_FLOW } from '@/constants/catalog';
import type { OrderStatus } from '@/types';

export type StepState = 'done' | 'current' | 'pending';

export function timeline(
  status: OrderStatus,
): { status: OrderStatus; state: StepState }[] {
  const current = ORDER_FLOW.indexOf(status);
  return ORDER_FLOW.map((step, index) => ({
    status: step,
    state:
      status === 'cancelled'
        ? 'pending'
        : index < current || status === 'delivered'
          ? 'done'
          : index === current
            ? 'current'
            : 'pending',
  }));
}

export function nextStatus(status: OrderStatus): OrderStatus | null {
  const index = ORDER_FLOW.indexOf(status);
  return index >= 0 && index < ORDER_FLOW.length - 1 ? ORDER_FLOW[index + 1] : null;
}

export const isActive = (status: OrderStatus) =>
  status !== 'delivered' && status !== 'cancelled';
export const canCancel = (status: OrderStatus) => status === 'received';

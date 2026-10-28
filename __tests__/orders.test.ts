import { canCancel, isActive, nextStatus, timeline } from '@/utils/orders';

describe('timeline', () => {
  it('marks completed, current, and pending steps', () => {
    expect(timeline('preparing').map((step) => step.state)).toEqual([
      'done',
      'current',
      'pending',
      'pending',
    ]);
  });

  it('marks all steps complete when delivered', () => {
    expect(timeline('delivered').every((step) => step.state === 'done')).toBe(true);
  });

  it('does not advance a cancelled order', () => {
    expect(timeline('cancelled').every((step) => step.state === 'pending')).toBe(true);
  });
});

describe('status', () => {
  it('follows the delivery sequence and stops at delivered', () => {
    expect(nextStatus('received')).toBe('preparing');
    expect(nextStatus('out_for_delivery')).toBe('delivered');
    expect(nextStatus('delivered')).toBeNull();
    expect(nextStatus('cancelled')).toBeNull();
  });

  it('only considers unfinished orders active', () => {
    expect(isActive('preparing')).toBe(true);
    expect(isActive('delivered')).toBe(false);
    expect(isActive('cancelled')).toBe(false);
  });

  it('only allows cancellation of a newly received order', () => {
    expect(canCancel('received')).toBe(true);
    expect(canCancel('preparing')).toBe(false);
  });
});

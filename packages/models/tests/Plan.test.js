import { describe, expect, it } from 'vitest';
import Plan from '../src/app/Plan.js';

describe('Plan', () => {
  it('uses default values when no options are provided', () => {
    const plan = new Plan();

    expect(plan.plan_name).toBeNull();
    expect(plan.code).toBeNull();
    expect(plan.plan_cost).toBe(0);
    expect(plan.plan_description).toBeNull();
    expect(plan.plan_details).toBeNull();
    expect(plan.permissions).toBeNull();
    expect(plan.sort_order).toBe(0);
    expect(plan.is_public).toBe(true);
  });

  it('initializes all fields from provided options', () => {
    const plan = new Plan({
      plan_name: 'Connections',
      code: 'SF_P_CONNECTIONS',
      plan_cost: '29.99',
      plan_description: 'BizCards and Contacts',
      plan_details: { tier: 'pro' },
      permissions: 'User',
      sort_order: '2',
      is_public: 0,
    });

    expect(plan.plan_name).toBe('Connections');
    expect(plan.code).toBe('SF_P_CONNECTIONS');
    expect(plan.plan_cost).toBe(29.99);
    expect(plan.plan_description).toBe('BizCards and Contacts');
    expect(plan.plan_details).toEqual({ tier: 'pro' });
    expect(plan.permissions).toBe('User');
    expect(plan.sort_order).toBe(2);
    expect(plan.is_public).toBe(false);
  });
});

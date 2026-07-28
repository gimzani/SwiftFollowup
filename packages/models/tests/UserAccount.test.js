import { describe, expect, it } from 'vitest';
import UserAccount from '../src/app/UserAccount.js';
import UserProfile from '../src/app/UserProfile.js';

describe('UserAccount', () => {
  it('creates a default account with generated defaults', () => {
    const account = new UserAccount();

    expect(account.id).toBe(0);
    expect(account.code).toBeTruthy();
    expect(account.email_address).toBeNull();
    expect(account.password_hash).toBeNull();
    expect(account.login_on).toBeTruthy();
    expect(account.login_count).toBe(0);
    expect(account.plan_code).toBeNull();
    expect(account.source).toBeNull();
    expect(account.oauth_id).toBeNull();
    expect(account.email_verified_on).toBeTruthy();
    expect(account.created_on).toBeTruthy();
    expect(account.updated_on).toBeTruthy();
    expect(account.is_active).toBe(true);
    expect(account.user_profile).toBeInstanceOf(UserProfile);
  });

  it('initializes account and nested profile data from options', () => {
    const account = new UserAccount({
      id: '7',
      code: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
      email_address: 'user@example.com',
      password_hash: 'hashed-password',
      login_on: '2025-01-01T00:00:00.000Z',
      login_count: '3',
      plan_code: 'SF_P_CONNECTIONS',
      source: 'google',
      oauth_id: 'oauth-123',
      email_verified_on: '2025-01-02T00:00:00.000Z',
      created_on: '2025-01-03T00:00:00.000Z',
      updated_on: '2025-01-04T00:00:00.000Z',
      is_active: 0,
      user_profile: {
        useraccount_id: '7',
        first_name: 'Grace',
        last_name: 'Hopper',
        company: 'Swift Followup',
        is_default: 1,
      },
    });

    expect(account.id).toBe(7);
    expect(account.code).toBe('01ARZ3NDEKTSV4RRFFQ69G5FAV');
    expect(account.email_address).toBe('user@example.com');
    expect(account.password_hash).toBe('hashed-password');
    expect(account.login_on).toBe('2025-01-01T00:00:00.000Z');
    expect(account.login_count).toBe(3);
    expect(account.plan_code).toBe('SF_P_CONNECTIONS');
    expect(account.source).toBe('google');
    expect(account.oauth_id).toBe('oauth-123');
    expect(account.email_verified_on).toBe('2025-01-02T00:00:00.000Z');
    expect(account.created_on).toBe('2025-01-03T00:00:00.000Z');
    expect(account.updated_on).toBe('2025-01-04T00:00:00.000Z');
    expect(account.is_active).toBe(false);
    expect(account.user_profile).toBeInstanceOf(UserProfile);
    expect(account.user_profile.first_name).toBe('Grace');
    expect(account.user_profile.last_name).toBe('Hopper');
    expect(account.user_profile.company).toBe('Swift Followup');
    expect(account.user_profile.is_default).toBe(true);
  });
});

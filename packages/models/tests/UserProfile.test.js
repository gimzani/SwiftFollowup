import { describe, expect, it } from 'vitest';
import UserProfile from '../src/app/UserProfile.js';

describe('UserProfile', () => {
  it('uses default values for an empty profile', () => {
    const profile = new UserProfile();

    expect(profile.useraccount_id).toBe(0);
    expect(profile.first_name).toBeNull();
    expect(profile.last_name).toBeNull();
    expect(profile.middle_name).toBeNull();
    expect(profile.title).toBeNull();
    expect(profile.suffix).toBeNull();
    expect(profile.company).toBeNull();
    expect(profile.job_title).toBeNull();
    expect(profile.web_address).toBeNull();
    expect(profile.mobile_number).toBeNull();
    expect(profile.avatar_url).toBeNull();
    expect(profile.preferences).toBeNull();
    expect(profile.is_default).toBeNull();
  });

  it('initializes all profile fields from provided options', () => {
    const profile = new UserProfile({
      useraccount_id: '42',
      first_name: 'Ada',
      last_name: 'Lovelace',
      middle_name: 'Byron',
      title: 'Dr.',
      suffix: 'PhD',
      company: 'Swift Followup',
      job_title: 'Founder',
      web_address: 'https://example.com',
      mobile_number: '5551234',
      avatar_url: 'https://cdn.example.com/avatar.png',
      preferences: { theme: 'dark' },
      is_default: true,
    });

    expect(profile.useraccount_id).toBe(42);
    expect(profile.first_name).toBe('Ada');
    expect(profile.last_name).toBe('Lovelace');
    expect(profile.middle_name).toBe('Byron');
    expect(profile.title).toBe('Dr.');
    expect(profile.suffix).toBe('PhD');
    expect(profile.company).toBe('Swift Followup');
    expect(profile.job_title).toBe('Founder');
    expect(profile.web_address).toBe('https://example.com');
    expect(profile.mobile_number).toBe('5551234');
    expect(profile.avatar_url).toBe('https://cdn.example.com/avatar.png');
    expect(profile.preferences).toEqual({ theme: 'dark' });
    expect(profile.is_default).toBe(true);
  });
});

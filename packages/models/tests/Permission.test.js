import { describe, expect, it } from 'vitest';
import Permission from '../src/app/Permission.js';

describe('Permission', () => {
  it('defaults to null values when no options are provided', () => {
    const permission = new Permission();

    expect(permission.permission_name).toBeNull();
    expect(permission.permission_label).toBeNull();
  });

  it('initializes values from provided options', () => {
    const permission = new Permission({
      permission_name: 'AppAdmin',
      permission_label: 'App Administrator',
    });

    expect(permission.permission_name).toBe('AppAdmin');
    expect(permission.permission_label).toBe('App Administrator');
  });
});

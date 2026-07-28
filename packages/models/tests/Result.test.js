import { describe, expect, it } from 'vitest';
import Result from '../src/app/Result.js';

describe('Result', () => {
  it('creates a default failed result', () => {
    const result = new Result();

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.message).toBeNull();
  });

  it('sets success details through helper methods', () => {
    const result = new Result();

    result.setSuccess('Saved', { id: 1 });

    expect(result.success).toBe(true);
    expect(result.message).toBe('Saved');
    expect(result.data).toEqual({ id: 1 });
  });

  it('sets failure details through helper methods', () => {
    const result = new Result({ success: true, data: { id: 2 }, message: 'Existing' });

    result.setFailure('Failed', { id: 3 });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Failed');
    expect(result.data).toEqual({ id: 3 });
  });
});

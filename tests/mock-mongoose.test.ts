import { describe, expect, it } from 'vitest';
import { DeliveryTest, UserTest } from './setup';

describe('mock-mongoose', () => {
  it('should test the mongoose mock with the User model', async () => {
    await UserTest.create({ name: 'test', age: 18 });
    await UserTest.create({ name: 'test3', age: 44 });

    const users = await UserTest.find();

    expect(users.length).toBe(2);
  });

  it('should test the mongoose mock with the Delivery model', async () => {
    await DeliveryTest.create({ name: 'test', address: 'rua test' });
    await DeliveryTest.create({ name: 'test3', address: 'rua test' });

    const deliverys = await DeliveryTest.find();

    expect(deliverys.length).toBe(2);
  });
});

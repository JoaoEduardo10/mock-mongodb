import mongoose, { Schema, model } from 'mongoose';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { MockMongoose } from '../src';

export const UserTest = model(
  'Usertest',
  new Schema({
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
  }),
);

export const DeliveryTest = model(
  'DeliveryTest',
  new Schema({
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
  }),
);

const mockMongooose = new MockMongoose({
  mongoose,
  models: [UserTest, DeliveryTest],
});

beforeAll(async () => {
  await mockMongooose.connect();
});

afterEach(async () => {
  await mockMongooose.DropModels();
});

afterAll(async () => {
  await mockMongooose.disconnect();
});

/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, Mongoose } from 'mongoose';

export interface MockMongooseProps<T> {
  mongoose: Mongoose;
  models: Model<T>[];
}

class MockMongoose<T extends any> {
  private mongoServer: ReturnType<typeof MongoMemoryServer.create>;
  private mongoose: Mongoose;
  private models: Model<T>[];

  constructor({ mongoose, models }: MockMongooseProps<T>) {
    this.mongoServer = MongoMemoryServer.create();
    this.mongoose = mongoose;
    this.models = models;
  }

  async connect() {
    const uri = (await this.mongoServer).getUri();
    await this.mongoose.connect(uri);
  }

  async disconnect() {
    await this.mongoose.connection.dropDatabase();
    await this.mongoose.disconnect();
    (await this.mongoServer).stop();
  }

  async DropModels() {
    for await (const model of this.models) {
      await model.deleteMany();
    }
  }
}

export { MockMongoose };

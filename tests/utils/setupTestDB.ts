import mongoose from 'mongoose';
import config from '../../src/config/config';

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;

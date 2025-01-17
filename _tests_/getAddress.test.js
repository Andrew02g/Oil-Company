const { getAddressController } = require('../controllers/getAddress');
const dbManager = require('../controllers/databaseManager');
// const { MongoClient } = require('mongodb');

// Mocking the MongoDB client
// jest.mock('mongodb');
jest.mock('../controllers/databaseManager');

describe('getAddressController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { username: 'testUser' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    dbManager.getClient.mockReturnValue({
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn()
    });
  });

  it('should return user address if user is found', async () => {
    const existingUser = {
      username: 'testUser',
      address: {
        address1: '123 Street',
        address2: '',
        city: 'City',
        state: 'State',
        zipcode: '12345'
      }
    };

    dbManager.getClient().findOne.mockResolvedValue(existingUser);

    await getAddressController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ address: existingUser.address });
  });

  it('should return 404 if user is not found', async () => {
    dbManager.getClient().findOne.mockResolvedValue(null);

    await getAddressController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should return 500 if there is an error', async () => {
    dbManager.getClient().findOne.mockRejectedValue(new Error('DB Error'));

    await getAddressController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
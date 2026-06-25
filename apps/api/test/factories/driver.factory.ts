import request from 'supertest';

export const buildDriverSignupRequest = ({ httpServer, fakeImage, overrides = {} }) => {
  const dto = {
    username: 'John Coltrane',
    email: 'john@gmail.com',
    password: 'Coltrane!1965',
    RUT: '17.353.123-6',
    vehicleType: 'car',
    plateNumber: '159245',
    address: '1000 Main St, Springfield, ST 12345',
    phoneNumber: '925315345',
    ...overrides,
  };


  return request(httpServer)
    .post('/auth/sign-up-driver')
    .field('username', dto.username)
    .field('email', dto.email)
    .field('password', dto.password)
    .field('RUT', dto.RUT)
    .field('vehicleType', dto.vehicleType)
    .field('plateNumber', dto.plateNumber)
    .attach('identityDocument', fakeImage, { filename: 'id.jpg', contentType: 'image/jpeg' })
    .attach('drivingLicense', fakeImage, { filename: 'license.jpg', contentType: 'image/jpeg' })
    .field('address', dto.address)
    .field('phoneNumber', dto.phoneNumber);
};

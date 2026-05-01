import request from 'supertest';

export const buildDriverSignupRequest = ({ httpServer, fakeImage, overrides = {} }) => {
  const dto = {
    username: 'driver',
    email: 'driver@driver.com',
    password: '1',
    RUT: '11.111.111-1',
    vehicleType: 'car',
    plateNumber: '123456',
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
    .attach('drivingLicense', fakeImage, { filename: 'license.jpg', contentType: 'image/jpeg' });
};
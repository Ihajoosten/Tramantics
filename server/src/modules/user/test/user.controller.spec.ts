import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { User, UserRole } from '../user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const user = {
    uuid: 'asdf13-asdfa-232fghh32',
    username: 'J_DOE',
    email: 'testing@gmail.com',
    password: 'Test1234!',
    fullName: 'John Doe',
    address: 'testing lane 12',
    zipCode: '13234',
    phone: '112',
    birthday: new Date(),
    role: UserRole.ADMIN,
    lastLoginDate: new Date(),
    isActive: true,
  };

  const updatedUser = {
    uuid: 'asdf13-asdfa-232fghh32',
    username: 'John_DOE',
    email: 'asdfasdfasdf@gmail.com',
    password: 'Test1234!',
    fullName: 'John Doe',
    address: 'testing lane 12',
    zipCode: '13234',
    phone: '112',
    birthday: new Date(),
    role: UserRole.ADMIN,
    lastLoginDate: new Date(),
    isActive: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],

      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: Array<User> = [];

      // Mock the 'findAll' method of the service to return a resolved promise
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      expect(await userController.findAll()).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const userId = 'asdf13-asdfa-232fghh32';

      // Mock the 'findOne' method of the service to return a resolved promise
      jest.spyOn(userService, 'findOne').mockResolvedValue(user as User);

      expect(await userController.findOne(userId)).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'asdf13-asdfa-232fghh32';
      const updateUserDTO: UpdateUserDTO = {
        username: 'John_DOE',
        email: 'asdfasdfasdf@gmail.com',
      };

      // Mock the 'update' method of the service to return a resolved promise
      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser as User);

      expect(await userController.update(userId, updateUserDTO)).toBe(
        updatedUser,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 'asdf13-asdfa-232fghh32';

      // Mock the 'remove' method of the service to return a resolved promise
      jest.spyOn(userService, 'remove').mockResolvedValue(undefined);

      // 'toBeUndefined' can be used to check if the method returns 'undefined'
      expect(await userController.remove(userId)).toBeUndefined();
    });
  });
});

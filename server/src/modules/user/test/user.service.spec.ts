import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../user.service';
import { USER_REPOSITORY } from '../../../core/constants';
import { User, UserRole } from '../user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { RegisterUserDTO } from 'src/core/auth/dto/register-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepoMock: any;

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

  const createUser = {
    uuid: 'asdf13-asdfa-232fghh32',
    username: 'J_DOE',
    email: 'testing@gmail.com',
    password: 'Test1234!',
    fullName: 'John Doe',
    address: 'testing lane 12',
    zipCode: '13234',
    phone: '112',
    birthday: new Date(),
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
    userRepoMock = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: userRepoMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: Array<User> = [user as User, updatedUser as User];

      userRepoMock.findAll.mockResolvedValue(users);

      expect(await userService.findAll()).toBe(users);
      expect(userRepoMock.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const userId = 'asdf13-asdfa-232fghh32';

      userRepoMock.findByPk.mockResolvedValue(user);

      expect(await userService.findOne(userId)).toBe(user);
      expect(userRepoMock.findByPk).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 'nonExistentUserId';

      userRepoMock.findByPk.mockResolvedValue(null);

      await expect(userService.findOne(userId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(userRepoMock.findByPk).toHaveBeenCalledWith(userId);
    });
  });

  describe('findByEmail', () => {
    it('should return a single user by email', async () => {
      const userEmail = 'testing@gmail.com';

      userRepoMock.findOne.mockResolvedValue(user);

      expect(await userService.findByEmail(userEmail)).toBe(user);
      expect(userRepoMock.findOne).toHaveBeenCalledWith({
        where: { email: userEmail },
      });
    });

    it('should throw NotFoundException if user is not found by email', async () => {
      const userEmail = 'nonExistentUser@example.com';

      userRepoMock.findOne.mockResolvedValue(null);

      await expect(userService.findByEmail(userEmail)).rejects.toThrowError(
        NotFoundException,
      );
      expect(userRepoMock.findOne).toHaveBeenCalledWith({
        where: { email: userEmail },
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userDTO: RegisterUserDTO = createUser;
      const createdUser: User = await userService.create(userDTO);

      userRepoMock.create.mockResolvedValue(createdUser);

      expect(await userService.create(userDTO)).toBe(createdUser);
      expect(userRepoMock.create).toHaveBeenCalledWith(userDTO);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'asdf13-asdfa-232fghh32';
      const updateUserDTO: UpdateUserDTO = {
        username: 'John_DOE',
        email: 'asdfasdfasdf@gmail.com',
      };

      userRepoMock.findByPk.mockResolvedValue(user);
      userRepoMock.update.mockResolvedValue([1]);

      expect(await userService.update(userId, updateUserDTO)).toBe(user);
      expect(userRepoMock.findByPk).toHaveBeenCalledWith(userId);
      expect(userRepoMock.update).toHaveBeenCalledWith(updateUserDTO, {
        where: { id: userId },
      });
    });

    it('should throw NotFoundException if user is not found during update', async () => {
      const userId = 'nonExistentUserId';
      const updateUserDTO: UpdateUserDTO = {
        username: 'John_DOE',
        email: 'asdfasdfasdf@gmail.com',
      };

      userRepoMock.findByPk.mockResolvedValue(null);

      await expect(
        userService.update(userId, updateUserDTO),
      ).rejects.toThrowError(NotFoundException);
      expect(userRepoMock.findByPk).toHaveBeenCalledWith(userId);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 'asdf13-asdfa-232fghh32';

      userRepoMock.findByPk.mockResolvedValue(user);
      userRepoMock.destroy.mockResolvedValue(1);

      await userService.remove(userId);

      expect(userRepoMock.findByPk).toHaveBeenCalledWith(userId);
      expect(userRepoMock.destroy).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it('should throw NotFoundException if user is not found during removal', async () => {
      const userId = 'nonExistentUserId';

      userRepoMock.findByPk.mockResolvedValue(null);

      await expect(userService.remove(userId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(userRepoMock.findByPk).toHaveBeenCalledWith(userId);
    });
  });
});

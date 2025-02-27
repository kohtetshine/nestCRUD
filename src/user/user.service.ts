import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.create({
        data,
      });
      if (!user) {
        return { success: false, message: 'Failed to create user' };
      }
      return {
        success: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return { success: false, message: 'Email address is already in use' };
      }

      return {
        success: false,
        message: 'Failed to create user. Please try again later.',
      };
    }
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return { success: true, data: users };
  }

  async getOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { success: false, message: `User with ID ${id} not found` };
    }

    return user;
  }

  async updateUser(id: number, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        return { success: false, message: `User with ID ${id} not found` };
      }

      if (data.email) {
        const existingUser = await this.prisma.user.findFirst({
          where: { email: data.email, id: { not: id } },
        });

        if (existingUser) {
          return { success: false, message: 'Email address is already in use' };
        }
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });

      return {
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return { success: false, message: 'Email address is already in use' };
      }

      return {
        success: false,
        message: 'Failed to update user. Please try again later.',
      };
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });

      if (!user) {
        return { success: false, message: `User with ID ${id} not found` };
      }

      return {
        success: true,
        message: `User deleted successfully`,
        data: user,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting user');
    }
  }
}

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

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 is the error code for unique constraint violation
        if (error.code === 'P2002') {
          const target = error.meta?.target as string[] | undefined;
          if (target && target.includes('email')) {
            throw new ConflictException('Email address is already in use');
          }
        }
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getOneUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    try {
      console.log(`Updating user with ID: ${id}`);

      // Fetch the existing user
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        return { success: false, message: `User with ID ${id} not found` };
      }

      // Handle email update validation
      if (data.email) {
        const existingUser = await this.prisma.user.findFirst({
          where: { email: data.email, id: { not: id } },
        });

        if (existingUser) {
          return { success: false, message: 'Email address is already in use' };
        }
      }

      // Perform user update
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });

      console.log('User successfully updated:', updatedUser);
      return {
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.error('Error updating user:', error);

      // Handle Prisma constraint error (duplicate email)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return { success: false, message: 'Email address is already in use' };
      }

      // Return a general failure message instead of a 500 error
      return {
        success: false,
        message: 'Failed to update user. Please try again later.',
      };
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting user');
    }
  }
}

import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'UpdateEmailValidator', async: true })
@Injectable()
export class UpdateEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string, args: ValidationArguments) {
    console.log(`email`, typeof email);
    if (!email) return true;

    // Safely extract user ID from DTO
    const userId = args.object && (args.object as any).id;
    console.log(`userId`, userId);
    if (!userId) return true; // Skip validation if no ID is provided

    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { email, id: { not: userId } }, // Exclude current user
      });

      console.log(`existingUser`, existingUser);
      return !existingUser; // Return true if no other user has this email
    } catch (error) {
      console.error('Error in UpdateEmailValidator:', error);
      return false;
    }
  }

  defaultMessage() {
    return 'Email address is already in use by another user';
  }
}

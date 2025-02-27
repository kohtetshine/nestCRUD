import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Validate } from 'class-validator';
import { UpdateEmailValidator } from '../validators/update-email-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Hidden property to store the user ID for validation
  id?: number;

  // Override email property to use UpdateEmailValidator instead of UniqueEmailValidator
  // @Validate(UpdateEmailValidator, {
  //   message: 'Email address is already in use by another user',
  // })
  email?: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { AgeValidator } from '../validators/age.validator';
// import { UniqueEmailValidator } from '../validators/unique-email.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  // @Validate(UniqueEmailValidator, {
  //   message: 'Email address is already in use',
  // })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsNumber({}, { message: 'Age must be a number' })
  @Validate(AgeValidator, { message: AgeValidator.prototype.defaultMessage })
  age: number;
}

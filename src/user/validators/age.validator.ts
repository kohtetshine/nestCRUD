import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'age', async: false })
@Injectable()
export class AgeValidator implements ValidatorConstraintInterface {
  validate(age: number): boolean {
    return age >= 18;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.value} is too young. Age must be at least 18`;
  }
}

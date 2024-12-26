import { z } from 'zod';
import { ValidationMessages } from './validation-message';

export const UserNameSchema = z
  .string()
  .min(2, { message: ValidationMessages.nameLength })
  .max(30, { message: ValidationMessages.nameMaxLength });

export const UserLastNameSchema = z
  .string()
  .min(2, { message: ValidationMessages.lastNameLength })
  .max(30, { message: ValidationMessages.lastNameMaxLength });

export const UserEmailSchema = z
  .string()
  .email({ message: ValidationMessages.emailInvalid });

  export const PhoneNumberSchema = z
  .string()
  .min(5, { message: ValidationMessages.phoneMinLength })
  .max(15, { message: ValidationMessages.phoneMaxLength })
  .regex(/^\+?\d{1,15}$/, { message: 'Invalid phone number format' });

export const UserPasswordSchema = z
  .string()
  .min(6, ValidationMessages.passwordMinLength)
  .min(1, ValidationMessages.passwordRequired);

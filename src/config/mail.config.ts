import { registerAs } from '@nestjs/config';
import {
  IsEmail,
  IsOptional,
  IsString
} from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { MailConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  MAIL_USER: string;

  @IsString()
  @IsOptional()
  MAIL_SERVICE: string;

  @IsString()
  @IsOptional()
  MAIL_PASSWORD: string;

  @IsEmail()
  MAIL_DEFAULT_EMAIL: string;

  @IsString()
  MAIL_DEFAULT_NAME: string;
}

export default registerAs<MailConfig>('mail', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    service: process.env.MAIL_SERVICE,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
    defaultName: process.env.MAIL_DEFAULT_NAME,
  };
});

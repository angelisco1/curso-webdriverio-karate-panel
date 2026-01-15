import { IsString, IsEmail, IsNotEmpty, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateSubscriberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsOptional()
  interests?: string[];

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsString()
  @IsOptional()
  cardNumber?: string;
}

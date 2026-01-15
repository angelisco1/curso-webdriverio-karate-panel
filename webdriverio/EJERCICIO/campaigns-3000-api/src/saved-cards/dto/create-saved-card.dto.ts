import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator'

export class CreateSavedCardDto {
  @IsNotEmpty()
  @IsString()
  card_number: string

  @IsNotEmpty()
  @IsString()
  expiry: string

  @IsNotEmpty()
  @IsString()
  cvv: string

  @IsOptional()
  @IsBoolean()
  is_default?: boolean
}

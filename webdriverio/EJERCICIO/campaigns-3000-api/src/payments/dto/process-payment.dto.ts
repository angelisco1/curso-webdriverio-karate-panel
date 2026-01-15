import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ProcessPaymentDto {
  @IsNumber()
  @Min(1)
  subscriber_id: number;

  @IsString()
  @IsNotEmpty()
  card_number: string;

  @IsNumber()
  @Min(0.01)
  amount: number;
}

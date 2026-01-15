import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, IsIn, IsNumber } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  categories?: string[];

  @IsBoolean()
  @IsOptional()
  track_clicks?: boolean;

  @IsNumber()
  @IsOptional()
  scheduled_date?: number;

  @IsOptional()
  @IsIn(['enviada', 'programada', 'borrador', 'cancelada'])
  status?: 'enviada' | 'programada' | 'borrador' | 'cancelada';
}

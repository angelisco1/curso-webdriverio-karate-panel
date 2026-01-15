import { IsString, IsOptional, IsIn, IsArray } from 'class-validator';

export class FilterSubscriberDto {
  @IsOptional()
  @IsIn(['suscrito', 'pendiente', 'baja'])
  status?: 'suscrito' | 'pendiente' | 'baja';

  @IsOptional()
  @IsIn(['ADMIN', 'USER'])
  role?: 'ADMIN' | 'USER';

  @IsOptional()
  @IsArray()
  interests?: string[];
}

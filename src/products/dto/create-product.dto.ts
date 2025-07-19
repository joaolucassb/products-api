import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  sku: string;
}

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Smartphone XYZ',
  })
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  @ApiProperty({
    description: 'Categoria do produto',
    example: 'Eletrônicos',
  })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsString({ message: 'A categoria deve ser uma string' })
  categoria: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do produto',
    example: 'Smartphone de última geração com câmera de alta resolução',
  })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @ApiProperty({
    description: 'Preço do produto em reais',
    example: 1999.99,
  })
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0, { message: 'O preço deve ser um valor positivo' })
  preco: number;

  @ApiProperty({
    description: 'Quantidade disponível em estoque',
    example: 10,
  })
  @IsNotEmpty({ message: 'A quantidade em estoque é obrigatória' })
  @IsNumber({}, { message: 'A quantidade em estoque deve ser um número' })
  @Min(0, { message: 'A quantidade em estoque deve ser um valor positivo' })
  quantidade_estoque: number;
}

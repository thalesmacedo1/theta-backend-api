import { IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProdutoDto {
  @ApiPropertyOptional({
    description: 'Nome do produto',
    example: 'Smartphone XYZ Pro',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  nome?: string;

  @ApiPropertyOptional({
    description: 'Categoria do produto',
    example: 'Eletrônicos Premium',
  })
  @IsOptional()
  @IsString({ message: 'A categoria deve ser uma string' })
  categoria?: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do produto',
    example:
      'Smartphone de última geração com câmera de alta resolução e processador de última geração',
  })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @ApiPropertyOptional({
    description: 'Preço do produto em reais',
    example: 2499.99,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0, { message: 'O preço deve ser um valor positivo' })
  preco?: number;

  @ApiPropertyOptional({
    description: 'Quantidade disponível em estoque',
    example: 15,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A quantidade em estoque deve ser um número' })
  @Min(0, { message: 'A quantidade em estoque deve ser um valor positivo' })
  quantidade_estoque?: number;
}

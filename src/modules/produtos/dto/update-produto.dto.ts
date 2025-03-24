import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class UpdateProdutoDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  nome?: string;

  @IsOptional()
  @IsString({ message: 'A categoria deve ser uma string' })
  categoria?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @IsOptional()
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0, { message: 'O preço deve ser um valor positivo' })
  preco?: number;

  @IsOptional()
  @IsNumber({}, { message: 'A quantidade em estoque deve ser um número' })
  @Min(0, { message: 'A quantidade em estoque deve ser um valor positivo' })
  quantidade_estoque?: number;
} 
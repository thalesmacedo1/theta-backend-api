import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsString({ message: 'A categoria deve ser uma string' })
  categoria: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0, { message: 'O preço deve ser um valor positivo' })
  preco: number;

  @IsNotEmpty({ message: 'A quantidade em estoque é obrigatória' })
  @IsNumber({}, { message: 'A quantidade em estoque deve ser um número' })
  @Min(0, { message: 'A quantidade em estoque deve ser um valor positivo' })
  quantidade_estoque: number;
} 
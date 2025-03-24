import { IsNotEmpty, IsArray, ValidateNested, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusPedido } from '../entities/pedido.entity';

export class ItemPedidoDto {
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  produtoId: string;

  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantidade: number;
}

export class CreatePedidoDto {
  @IsArray({ message: 'Produtos deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  @IsNotEmpty({ message: 'O pedido deve conter pelo menos um produto' })
  items: ItemPedidoDto[];

  @IsOptional()
  @IsEnum(StatusPedido, { message: 'Status inválido' })
  status?: StatusPedido;
} 
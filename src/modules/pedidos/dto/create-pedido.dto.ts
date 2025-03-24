import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusPedido } from '../entities/pedido.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemPedidoDto {
  @ApiProperty({
    description: 'ID do produto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  produtoId: string;

  @ApiProperty({
    description: 'Quantidade do produto no pedido',
    example: 2,
  })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantidade: number;
}

export class CreatePedidoDto {
  @ApiProperty({
    description: 'Lista de itens do pedido',
    type: [ItemPedidoDto],
    example: [
      {
        produtoId: '123e4567-e89b-12d3-a456-426614174000',
        quantidade: 2,
      },
      {
        produtoId: '987fcdeb-a123-45d6-7890-123456789012',
        quantidade: 1,
      },
    ],
  })
  @IsArray({ message: 'Produtos deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  @IsNotEmpty({ message: 'O pedido deve conter pelo menos um produto' })
  items: ItemPedidoDto[];

  @ApiPropertyOptional({
    description: 'Status inicial do pedido',
    enum: StatusPedido,
    example: StatusPedido.PENDENTE,
  })
  @IsOptional()
  @IsEnum(StatusPedido, { message: 'Status inválido' })
  status?: StatusPedido;
}

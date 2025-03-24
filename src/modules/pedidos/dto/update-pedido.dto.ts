import { IsEnum, IsOptional } from 'class-validator';
import { StatusPedido } from '../entities/pedido.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePedidoDto {
  @ApiPropertyOptional({
    description: 'Novo status do pedido',
    enum: StatusPedido,
    example: StatusPedido.CONCLUIDO,
  })
  @IsOptional()
  @IsEnum(StatusPedido, { message: 'Status inválido' })
  status?: StatusPedido;
} 
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { Pedido, StatusPedido } from '../entities/pedido.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso',
    type: Pedido,
  })
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos retornada com sucesso',
    type: [Pedido],
  })
  async findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pedido por ID' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  @ApiResponse({
    status: 200,
    description: 'Pedido encontrado com sucesso',
    type: Pedido,
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido não encontrado',
  })
  async findOne(@Param('id') id: string): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar o status de um pedido' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  @ApiResponse({
    status: 200,
    description: 'Status do pedido atualizado com sucesso',
    type: Pedido,
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido não encontrado',
  })
  async atualizarStatus(
    @Param('id') id: string,
    @Body('status') status: StatusPedido,
  ): Promise<Pedido> {
    return this.pedidoService.atualizarStatus(id, status);
  }
}

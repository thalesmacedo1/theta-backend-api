import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, StatusPedido } from '../entities/pedido.entity';
import { PedidoProduto } from '../entities/pedido-produto.entity';

@Injectable()
export class PedidoRepository {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return pedido;
  }

  async create(pedido: Pedido): Promise<Pedido> {
    return this.pedidoRepository.save(pedido);
  }

  async atualizarStatus(id: string, status: StatusPedido): Promise<Pedido> {
    const pedido = await this.findOne(id);
    pedido.status = status;
    return this.pedidoRepository.save(pedido);
  }
}

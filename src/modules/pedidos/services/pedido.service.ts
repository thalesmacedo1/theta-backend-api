import { Injectable, BadRequestException } from '@nestjs/common';
import { Pedido, StatusPedido } from '../entities/pedido.entity';
import { PedidoRepository } from '../repositories/pedido.repository';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { ProdutoService } from '../../produtos/services/produto.service';
import { PedidoProduto } from '../entities/pedido-produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly produtoService: ProdutoService,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.findAll();
  }

  async findOne(id: string): Promise<Pedido> {
    return this.pedidoRepository.findOne(id);
  }

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    // Verificar estoque de todos os produtos
    for (const item of createPedidoDto.items) {
      const estoqueDisponivel = await this.produtoService.verificarEstoque(
        item.produtoId,
        item.quantidade,
      );

      if (!estoqueDisponivel) {
        const produto = await this.produtoService.findOne(item.produtoId);
        throw new BadRequestException(
          `Estoque insuficiente para o produto ${produto.nome}. Disponível: ${produto.quantidade_estoque}`,
        );
      }
    }

    // Criar o pedido
    const pedido = new Pedido();
    pedido.status = createPedidoDto.status || StatusPedido.PENDENTE;
    pedido.total_pedido = 0;
    pedido.pedidoProdutos = [];

    // Adicionar os produtos ao pedido
    for (const item of createPedidoDto.items) {
      const produto = await this.produtoService.findOne(item.produtoId);
      
      const pedidoProduto = new PedidoProduto();
      pedidoProduto.produto = produto;
      pedidoProduto.quantidade = item.quantidade;
      pedidoProduto.preco_unitario = produto.preco;
      pedidoProduto.subtotal = produto.preco * item.quantidade;
      
      pedido.pedidoProdutos.push(pedidoProduto);
      pedido.total_pedido += pedidoProduto.subtotal;
    }

    // Salvar o pedido
    const pedidoCriado = await this.pedidoRepository.create(pedido);

    // Se o pedido for marcado como concluído, decrementar estoque
    if (pedidoCriado.status === StatusPedido.CONCLUIDO) {
      await this.atualizarEstoque(pedidoCriado);
    }

    return pedidoCriado;
  }

  async atualizarStatus(id: string, status: StatusPedido): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne(id);
    
    // Se o pedido estiver sendo atualizado para CONCLUIDO, decrementar estoque
    if (status === StatusPedido.CONCLUIDO && pedido.status !== StatusPedido.CONCLUIDO) {
      await this.atualizarEstoque(pedido);
    }
    
    return this.pedidoRepository.atualizarStatus(id, status);
  }

  private async atualizarEstoque(pedido: Pedido): Promise<void> {
    for (const item of pedido.pedidoProdutos) {
      await this.produtoService.decrementarEstoque(
        item.produto.id,
        item.quantidade,
      );
    }
  }
} 
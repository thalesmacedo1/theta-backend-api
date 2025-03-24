import { Injectable } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoRepository } from '../repositories/produto.repository';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.findAll();
  }

  async findOne(id: string): Promise<Produto> {
    return this.produtoRepository.findOne(id);
  }

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoRepository.create(createProdutoDto);
  }

  async update(
    id: string,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return this.produtoRepository.update(id, updateProdutoDto);
  }

  async remove(id: string): Promise<void> {
    await this.produtoRepository.remove(id);
  }

  async verificarEstoque(id: string, quantidade: number): Promise<boolean> {
    const produto = await this.findOne(id);
    return produto.quantidade_estoque >= quantidade;
  }

  async decrementarEstoque(id: string, quantidade: number): Promise<Produto> {
    return this.produtoRepository.decrementarEstoque(id, quantidade);
  }
}

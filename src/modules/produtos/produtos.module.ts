import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';
import { ProdutoRepository } from './repositories/produto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository],
  exports: [ProdutoService],
})
export class ProdutosModule {}

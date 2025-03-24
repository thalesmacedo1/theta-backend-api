import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoController } from './controllers/pedido.controller';
import { PedidoService } from './services/pedido.service';
import { PedidoRepository } from './repositories/pedido.repository';
import { ProdutosModule } from '../produtos/produtos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido]), ProdutosModule],
  controllers: [PedidoController],
  providers: [PedidoService, PedidoRepository],
})
export class PedidosModule {}

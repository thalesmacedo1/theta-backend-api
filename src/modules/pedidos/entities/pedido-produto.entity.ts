import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity('pedidos_produtos')
export class PedidoProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.pedidoProdutos)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  subtotal: number;
}

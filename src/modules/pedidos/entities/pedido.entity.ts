import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { PedidoProduto } from './pedido-produto.entity';

export enum StatusPedido {
  PENDENTE = 'Pendente',
  CONCLUIDO = 'Concluído',
  CANCELADO = 'Cancelado',
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PedidoProduto, (pedidoProduto) => pedidoProduto.pedido, {
    cascade: true,
    eager: true,
  })
  pedidoProdutos: PedidoProduto[];

  @Column({
    type: 'enum',
    enum: StatusPedido,
    default: StatusPedido.PENDENTE,
  })
  status: StatusPedido;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  total_pedido: number;

  @CreateDateColumn()
  data_criacao: Date;
}

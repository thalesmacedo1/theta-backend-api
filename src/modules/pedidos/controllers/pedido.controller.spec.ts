import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';
import { PedidoService } from '../services/pedido.service';
import { CreatePedidoDto, ItemPedidoDto } from '../dto/create-pedido.dto';
import { StatusPedido } from '../entities/pedido.entity';

describe('PedidoController', () => {
  let controller: PedidoController;
  let service: PedidoService;

  // Mock do PedidoService
  const mockPedidoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    atualizarStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoController],
      providers: [
        {
          provide: PedidoService,
          useValue: mockPedidoService,
        },
      ],
    }).compile();

    controller = module.get<PedidoController>(PedidoController);
    service = module.get<PedidoService>(PedidoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', async () => {
      // Arrange
      const itemPedido: ItemPedidoDto = {
        produtoId: 'produto-id',
        quantidade: 2,
      };

      const createPedidoDto: CreatePedidoDto = {
        items: [itemPedido],
        status: StatusPedido.PENDENTE,
      };

      const pedidoCriado = {
        id: 'pedido-id',
        status: StatusPedido.PENDENTE,
        pedidoProdutos: [
          {
            id: 'pedido-produto-id',
            produto: {
              id: 'produto-id',
              nome: 'Produto Teste',
              categoria: 'Categoria Teste',
              descricao: 'Descrição Teste',
              preco: 100,
              quantidade_estoque: 10,
            },
            quantidade: 2,
            preco_unitario: 100,
            subtotal: 200,
          },
        ],
        total_pedido: 200,
        data_criacao: new Date(),
      };

      mockPedidoService.create.mockResolvedValue(pedidoCriado);

      // Act
      const result = await controller.create(createPedidoDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(createPedidoDto);
      expect(result).toEqual(pedidoCriado);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      // Arrange
      const pedidos = [
        {
          id: 'pedido-id-1',
          status: StatusPedido.PENDENTE,
          pedidoProdutos: [],
          total_pedido: 0,
          data_criacao: new Date(),
        },
        {
          id: 'pedido-id-2',
          status: StatusPedido.CONCLUIDO,
          pedidoProdutos: [],
          total_pedido: 0,
          data_criacao: new Date(),
        },
      ];

      mockPedidoService.findAll.mockResolvedValue(pedidos);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(pedidos);
    });
  });

  describe('findOne', () => {
    it('should return an order by id', async () => {
      // Arrange
      const id = 'pedido-id';
      const pedido = {
        id,
        status: StatusPedido.PENDENTE,
        pedidoProdutos: [],
        total_pedido: 0,
        data_criacao: new Date(),
      };

      mockPedidoService.findOne.mockResolvedValue(pedido);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(pedido);
    });
  });

  describe('atualizarStatus', () => {
    it('should update the order status', async () => {
      // Arrange
      const id = 'pedido-id';
      const status = StatusPedido.CONCLUIDO;
      const pedidoAtualizado = {
        id,
        status: StatusPedido.CONCLUIDO,
        pedidoProdutos: [],
        total_pedido: 0,
        data_criacao: new Date(),
      };

      mockPedidoService.atualizarStatus.mockResolvedValue(pedidoAtualizado);

      // Act
      const result = await controller.atualizarStatus(id, status);

      // Assert
      expect(service.atualizarStatus).toHaveBeenCalledWith(id, status);
      expect(result).toEqual(pedidoAtualizado);
    });
  });
}); 
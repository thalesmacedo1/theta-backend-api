import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { PedidoRepository } from '../repositories/pedido.repository';
import { ProdutoService } from '../../produtos/services/produto.service';
import { CreatePedidoDto, ItemPedidoDto } from '../dto/create-pedido.dto';
import { StatusPedido } from '../entities/pedido.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PedidoService', () => {
  let service: PedidoService;
  let pedidoRepository: PedidoRepository;
  let produtoService: ProdutoService;

  // Mock do PedidoRepository
  const mockPedidoRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    atualizarStatus: jest.fn(),
  };

  // Mock do ProdutoService
  const mockProdutoService = {
    findOne: jest.fn(),
    verificarEstoque: jest.fn(),
    decrementarEstoque: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        {
          provide: PedidoRepository,
          useValue: mockPedidoRepository,
        },
        {
          provide: ProdutoService,
          useValue: mockProdutoService,
        },
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
    pedidoRepository = module.get<PedidoRepository>(PedidoRepository);
    produtoService = module.get<ProdutoService>(ProdutoService);

    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
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

      mockPedidoRepository.findAll.mockResolvedValue(pedidos);

      // Act
      const result = await service.findAll();

      // Assert
      expect(pedidoRepository.findAll).toHaveBeenCalled();
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

      mockPedidoRepository.findOne.mockResolvedValue(pedido);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(pedido);
    });

    it('should throw NotFoundException when order is not found', async () => {
      // Arrange
      const id = 'pedido-id-inexistente';
      mockPedidoRepository.findOne.mockRejectedValue(
        new NotFoundException(`Pedido com ID ${id} não encontrado`),
      );

      // Act & Assert
      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create a new order when stock is sufficient', async () => {
      // Arrange
      const itemPedido: ItemPedidoDto = {
        produtoId: 'produto-id',
        quantidade: 2,
      };

      const createPedidoDto: CreatePedidoDto = {
        items: [itemPedido],
        status: StatusPedido.PENDENTE,
      };

      const produto = {
        id: 'produto-id',
        nome: 'Produto Teste',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const pedidoCriado = {
        id: 'pedido-id',
        status: StatusPedido.PENDENTE,
        pedidoProdutos: [
          {
            id: 'pedido-produto-id',
            produto,
            quantidade: 2,
            preco_unitario: 100,
            subtotal: 200,
          },
        ],
        total_pedido: 200,
        data_criacao: new Date(),
      };

      mockProdutoService.verificarEstoque.mockResolvedValue(true);
      mockProdutoService.findOne.mockResolvedValue(produto);
      mockPedidoRepository.create.mockResolvedValue(pedidoCriado);

      // Act
      const result = await service.create(createPedidoDto);

      // Assert
      expect(produtoService.verificarEstoque).toHaveBeenCalledWith(
        itemPedido.produtoId,
        itemPedido.quantidade,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(itemPedido.produtoId);
      expect(pedidoRepository.create).toHaveBeenCalled();
      expect(result).toEqual(pedidoCriado);
    });

    it('should throw BadRequestException when stock is insufficient', async () => {
      // Arrange
      const itemPedido: ItemPedidoDto = {
        produtoId: 'produto-id',
        quantidade: 15,
      };

      const createPedidoDto: CreatePedidoDto = {
        items: [itemPedido],
      };

      const produto = {
        id: 'produto-id',
        nome: 'Produto Teste',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      mockProdutoService.verificarEstoque.mockResolvedValue(false);
      mockProdutoService.findOne.mockResolvedValue(produto);

      // Act & Assert
      await expect(service.create(createPedidoDto)).rejects.toThrow(BadRequestException);
      expect(produtoService.verificarEstoque).toHaveBeenCalledWith(
        itemPedido.produtoId,
        itemPedido.quantidade,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(itemPedido.produtoId);
    });

    it('should decrement stock when order status is CONCLUIDO', async () => {
      // Arrange
      const itemPedido: ItemPedidoDto = {
        produtoId: 'produto-id',
        quantidade: 2,
      };

      const createPedidoDto: CreatePedidoDto = {
        items: [itemPedido],
        status: StatusPedido.CONCLUIDO,
      };

      const produto = {
        id: 'produto-id',
        nome: 'Produto Teste',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const pedidoCriado = {
        id: 'pedido-id',
        status: StatusPedido.CONCLUIDO,
        pedidoProdutos: [
          {
            id: 'pedido-produto-id',
            produto,
            quantidade: 2,
            preco_unitario: 100,
            subtotal: 200,
          },
        ],
        total_pedido: 200,
        data_criacao: new Date(),
      };

      mockProdutoService.verificarEstoque.mockResolvedValue(true);
      mockProdutoService.findOne.mockResolvedValue(produto);
      mockPedidoRepository.create.mockResolvedValue(pedidoCriado);
      mockProdutoService.decrementarEstoque.mockResolvedValue({
        ...produto,
        quantidade_estoque: 8,
      });

      // Act
      const result = await service.create(createPedidoDto);

      // Assert
      expect(produtoService.verificarEstoque).toHaveBeenCalledWith(
        itemPedido.produtoId,
        itemPedido.quantidade,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(itemPedido.produtoId);
      expect(pedidoRepository.create).toHaveBeenCalled();
      expect(produtoService.decrementarEstoque).toHaveBeenCalledWith(
        itemPedido.produtoId,
        itemPedido.quantidade,
      );
      expect(result).toEqual(pedidoCriado);
    });
  });

  describe('atualizarStatus', () => {
    it('should update order status and decrement stock when changing to CONCLUIDO', async () => {
      // Arrange
      const id = 'pedido-id';
      const novoStatus = StatusPedido.CONCLUIDO;
      
      const pedidoAntesAtualizacao = {
        id,
        status: StatusPedido.PENDENTE,
        pedidoProdutos: [
          {
            produto: {
              id: 'produto-id',
              nome: 'Produto Teste',
              quantidade_estoque: 10,
            },
            quantidade: 2,
          },
        ],
        total_pedido: 200,
        data_criacao: new Date(),
      };
      
      const pedidoAtualizado = {
        ...pedidoAntesAtualizacao,
        status: novoStatus,
      };

      mockPedidoRepository.findOne.mockResolvedValue(pedidoAntesAtualizacao);
      mockPedidoRepository.atualizarStatus.mockResolvedValue(pedidoAtualizado);
      mockProdutoService.decrementarEstoque.mockResolvedValue({
        id: 'produto-id',
        nome: 'Produto Teste',
        quantidade_estoque: 8,
      });

      // Espionar o método privado atualizarEstoque
      const atualizarEstoqueSpy = jest.spyOn(service as any, 'atualizarEstoque');

      // Act
      const result = await service.atualizarStatus(id, novoStatus);

      // Assert
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
      expect(atualizarEstoqueSpy).toHaveBeenCalledWith(pedidoAntesAtualizacao);
      expect(pedidoRepository.atualizarStatus).toHaveBeenCalledWith(id, novoStatus);
      expect(result).toEqual(pedidoAtualizado);

      // Restaurar o spy
      atualizarEstoqueSpy.mockRestore();
    });

    it('should not decrement stock when status is not changed to CONCLUIDO', async () => {
      // Arrange
      const id = 'pedido-id';
      const novoStatus = StatusPedido.CANCELADO;
      
      const pedidoAntesAtualizacao = {
        id,
        status: StatusPedido.PENDENTE,
        pedidoProdutos: [
          {
            produto: {
              id: 'produto-id',
              nome: 'Produto Teste',
              quantidade_estoque: 10,
            },
            quantidade: 2,
          },
        ],
        total_pedido: 200,
        data_criacao: new Date(),
      };
      
      const pedidoAtualizado = {
        ...pedidoAntesAtualizacao,
        status: novoStatus,
      };

      mockPedidoRepository.findOne.mockResolvedValue(pedidoAntesAtualizacao);
      mockPedidoRepository.atualizarStatus.mockResolvedValue(pedidoAtualizado);

      // Espionar o método privado atualizarEstoque
      const atualizarEstoqueSpy = jest.spyOn(service as any, 'atualizarEstoque');

      // Act
      const result = await service.atualizarStatus(id, novoStatus);

      // Assert
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
      expect(atualizarEstoqueSpy).not.toHaveBeenCalled();
      expect(pedidoRepository.atualizarStatus).toHaveBeenCalledWith(id, novoStatus);
      expect(result).toEqual(pedidoAtualizado);

      // Restaurar o spy
      atualizarEstoqueSpy.mockRestore();
    });

    it('should not decrement stock when status is already CONCLUIDO', async () => {
      // Arrange
      const id = 'pedido-id';
      const novoStatus = StatusPedido.CONCLUIDO;
      
      const pedidoAntesAtualizacao = {
        id,
        status: StatusPedido.CONCLUIDO,
        pedidoProdutos: [
          {
            produto: {
              id: 'produto-id',
              nome: 'Produto Teste',
              quantidade_estoque: 10,
            },
            quantidade: 2,
          },
        ],
        total_pedido: 200,
        data_criacao: new Date(),
      };
      
      const pedidoAtualizado = {
        ...pedidoAntesAtualizacao,
        status: novoStatus,
      };

      mockPedidoRepository.findOne.mockResolvedValue(pedidoAntesAtualizacao);
      mockPedidoRepository.atualizarStatus.mockResolvedValue(pedidoAtualizado);

      // Espionar o método privado atualizarEstoque
      const atualizarEstoqueSpy = jest.spyOn(service as any, 'atualizarEstoque');

      // Act
      const result = await service.atualizarStatus(id, novoStatus);

      // Assert
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
      expect(atualizarEstoqueSpy).not.toHaveBeenCalled();
      expect(pedidoRepository.atualizarStatus).toHaveBeenCalledWith(id, novoStatus);
      expect(result).toEqual(pedidoAtualizado);

      // Restaurar o spy
      atualizarEstoqueSpy.mockRestore();
    });
  });
}); 
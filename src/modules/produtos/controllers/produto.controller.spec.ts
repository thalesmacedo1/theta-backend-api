import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from '../services/produto.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;

  // Mock do ProdutoService
  const mockProdutoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        {
          provide: ProdutoService,
          useValue: mockProdutoService,
        },
      ],
    }).compile();

    controller = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      // Arrange
      const createProdutoDto: CreateProdutoDto = {
        nome: 'Produto Teste',
        categoria: 'Teste',
        descricao: 'Produto para teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const produtoCriado = {
        id: 'produto-id',
        ...createProdutoDto,
      };

      mockProdutoService.create.mockResolvedValue(produtoCriado);

      // Act
      const result = await controller.create(createProdutoDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(createProdutoDto);
      expect(result).toEqual(produtoCriado);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      // Arrange
      const produtos = [
        {
          id: 'produto-id-1',
          nome: 'Produto 1',
          categoria: 'Categoria 1',
          descricao: 'Descrição 1',
          preco: 100,
          quantidade_estoque: 10,
        },
        {
          id: 'produto-id-2',
          nome: 'Produto 2',
          categoria: 'Categoria 2',
          descricao: 'Descrição 2',
          preco: 200,
          quantidade_estoque: 20,
        },
      ];

      mockProdutoService.findAll.mockResolvedValue(produtos);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(produtos);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      // Arrange
      const id = 'produto-id';
      const produto = {
        id,
        nome: 'Produto Teste',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      mockProdutoService.findOne.mockResolvedValue(produto);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(produto);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      // Arrange
      const id = 'produto-id';
      const updateProdutoDto: UpdateProdutoDto = {
        nome: 'Produto Atualizado',
        preco: 150,
      };

      const produtoAtualizado = {
        id,
        nome: 'Produto Atualizado',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 150,
        quantidade_estoque: 10,
      };

      mockProdutoService.update.mockResolvedValue(produtoAtualizado);

      // Act
      const result = await controller.update(id, updateProdutoDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(id, updateProdutoDto);
      expect(result).toEqual(produtoAtualizado);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      // Arrange
      const id = 'produto-id';
      mockProdutoService.remove.mockResolvedValue(undefined);

      // Act
      await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
}); 
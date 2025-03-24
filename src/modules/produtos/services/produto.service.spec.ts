import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from '../repositories/produto.repository';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let repository: ProdutoRepository;

  // Mock do ProdutoRepository
  const mockProdutoRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    decrementarEstoque: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: ProdutoRepository,
          useValue: mockProdutoRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    repository = module.get<ProdutoRepository>(ProdutoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
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

      mockProdutoRepository.findAll.mockResolvedValue(produtos);

      // Act
      const result = await service.findAll();

      // Assert
      expect(repository.findAll).toHaveBeenCalled();
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

      mockProdutoRepository.findOne.mockResolvedValue(produto);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(produto);
    });

    it('should throw NotFoundException when product is not found', async () => {
      // Arrange
      const id = 'produto-id-inexistente';
      mockProdutoRepository.findOne.mockRejectedValue(
        new NotFoundException(`Produto com ID ${id} não encontrado`),
      );

      // Act & Assert
      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
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

      mockProdutoRepository.create.mockResolvedValue(produtoCriado);

      // Act
      const result = await service.create(createProdutoDto);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(createProdutoDto);
      expect(result).toEqual(produtoCriado);
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

      mockProdutoRepository.update.mockResolvedValue(produtoAtualizado);

      // Act
      const result = await service.update(id, updateProdutoDto);

      // Assert
      expect(repository.update).toHaveBeenCalledWith(id, updateProdutoDto);
      expect(result).toEqual(produtoAtualizado);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      // Arrange
      const id = 'produto-id';
      mockProdutoRepository.remove.mockResolvedValue(undefined);

      // Act
      await service.remove(id);

      // Assert
      expect(repository.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('verificarEstoque', () => {
    it('should return true when stock is sufficient', async () => {
      // Arrange
      const id = 'produto-id';
      const quantidade = 5;
      const produto = {
        id,
        nome: 'Produto Teste',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      mockProdutoRepository.findOne.mockResolvedValue(produto);

      // Act
      const result = await service.verificarEstoque(id, quantidade);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should return false when stock is insufficient', async () => {
      // Arrange
      const id = 'produto-id';
      const quantidade = 15;
      const produto = {
        id,
        nome: 'Produto Teste',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      mockProdutoRepository.findOne.mockResolvedValue(produto);

      // Act
      const result = await service.verificarEstoque(id, quantidade);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(result).toBe(false);
    });
  });

  describe('decrementarEstoque', () => {
    it('should decrement product stock', async () => {
      // Arrange
      const id = 'produto-id';
      const quantidade = 5;
      const produtoAntesDecremento = {
        id,
        nome: 'Produto Teste',
        categoria: 'Categoria Teste',
        descricao: 'Descrição Teste',
        preco: 100,
        quantidade_estoque: 10,
      };

      const produtoDepoisDecremento = {
        ...produtoAntesDecremento,
        quantidade_estoque: 5,
      };

      mockProdutoRepository.decrementarEstoque.mockResolvedValue(produtoDepoisDecremento);

      // Act
      const result = await service.decrementarEstoque(id, quantidade);

      // Assert
      expect(repository.decrementarEstoque).toHaveBeenCalledWith(id, quantidade);
      expect(result).toEqual(produtoDepoisDecremento);
    });
  });
}); 
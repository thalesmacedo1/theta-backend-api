import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Produto } from '../entities/produto.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ 
    status: 201, 
    description: 'Produto criado com sucesso',
    type: Produto,
  })
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de produtos retornada com sucesso',
    type: [Produto],
  })
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ 
    status: 200, 
    description: 'Produto encontrado com sucesso',
    type: Produto,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Produto não encontrado',
  })
  async findOne(@Param('id') id: string): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ 
    status: 200, 
    description: 'Produto atualizado com sucesso',
    type: Produto,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Produto não encontrado',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ 
    status: 204, 
    description: 'Produto removido com sucesso',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Produto não encontrado',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.produtoService.remove(id);
  }
} 
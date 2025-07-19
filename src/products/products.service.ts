import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { firstMissingLetter } from 'src/utils/missing-letter.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private async findProductOrNotFound(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  private async validateSkuIsUnique(sku: string, ignoreId?: number) {
    const product = await this.productRepository.findOne({
      where: { sku },
    });

    if (product && product.id !== ignoreId) {
      throw new BadRequestException('SKU must be unique');
    }
  }

  async findAll(): Promise<(Product & { missingLetter: string })[]> {
    const products = await this.productRepository.find({
      order: {
        description: 'asc',
      },
    });

    return products.map((p) => ({
      ...p,
      missingLetter: firstMissingLetter(p.description),
    }));
  }

  async findOne(id: number): Promise<Product & { missingLetter: string }> {
    const product = await this.findProductOrNotFound(id);
    return {
      ...product,
      missingLetter: firstMissingLetter(product.description),
    };
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<Product & { missingLetter: string }> {
    await this.validateSkuIsUnique(createProductDto.sku);

    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);

    return {
      ...product,
      missingLetter: firstMissingLetter(product.description),
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findProductOrNotFound(id);

    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      await this.validateSkuIsUnique(updateProductDto.sku, id);
    }

    Object.assign(product, updateProductDto);
    await this.productRepository.save(product);

    return {
      ...product,
      missingLetter: firstMissingLetter(product.description),
    };
  }

  async remove(id: number) {
    const product = await this.findProductOrNotFound(id);
    return this.productRepository.delete(product);
  }
}

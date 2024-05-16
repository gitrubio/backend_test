import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {
  private logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
       const product = this.productRepository.create(createProductDto);

        return await this.productRepository.save(product);
        
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
   try {
    return this.productRepository.findOneBy({ id });
   } catch (error) {
    this.logger.error(error);
   }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return this.productRepository.update(id, updateProductDto);
    } catch (error) {
      this.logger.error(error);   
    }
  }

  async remove(id: string) {
   try {
     return this.productRepository.delete(id);
   } catch (error) {
      this.logger.error(error);
   }
  }
}

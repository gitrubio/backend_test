import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Raw, Repository } from 'typeorm';
import { SearchProductDto } from './dto/search-products.dto';


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

  async findAll(searchParams: SearchProductDto) {
    const { limit,offset,title } = searchParams;
    const where = title ? { Title: Raw((alias)=> `${alias} LIKE '%${title}%'`) } : null
    const products = await  this.productRepository.find({
      take: limit,
      skip: offset,
      where: where,
    });
    const totalProducts: number = await this.productRepository.count({where});
    return {products,totalProducts};
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';
import {  stockMockData } from './mock/data';

@Injectable()
export class ChartsService {
  create(createChartDto: CreateChartDto) {
    return 'This action adds a new chart';
  }

  findAll() {
    return `This action returns all charts`;
  }

  findOne(symbol: string) {
      const company = stockMockData.find(stock => stock.symbol === symbol);
      if (!company) throw new NotFoundException(`Company with symbol ${symbol} not found`);
      return company
  }

  update(id: number, updateChartDto: UpdateChartDto) {
    return `This action updates a #${id} chart`;
  }

  remove(id: number) {
    return `This action removes a #${id} chart`;
  }
}



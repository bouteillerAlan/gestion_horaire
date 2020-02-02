import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {createQueryBuilder, Repository} from 'typeorm';
import {Customers} from './customers.entity';
import {CustomersDto} from './customer.dto';
import {CustomersEditDto} from './customer.edit.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.customersRepository.find();
  }

  async findOne(id: number, join: string): Promise<any> {
    const testId: any[] = await this.customersRepository.findByIds([id]);
    if (testId.length === 0) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    if (join === 'false') {
      return testId;
    }
    return createQueryBuilder('customers', 'customers')
      .where('customers.id = :id', {id})
      .leftJoinAndSelect('adding', 'adding', 'adding.idUser = customers.id')
      .leftJoinAndSelect('removal', 'removal', 'removal.idUser = customers.id')
      .execute();
  }

  async insert(data: CustomersDto): Promise<any> {
    return this.customersRepository.insert(data);
  }

  async update(id: number, data: CustomersEditDto): Promise<any> {
    const testId: any[] = await this.customersRepository.findByIds([id]);
    if (testId.length === 0) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return this.customersRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    const result: any = await this.customersRepository.delete(id);
    if (result.affected !== 1) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return result;
  }

}

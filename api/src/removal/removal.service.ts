import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Removal} from './removal.entity';
import {RemovalDto} from './removal.dto';
import {RemovalEditDto} from './removal.edit.dto';
import {Adding} from '../adding/adding.entity';

@Injectable()
export class RemovalService {
  constructor(
    @InjectRepository(Removal)
    private readonly removalRepository: Repository<Removal>,
  ) {}

  async findAll(): Promise<Removal[]> {
    return this.removalRepository.find();
  }

  async findOne(id: number): Promise<Adding[]> {
    const testId: any[] = await this.removalRepository.findByIds([id]);
    if (testId.length === 0) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return testId;
  }

  async insert(data: RemovalDto): Promise<any> {
    return this.removalRepository.insert(data);
  }

  async update(id: number, data: RemovalEditDto): Promise<any> {
    const testId: any[] = await this.removalRepository.findByIds([id]);
    if (testId.length === 0) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return this.removalRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    const result: any = await this.removalRepository.delete(id);
    if (result.affected !== 1) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return result;
  }

}

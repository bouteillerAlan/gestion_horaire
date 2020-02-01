import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Adding} from './adding.entity';
import {AddingDto} from './adding.dto';
import {AddingEditDto} from './adding.edit.dto';

@Injectable()
export class AddingService {
  constructor(
    @InjectRepository(Adding)
    private readonly addingRepository: Repository<Adding>,
  ) {}

  async findAll(): Promise<Adding[]> {
    return this.addingRepository.find();
  }

  async insert(data: AddingDto): Promise<any> {
    return this.addingRepository.insert(data);
  }

  async update(id: number, data: AddingEditDto): Promise<any> {
    const testId: any[] = await this.addingRepository.findByIds([id]);
    if (testId.length === 0) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return this.addingRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    const result: any = await this.addingRepository.delete(id);
    if (result.affected !== 1) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return result;
  }

}

import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Users} from './users.entity';
import {UsersDto} from './user.dto';
import {UsersEditDto} from './user.edit.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const testId: any[] = await this.usersRepository.findByIds([id]);
    if (testId.length === 0) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return testId;
  }

  async insert(data: UsersDto): Promise<any> {
    return this.usersRepository.insert(data);
  }

  async update(id: number, data: UsersEditDto): Promise<any> {
    const testId: any[] = await this.usersRepository.findByIds([id]);
    if (testId.length === 0) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    const result: any = await this.usersRepository.delete(id);
    if (result.affected !== 1) {
      throw new BadRequestException('Cet id n\'existe pas');
    }
    return result;
  }

}

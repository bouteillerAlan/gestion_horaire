import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AppLogInDto} from './app.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Users} from './users/users.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async logIn(body: AppLogInDto): Promise<any> {
    // user exist in the db ?
    const user: any = await this.usersRepository.findOne({where: {name: body.name}});
    if (!user) {
      throw new BadRequestException('Cet user n\'existe pas');
    }

    // password is equal to the send in one ?
    const checkPsw = await bcrypt.compare(body.password, user.password);
    if (!checkPsw) {
      throw new HttpException('Wrong credential', HttpStatus.BAD_REQUEST);
    }

    // if all check is ok send jwt
    const payload = { username: user.name, role: user.role, id: user.id, timestamp: Date() };
    const jwt = await this.jwtService.sign(payload);

    // update the user with the new jwt
    await this.usersRepository.update(user.id, {jwt});

    // and finaly return the token
    return {jwt};
  }
}

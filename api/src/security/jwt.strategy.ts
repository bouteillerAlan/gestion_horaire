import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '../config/config.service';
import {Repository} from 'typeorm';
import {Users} from '../users.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly env: ConfigService,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.get('secret'),
    });
  }

  /**
   * Automatically use for check if a user is valid before doing anything else
   * @param {any} payload the jwt payload
   * @return {boolean} return if a user is authorized or not
   */
  async validate(payload: any) {
    let userExist: any[] = [];
    if (payload.role === 'User') {
      userExist = await this.usersRepository.findByIds([payload.id]);
    } else {
      // edit if u need other role
      userExist = [];
    }
    return userExist.length > 0 ? userExist[0] : false;
  }
}

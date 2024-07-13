import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameAuth(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const userObject = user.toObject()
      const { password, ...result } = userObject
      return result
    }
    return null
  }

}

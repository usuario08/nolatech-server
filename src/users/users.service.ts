import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto)
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, count } = paginationDto
    const skip = (page - 1) * count
    const [users, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(count).exec(),
      this.userModel.countDocuments().exec()
    ])
    return { users, total }
  }

  async findOneByUsernameAuth(username: string) {
    return await this.userModel.findOne({ username }).select('+password').exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec()
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec()
  }
}

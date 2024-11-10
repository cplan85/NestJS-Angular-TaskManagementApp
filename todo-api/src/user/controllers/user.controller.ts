import { DtoHelperService } from './../dto/dto-helper.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginResponseI, UserI } from '../user.interfaces';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private dtoHelperService: DtoHelperService) {}

  //POST .../users create a user
  //GET .../users returns all users
  //PUT .../users/:id updates a user
  //DELETE .../users/:id

  @Post()

  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    const userEntity: UserI = await this.dtoHelperService.createUserDtoToEntity(createUserDto);

    return this.userService.create(userEntity)
  }

  @Post('login')

  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
    const userEntity: UserI = await this.dtoHelperService.loginUserDtoToEntity(loginUserDto)
    const jwt: string = await this.userService.login(userEntity);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 10000
    }
  }
}

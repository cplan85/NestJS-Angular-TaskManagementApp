import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserI } from './user.interfaces';

export interface Test{
  title: string;
}

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private authService: AuthService) {

  }
  async create(newUser: UserI): Promise<UserI> {
    
    const emailExists: boolean = await this.mailExists(newUser.email);
    const usernameExists: boolean = await this.usernameExists(newUser.username)

    if (emailExists === false && usernameExists === false) {
      const passwordHash: string = await this.authService.hashPassword(newUser.password);
      newUser.password = passwordHash;
      newUser.email = newUser.email.toLowerCase();
      newUser.username = newUser.username.toLowerCase();

      const user = await this.userRepository.save(this.userRepository.create(newUser));
      return this.findOne(user.id);

    } else {
      throw new HttpException('Email or Username is already taken', HttpStatus.CONFLICT)
    }

  }

  async login(user: UserI): Promise<string> {
    const foundUser: UserI = await this.findByEmail(user.email);

    if (foundUser) {
      console.log(foundUser, "found User")
      const passwordMatch = await this.authService.comparePasswords(user.password, foundUser.password);

      if(passwordMatch === true) {
        const payload: UserI = await this.findOne(foundUser.id);
        return this.authService.generateJwt(payload);
      } else {
        throw new HttpException('Login not successful, wrong credentials', HttpStatus.UNAUTHORIZED)
      }

    } else 
    {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

  }

  private async findByEmail(email: string): Promise<UserI> {
    const user = await this.userRepository.findOne({
      where: {email},
      select: ['id', 'email', 'password', 'username']
    })
    return user;
  }

  private async mailExists(email:string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {email}
    });
    return !!user;
  }

  private async usernameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {username}
    });
    return !!user;
  }

  private async findOne(id: number): Promise<UserI> {
    const user = await this.userRepository.findOne({
      where: {id}
    })
    return user;
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number): Test {
  //   return {title: `This action returns a #${id} user`}
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

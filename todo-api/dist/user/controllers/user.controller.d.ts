import { DtoHelperService } from './../dto/dto-helper.service';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginResponseI, UserI } from '../user.interfaces';
import { LoginUserDto } from '../dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    private dtoHelperService;
    constructor(userService: UserService, dtoHelperService: DtoHelperService);
    create(createUserDto: CreateUserDto): Promise<UserI>;
    login(loginUserDto: LoginUserDto): Promise<LoginResponseI>;
}

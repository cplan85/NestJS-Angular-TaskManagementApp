import { CreateUserDto } from "./create-user.dto";
import { UserI } from "../user.interfaces";
import { LoginUserDto } from "./login-user.dto";
export declare class DtoHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): UserI;
    loginUserDtoToEntity(loginUserDto: LoginUserDto): UserI;
}

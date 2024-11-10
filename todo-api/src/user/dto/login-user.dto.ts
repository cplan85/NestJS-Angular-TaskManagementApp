import { IsEmail, IsNotEmpty } from "class-validator";


// with the dtos we can check if the payload that the user sends fulfills our conditions
export class LoginUserDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}
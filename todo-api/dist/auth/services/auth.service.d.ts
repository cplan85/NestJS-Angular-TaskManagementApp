import { JwtService } from "@nestjs/jwt";
import { UserI } from "src/user/user.interfaces";
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: UserI): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, storedPasswordHash: string): Promise<boolean>;
    verifyJwt(jwt: string): Promise<any>;
}

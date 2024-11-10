import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserI } from './user.interfaces';
export interface Test {
    title: string;
}
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(newUser: UserI): Promise<UserI>;
    login(user: UserI): Promise<string>;
    private findByEmail;
    private mailExists;
    private usernameExists;
    private findOne;
}

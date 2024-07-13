import { IsString, MinLength, MaxLength, Matches } from 'class-validator'

export class LoginDto {
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    @Matches(/^[a-z]+$/, { message: 'Nombre de usuario solo puede contener letras.' })
    username: string;

    @IsString()
    @MinLength(1)
    password: string;
}

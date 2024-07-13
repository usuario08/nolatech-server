import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Length(4, 10)
    @Matches(/^[a-z]+$/, { message: 'Nombre de usuario solo puede contener letras.' })
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, { message: 'La contraseña debe tener al menos 6 caracteres y contener letras y números.' })
    readonly password: string;

}

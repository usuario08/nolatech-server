import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsNotEmpty()
    @Length(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, { message: 'La contraseña debe tener al menos 6 caracteres y contener letras y números.' })
    readonly password: string

}

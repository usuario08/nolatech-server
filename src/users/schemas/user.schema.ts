import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as bcrypt from 'bcrypt'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 4,
        maxlength: 10,
        match: [/^[a-z]+$/, 'Nombre de usuario solo puede contener letras.']
    })
    username: string

    @Prop({
        required: true,
        minlength: 6,
        select: false,
        match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'La contraseña debe tener al menos 6 caracteres y contener letras y números.']
    })
    password: string

    @Prop({ default: true })
    isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    next()
})
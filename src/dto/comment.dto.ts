import {IsEmail , IsString, IsNotEmpty} from 'class-validator'

export class commentDto {
    @IsString()
    @IsNotEmpty()
    body: string

    @IsString()
    @IsNotEmpty()
    ip: string
}
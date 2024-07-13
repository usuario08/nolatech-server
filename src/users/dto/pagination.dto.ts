import { Transform } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    readonly page: number = 1

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    readonly count: number = 10
}

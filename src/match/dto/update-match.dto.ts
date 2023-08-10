import { IsNotEmpty, IsPositive, Min } from 'class-validator';

export class UpdateMatchDto {
    @IsNotEmpty()
    @Min(0)
    challengerScore: number

    @IsNotEmpty()
    @Min(0)
    opponentScore: number
}

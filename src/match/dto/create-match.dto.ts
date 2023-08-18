import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMatchDto {
    // @ApiProperty()
    @IsNotEmpty()
    opponentId: number

    @IsNotEmpty()
    leagueId: number
}

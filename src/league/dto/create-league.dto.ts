import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLeagueDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string
}

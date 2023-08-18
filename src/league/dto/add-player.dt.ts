import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddPlayerDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number
}
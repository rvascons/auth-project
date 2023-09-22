import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Permissions } from "../../auth/enums/permissions.enum";
export class CreateInviteDto {

    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsNumber()
    @IsNotEmpty()
    public tripId: number;

    @IsOptional()
    @IsEnum(Permissions, { each: true })
    public permissions?: Permissions[];

}

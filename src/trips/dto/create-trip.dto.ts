import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateTripDto {
    @IsOptional()
    @IsString()
    id?: number;
  
    @IsString()
    @MinLength(1, { message: 'Destination should not be empty' })
    destination: string;
}

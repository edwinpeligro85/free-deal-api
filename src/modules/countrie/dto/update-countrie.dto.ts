import { PartialType } from '@nestjs/swagger';
import { CreateCountrieDto } from './create-countrie.dto';

export class UpdateCountrieDto extends PartialType(CreateCountrieDto) {}

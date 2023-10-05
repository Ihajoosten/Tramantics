import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Journal } from './journal.entity';
import { JournalService } from './journal.service';
import { CreateJournalDTO } from './dto/create-journal.dto';
import { UpdateJournalDTO } from './dto/update.journal.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';

@ApiTags('Journal')
@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was created successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  create(@Body() createJournalDTO: CreateJournalDTO): Promise<Journal> {
    return this.journalService.create(createJournalDTO);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Journals were not found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  findAll(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  @Get(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Journal was not found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  findOne(@Param('uuid') uuid: string): Promise<Journal> {
    return this.journalService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Journal does not Exist',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request: could not update Journal',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  update(
    @Param('uuid') uuid: string,
    @Body() updateJournalDTO: UpdateJournalDTO,
  ): Promise<Journal> {
    return this.journalService.update(uuid, updateJournalDTO);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Journal does not exist',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.journalService.remove(uuid);
  }
}

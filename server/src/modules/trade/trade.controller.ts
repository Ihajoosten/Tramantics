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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Trade } from './trade.entity';
import { TradeService } from './trade.service';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDTO } from './dto/update-trade.dto';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';

@ApiTags('Trade')
@Controller('trades')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  create(@Body() createTradeDTO: CreateTradeDTO): Promise<Trade> {
    return this.tradeService.create(createTradeDTO);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Trades were not found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  findAll(): Promise<Array<Trade>> {
    return this.tradeService.findAll();
  }

  @Get(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Tradig Model was not found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  findOne(@Param('uuid') uuid: string): Promise<Trade> {
    return this.tradeService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Trades does not Exist',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request: could not update Trade',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  update(
    @Param('uuid') uuid: string,
    @Body() updateTradeDTO: UpdateTradeDTO,
  ): Promise<Trade> {
    return this.tradeService.update(uuid, updateTradeDTO);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Trade does not exist',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.tradeService.remove(uuid);
  }
}

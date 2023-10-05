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
import { TradingModelService } from './trading-model.service';
import { TradingModel } from './trading-model.entity';
import { CreateTradingModelDTO } from './dto/create-trading-model.dto';
import { UpdateTradingModelDTO } from './dto/update-trading-model.dto';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';

@ApiTags('Trading Model')
@Controller('trading-models')
export class TradingModelController {
  constructor(private readonly tradingModelService: TradingModelService) {}

  @Post()
  create(
    @Body() createTradingModelDTO: CreateTradingModelDTO,
  ): Promise<TradingModel> {
    return this.tradingModelService.create(createTradingModelDTO);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Trading Models were not found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  findAll(): Promise<Array<TradingModel>> {
    return this.tradingModelService.findAll();
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
  findOne(@Param('uuid') uuid: string): Promise<TradingModel> {
    return this.tradingModelService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Trading Models does not Exist',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request: could not update Trading Model',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  update(
    @Param('uuid') uuid: string,
    @Body() updateTradingModelDTO: UpdateTradingModelDTO,
  ): Promise<TradingModel> {
    return this.tradingModelService.update(uuid, updateTradingModelDTO);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Trading Model does not exist',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.tradingModelService.remove(uuid);
  }
}

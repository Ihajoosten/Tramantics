import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { User } from './user.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Users were not found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  async findAll(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: User was not found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  async findOne(@Param('uuid') uuid: string): Promise<User> {
    return await this.userService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({
    description: 'Resource not found: User does not Exist',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request: could not update User',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Customer')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.update(uuid, updateUser);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: User does not exist',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return await this.userService.remove(uuid);
  }
}

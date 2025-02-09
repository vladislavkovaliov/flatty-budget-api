import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('status')
  status() {
    return { status: 200 };
  }

  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      id: id,
    };
  }

  // TODO: to avoid any type later
  @Post()
  create(@Body() body: any): any {
    return body;
  }
}

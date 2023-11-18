import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../../common/auth/roles/role.enum';
import { AdminService } from './admin.service';
import { CreateAdminDto, LoginDto } from './dto/admin.dto';
import { UpdateAdminDto } from './dto/admin.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.wrapper';
import { CoreApiResponse } from 'src/common/http/response.http';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @DecoratorWrapper('Create admin', true, [Role.Admin])
  async create(@Body() dto: CreateAdminDto) {
    return CoreApiResponse.success(await this.adminService.create(dto));
  }

  @Post('login')
  @DecoratorWrapper('Login admin', false)
  async login(@Body() dto: LoginDto) {
    return CoreApiResponse.success(await this.adminService.login(dto));
  }

  @Get()
  @DecoratorWrapper('Get all admins | OA', true, [Role.Admin])
  async findAll() {
    return CoreApiResponse.success(await this.adminService.findAll());
  }

  @Get(':id')
  @DecoratorWrapper('Get one admin | OA', true, [Role.Admin])
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return CoreApiResponse.success(await this.adminService.findOne(id));
  }

  @Patch(':id')
  @DecoratorWrapper('Update admin | OA', true, [Role.Admin])
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    return CoreApiResponse.success(await this.adminService.update(id, dto));
  }
}

import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { CreateAdminDto, LoginDto } from './dto/admin.dto';
import { UpdateAdminDto } from './dto/admin.dto';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { HttpError } from 'src/common/http/error.http';
import { env } from 'src/common/config';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>) {}

  async create(dto: CreateAdminDto) {
    const login_taken = await this.adminRepo.findOne({
      where: { login: dto.login },
    });

    if (login_taken) HttpError({ code: 'LOGIN_TAKEN' });

    const admin = this.adminRepo.create({
      login: dto.login,
      password: await hash(dto.password, 10),
    });

    return await this.adminRepo.save(admin);
  }

  async login(dto: LoginDto) {
    const admin = await this.adminRepo.findOneBy({ login: dto.login });
    if (!admin) HttpError({ code: 'ADMIN_NOT_FOUND' });

    const password_valid = await compare(dto.password, admin.password);
    if (!password_valid) HttpError({ code: 'WRONG_PASSWORD' });

    const token = sign({ id: admin.id, role: 'admin' }, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRY,
    });

    return {
      ...admin,
      token,
      token_expires_in: env.JWT_ACCESS_EXPIRY,
    };
  }

  async findAll() {
    return this.adminRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) HttpError({ code: 'ADMIN_NOT_FOUND' });

    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) HttpError({ code: 'ADMIN_NOT_FOUND' });

    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(admin, key)) {
        admin[key] = dto[key];
      }
    }

    return await this.adminRepo.save(admin);
  }
}

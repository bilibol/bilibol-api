import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { CreateAdminDto, LoginDto } from './dto/admin.dto';
import { UpdateAdminDto } from './dto/admin.dto';
import { sign } from 'jsonwebtoken';
import { HttpError } from 'src/common/http/error.http';
import { env } from 'src/common/config';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {}

  async create(dto: CreateAdminDto) {
    const login_taken = await this.adminModel.findOne({ login: dto.login }).exec();
    if (login_taken) HttpError({ code: 'LOGIN_TAKEN' });

    const admin = new this.adminModel({
      login: dto.login,
      password: await hash(dto.password, 10),
    });

    return await admin.save();
  }

  async login(dto: LoginDto) {
    const admin = await this.adminModel.findOne({ login: dto.login }).exec();
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
    return this.adminModel.find().exec();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({ id });
    if (!admin) HttpError({ code: 'ADMIN_NOT_FOUND' });

    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.adminModel.findOne({ id });
    if (!admin) HttpError({ code: 'ADMIN_NOT_FOUND' });

    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(admin, key)) {
        admin[key] = dto[key];
      }
    }

    return await this.adminModel.updateOne({ id }, { $set: dto });
  }
}

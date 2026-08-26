import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { T } from '../../libs/types/common';
import { Member } from '../../libs/dto/member/member';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    public async hashPassword(memberPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(memberPassword, salt)
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.hash(password, hashedPassword)
    }

    public async createToken(member: Member): Promise<string> {
        const payload: T = {}
        Object.keys(member['_doc'] ? member['_doc'] : member).map((ele) => {
            payload[`${ele}`] = member[`${ele}`];
        });
        delete payload.memberPassword;
        console.log("payload:", payload)

        return await this.jwtService.signAsync(payload);
    }

    public async verifyToken(token: string): Promise<Member> {
        try {
            const member = await this.jwtService.verifyAsync(token);
            member._id = shapeIntoMongoObjectId(member._id);
            return member;
        } catch (err) {
            console.error('JWT Verification error:', err.message);
            throw new UnauthorizedException(Message.NOT_AUTHENTICATED);
        }
    }
}


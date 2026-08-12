import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<null>) { }

    public async signUp(): Promise<string> {
        return "SignUp Executed!"
    }

    public async login(): Promise<string> {
        return "Login Executed!"
    }

    public async UpdateMember(): Promise<string> {
        return "UpdateMember Executed!"
    }

    public async getMember(): Promise<string> {
        return "GetMember Executed!"
    }
}

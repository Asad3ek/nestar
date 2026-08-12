import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
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

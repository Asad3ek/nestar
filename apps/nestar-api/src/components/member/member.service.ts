import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';

@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<Member>) { }

    public async signUp(input: MemberInput): Promise<Member> {
        //TODO: HASH Password
        try {
            //TODO: Auth via tokens
            const result = await this.memberModel.create(input);
            return result
        }
        catch (err) {
            console.log("ERROR, signUp", err)
            throw new BadRequestException(err)
        }

    }

    public async login(input: LoginInput): Promise<Member> {
        try {
            const result = await this.memberModel.findOne(

            )
            return result;
        }
        catch (err) {
            console.log("ERROR, login", err)
            throw new BadRequestException(err)
        }
    }

    public async UpdateMember(): Promise<string> {
        return "UpdateMember Executed!"
    }

    public async getMember(): Promise<string> {
        return "GetMember Executed!"
    }
}

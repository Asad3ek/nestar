import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { exec } from 'child_process';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';

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
            const { memberNick, memberPassword } = input
            const response: Member = await this.memberModel
                .findOne({ memberNick: memberNick })
                .select("+memberPassword")
                .exec();

            if (!response || response.memberStatus === MemberStatus.DELETE) {
                throw new InternalServerErrorException(Message.NO_MEMBER_NICK)
            } else if (response.memberStatus === MemberStatus.BLOCK) {
                throw new InternalServerErrorException(Message.BLOCKED_USER)
            }

            //TODO: Compare Password
            const isMatch = input.memberPassword === response.memberPassword;
            if (!isMatch) {
                throw new InternalServerErrorException(Message.WRONG_PASSWORD)
            }
            return response;
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

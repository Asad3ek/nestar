import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { };

    @Mutation(() => Member)
    public async signUp(@Args("input") input: MemberInput): Promise<Member> {
        try {
            console.log("Mutation signUp");
            console.log("input: ", input);
            return this.memberService.signUp(input);
        }
        catch (err) {
            console.log("ERROR, signUp: ", err);
            throw new InternalServerErrorException(err);
        }
    }

    @Mutation(() => Member)
    public async login(@Args("input") input: LoginInput): Promise<Member> {
        try {
            console.log("Mutation login");
            return this.memberService.login(input);
        }
        catch (err) {
            console.log("ERROR, login: ", err);
            throw new InternalServerErrorException(err);
        }
    }

    @Mutation(() => String)
    public async updateMember(): Promise<string> {
        try {
            console.log("Mutation updateMember");
            return this.memberService.UpdateMember();
        }
        catch (err) {
            console.log("ERROR, UpdateMember: ", err);
            throw new InternalServerErrorException(err);
        }
    }


    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log("Mutation getMember");
        return this.memberService.getMember();
    }

}
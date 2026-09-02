import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { MemberAuthType, MemberStatus, MemberType } from "../../enums/member.enum";
import { MeLiked } from "../like/like";
import { MeFollowed } from "../follow/follow";


@ObjectType()
export class Member {
    @Field(() => String)
    _id: ObjectId

    @Field(() => MemberType)
    memberType: MemberType

    @Field(() => MemberStatus)
    memberStatus: MemberStatus

    @Field(() => MemberAuthType)
    memberAuthType: MemberAuthType

    @Field(() => String)
    memberPhone: string

    @Field(() => String)
    memberNick: string

    memberPassword?: string

    @Field(() => String, { nullable: true })
    memberFullName: string

    @Field(() => String)
    memberImage: string

    @Field(() => String, { nullable: true })
    memberAddress?: string

    @Field(() => String, { nullable: true })
    memberDesc?: string

    @Field(() => Int)
    memberProperties?: number

    @Field(() => Int)
    memberArticles?: number

    @Field(() => Int, { defaultValue: 0 })
    memberFollowers?: number

    @Field(() => Int, { defaultValue: 0 })
    memberFollowings?: number

    @Field(() => Int, { defaultValue: 0 })
    memberRank?: number

    @Field(() => Int, { defaultValue: 0 })
    memberBlocks?: number

    @Field(() => Int, { defaultValue: 0 })
    memberPoints?: number

    @Field(() => Int, { defaultValue: 0 })
    memberLikes?: number

    @Field(() => Int, { defaultValue: 0 })
    memberViews?: number

    @Field(() => Int, { defaultValue: 0 })
    memberWarnings?: number

    @Field(() => Int, { defaultValue: 0 })
    memberComments?: number

    @Field(() => Date, { nullable: true })
    deletedAt: Date;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => String, { nullable: true })
    accessToken?: string

    /** From Agregation **/
    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[];

    @Field(() => [MeFollowed], { nullable: true })
    meFollowed?: MeFollowed[];

}



@ObjectType()
export class TotalCounter {
    @Field(() => Int, { nullable: true })
    total: number;
}

@ObjectType()
export class Members {
    @Field(() => [Member])
    list: Member[];

    @Field(() => [TotalCounter], { nullable: true })
    metaCounter: TotalCounter[];
}
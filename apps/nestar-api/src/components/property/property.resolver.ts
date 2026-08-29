import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from '../../libs/dto/property/property';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver()
export class PropertyResolver {
    constructor(private readonly propertyService: PropertyService) { };


    @Roles(MemberType.AGENT)
    @UseGuards(AuthGuard)
    @Mutation(() => Property)
    public async createProperty(
        @Args('input') input: PropertyInput,
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Property> {
        console.log('memberid: ', memberId)
        console.log("Mutation createProperty");
        input.memberId = memberId
        return await this.propertyService.createProperty(input);

    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Property)
    public async getProperty(
        @Args('propertyId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Property> {
        console.log('Query: getProperty');
        const propertyId = shapeIntoMongoObjectId(input);
        return await this.propertyService.getProperty(memberId, propertyId);
    }
}

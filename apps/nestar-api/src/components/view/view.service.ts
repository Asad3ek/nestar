import { Injectable } from '@nestjs/common';
import { View } from '../../libs/dto/view/view';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ViewInput } from '../../libs/dto/view/view.input';
import { T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';

@Injectable()
export class ViewService {
    constructor(@InjectModel("View") private readonly viewModel: Model<View>) { }

    public async recordView(input: ViewInput): Promise<View | null> {
        const viewExist = await this.checkViewExistence(input)
        if (!viewExist) {
            console.log('===>> NEW VIEW INSERT <<===')
            return await this.viewModel.create(input);
        } else
            return null
    }

    public async checkViewExistence(input: ViewInput): Promise<View> {
        const { memberId, viewRefId } = input;
        const search: T = {
            memberId: memberId,
            viewRefId: viewRefId,

        };

        return await this.viewModel.findOne(search).exec();
    }
}

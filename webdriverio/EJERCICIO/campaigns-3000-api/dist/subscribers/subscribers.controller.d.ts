import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { FilterSubscriberDto } from './dto/filter-subscriber.dto';
export declare class SubscribersController {
    private readonly subscribersService;
    constructor(subscribersService: SubscribersService);
    findAll(filters: FilterSubscriberDto): Promise<import("./entities/subscriber.entity").SubscriberEntity[]>;
    findOne(id: string): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    create(createSubscriberDto: CreateSubscriberDto): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    replace(id: string, updateData: CreateSubscriberDto): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    update(id: string, updateData: Partial<CreateSubscriberDto>): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    findByUser(userId: string): Promise<import("./entities/subscriber.entity").SubscriberEntity | undefined>;
    cancel(id: string): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    delete(id: string): Promise<void>;
}

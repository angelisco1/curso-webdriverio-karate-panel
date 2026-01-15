import { SubscribersRepository } from './subscribers.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { FilterSubscriberDto } from './dto/filter-subscriber.dto';
import { PaymentsService } from '../payments/payments.service';
export declare class SubscribersService {
    private readonly subscribersRepository;
    private readonly paymentsService;
    constructor(subscribersRepository: SubscribersRepository, paymentsService: PaymentsService);
    private calculatePrice;
    findAll(filters?: FilterSubscriberDto): Promise<import("./entities/subscriber.entity").SubscriberEntity[]>;
    findById(id: number): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    findByUserId(userId: number): Promise<import("./entities/subscriber.entity").SubscriberEntity | undefined>;
    create(createSubscriberDto: CreateSubscriberDto): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    update(id: number, updateData: Partial<CreateSubscriberDto>): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    cancel(id: number): Promise<import("./entities/subscriber.entity").SubscriberEntity>;
    delete(id: number): Promise<void>;
}

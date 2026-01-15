import { DatabaseService } from '../database/database.service';
import { PaymentEntity } from './entities/payment.entity';
export declare class PaymentsRepository {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    create(data: {
        subscriber_id: number;
        card_number: string;
        amount: number;
        status: string;
        error_message?: string;
    }): Promise<PaymentEntity>;
    findAll(): Promise<PaymentEntity[]>;
    findBySubscriberId(subscriberId: number): Promise<PaymentEntity[]>;
    findLastSuccessfulBySubscriberId(subscriberId: number): Promise<PaymentEntity | undefined>;
}

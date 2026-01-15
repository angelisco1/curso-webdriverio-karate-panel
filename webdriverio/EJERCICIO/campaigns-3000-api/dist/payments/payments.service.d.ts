import { PaymentsRepository } from './payments.repository';
import { ProcessPaymentDto } from './dto/process-payment.dto';
export declare class PaymentsService {
    private readonly paymentsRepository;
    constructor(paymentsRepository: PaymentsRepository);
    processPayment(processPaymentDto: ProcessPaymentDto): Promise<import("./entities/payment.entity").PaymentEntity>;
    findAll(): Promise<import("./entities/payment.entity").PaymentEntity[]>;
    findBySubscriberId(subscriberId: number): Promise<import("./entities/payment.entity").PaymentEntity[]>;
    getLastCardBySubscriberId(subscriberId: number): Promise<{
        last4: string;
    } | null>;
}

import { PaymentsService } from './payments.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    processPayment(processPaymentDto: ProcessPaymentDto): Promise<import("./entities/payment.entity").PaymentEntity>;
    findAll(): Promise<import("./entities/payment.entity").PaymentEntity[]>;
    findBySubscriberId(id: string): Promise<import("./entities/payment.entity").PaymentEntity[]>;
    getLastCard(id: string): Promise<{
        last4: string;
    } | null>;
}

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process')
  processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    return this.paymentsService.processPayment(processPaymentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscriber/:id')
  findBySubscriberId(@Param('id') id: string) {
    return this.paymentsService.findBySubscriberId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscriber/:id/card')
  getLastCard(@Param('id') id: string) {
    return this.paymentsService.getLastCardBySubscriberId(+id);
  }
}

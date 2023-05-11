import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  busInfo: any;
  @IsNotEmpty()
  payment: {
    cardNumber: string;
    cardHolder: string;
    ccv: number;
    expiryDate: string;
  };
}

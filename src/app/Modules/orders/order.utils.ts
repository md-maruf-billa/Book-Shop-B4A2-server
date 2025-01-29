import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

// const shurjopay = spfactory();
const shurjopay = new Shurjopay();

shurjopay.config(
    config.sp_endpoint!,
    config.sp_username!,
    config.sp_password!,
    config.sp_prefix!,
    config.sp_return_url!
);

const makePament = async (paymentPayload: any): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        shurjopay.makePayment(
            paymentPayload,
            response => resolve(response),
            error => reject(error)
        );
    });
};
const verifyPayment = async (
    orderId: string
): Promise<VerificationResponse[]> => {
    return new Promise((resolve, reject) => {
        shurjopay.verifyPayment(
            orderId,
            response => resolve(response),
            error => reject(error)
        );
    });
};

export const orderUtils = {
    makePament,
    verifyPayment
};

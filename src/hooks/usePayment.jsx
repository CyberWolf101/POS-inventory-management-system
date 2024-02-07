import { useState } from "react"
import { FlutterWaveButton, closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { useContext } from "react";
import { userContext } from "../contexts/userContext";

export const UsePayPOS = (price) => {
    const [loading, setLoading] = useState(false)
    const [userDetails, setuserDetails] = useContext(userContext)

    const config = {
        public_key: 'FLWPUBK_TEST-9e1c1976c9d84c22e48a4f6535575ad3-X',
        tx_ref: Date.now(),
        amount: price,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userDetails.email,
            phone_number: userDetails.phone,
            name: userDetails.name,
        },
        customizations: {
            title: 'Oshofree',
            description: 'seller membership',
            //   logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);


    return { handleFlutterPayment }
}
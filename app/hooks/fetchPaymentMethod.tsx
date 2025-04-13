type PaymentMethod = {
    id: string;
    icon?: string;
    name: string;
    isAllowed: boolean;
    isAvailable: boolean;
};

const paymentMethods: PaymentMethod[] = [
    {
        id: 'pos',
        icon: 'pay-on-service',
        name: 'Pay on Service',
        isAllowed: true,
        isAvailable: true,
    },
    {
        id: 'paypal',
        icon: 'paypal',
        name: 'PayPal',
        isAllowed: true,
        isAvailable: true,
    },
    
];

const getPaymentMethodById = (id: string): PaymentMethod | null => {
    const found = paymentMethods.find(method => method.id === id);
    return found ?? null;
};

export { PaymentMethod, paymentMethods, getPaymentMethodById };

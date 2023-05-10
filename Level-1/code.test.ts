import { validateOrder, Order, LineItem } from './code';

test('shows a valid and successful payment for a tv', () => {
    let tv: LineItem = {
        type: 'product',
        description: 'tv',
        amount: 1000.0,
        quantity: 1
    };

    let payment: LineItem = {
        type: 'payment',
        description: 'invoice_1',
        amount: 1000.0,
        quantity: 1
    }

    let order: Order = {
        id: '1',
        items: [tv, payment]
    }

    expect(validateOrder(order)).toBe('Order ID: 1 - Full payment received!');
})

test('successfully detects payment imbalance as tv was never paid', () => {
    let tv: LineItem = {
        type: 'product',
        description: 'tv',
        amount: 1000.0,
        quantity: 1
    };

    let order: Order = {
        id: '2',
        items: [tv]
    }

    expect(validateOrder(order)).toBe('Order ID: 2 - Payment imbalance: $-1000.00');
})


test('successfully reimburses client for a tv', () => {
    let tv: LineItem = {
        type: 'product',
        description: 'tv',
        amount: 1000.0,
        quantity: 1
    };

    let payment: LineItem = {
        type: 'payment',
        description: 'invoice_3',
        amount: 1000.0,
        quantity: 1
    };

    let reimbursement: LineItem = {
        type: 'payment',
        description: 'reimbursement_3',
        amount: -1000.0,
        quantity: 1
    };

    let order: Order = {
        id: '3',
        items: [tv, payment, reimbursement]
    }

    expect(validateOrder(order)).toBe('Order ID: 3 - Payment imbalance: $-1000.00');
})
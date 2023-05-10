
export interface Order {
    id: string;
    items: Array<LineItem>;
}

export interface LineItem {
    type: string;
    description: string;
    amount: number;
    quantity: number;
}

export const validateOrder = (order: Order) => {
    let net = 0;

    order.items.forEach((item) => {
        if(item.type == 'payment') {
            net += item.amount;
        }
        else if (item.type == 'product') {
            net -= item.amount * item.quantity;
        }
        else {
            return `Invalid item type: ${item.type}`;
        }
    })

    if (net != 0) {
        return `Order ID: ${order.id} - Payment imbalance: $${net.toFixed(2)}`;
    }
    else {
        return `Order ID: ${order.id} - Full payment received!`;
    }
}


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

const MAX_ITEM_AMOUNT = 10000;
const MAX_ITEM_QUANTITY = 1000;

export const validateOrder = (order: Order) => {
  let net = 0;

  for (let item of order.items) {
    // Add bounds checks for the item's amount and quantity attributes
    if (
      item.amount >= MAX_ITEM_AMOUNT ||
      item.amount < MAX_ITEM_AMOUNT * -1 ||
      item.quantity >= MAX_ITEM_QUANTITY ||
      item.quantity < 0
    ) {
      continue;
    }

    if (item.type == "payment") {
      net += item.amount;
    } else if (item.type == "product") {
      net -= item.amount * item.quantity;
    } else {
      return `Invalid item type: ${item.type}`;
    }
  }

  // Convert to fixed decimal places for comparison
  if (net.toFixed(2) != "0.00") {
    return `Order ID: ${order.id} - Payment imbalance: $${net.toFixed(2)}`;
  } else {
    return `Order ID: ${order.id} - Full payment received!`;
  }
};

/*
A floating-point underflow vulnerability.
https://en.wikipedia.org/wiki/Arithmetic_underflow

In hack.test.ts, the attacker tricked the system by supplying an extremely high
amount as a fake payment, immediately followed by a payment reversal.
The exploit passes a huge number, causing an underflow while subtracting the cost of purchased items, resulting in a zero net.

It's a good practice to limit your system input to an acceptable range instead
of accepting any value.

We also need to protect from a scenario where the attacker sends a huge number
of items, resulting in a huge net. We can do this by limiting all variables
to reasonable values.

In addition, using floating-point data types for calculations involving financial values
causes unexpected rounding and comparison errors as it cannot represent decimal numbers
with the precision we expect.

For example, running `0.1 + 0.2` in the Javascript console interpreter gives `0.30000000000000004` instead of 0.3.

To fix this we call `toFixed(2)` before comparing our net amount to the expected value.

*/

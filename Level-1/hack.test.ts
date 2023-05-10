import { validateOrder, Order, LineItem } from "./code";

test("Tricks the system and walks away with 1 television, despite valid payment & reimbursement", () => {
  let tv: LineItem = {
    type: "product",
    description: "tv",
    amount: 1000.0,
    quantity: 1,
  };

  let payment: LineItem = {
    type: "payment",
    description: "invoice_4",
    amount: 1e19,
    quantity: 1,
  };

  let reimbursement: LineItem = {
    type: "payment",
    description: "reimbursement_4",
    amount: -1e19,
    quantity: 1,
  };

  let order: Order = {
    id: "4",
    items: [tv, payment, reimbursement],
  };

  expect(validateOrder(order)).toBe(
    "Order ID: 4 - Payment imbalance: $-1000.00"
  );
});

test("Valid payments that should add up correctly, but do not", () => {
  let item: LineItem = {
    type: "product",
    description: "cheap",
    amount: 3.3,
    quantity: 1,
  };

  let payment_1: LineItem = {
    type: "payment",
    description: "partial payment",
    amount: 1.1,
    quantity: 1,
  };

  let payment_2: LineItem = {
    type: "payment",
    description: "partial payment",
    amount: 2.2,
    quantity: 1,
  };

  let order: Order = {
    id: "5",
    items: [item, payment_1, payment_2],
  };

  expect(validateOrder(order)).toBe("Order ID: 5 - Full payment received!");
});

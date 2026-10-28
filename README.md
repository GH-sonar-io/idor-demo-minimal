# payments-billing-service

REST API for customer invoices, orders and accounts.

## Running

    npm install
    JWT_SECRET=<secret> npm start

## Endpoints

| Method | Path                         | Description                  |
|--------|------------------------------|------------------------------|
| GET    | /api/accounts/:id            | Fetch account and balance    |
| GET    | /api/invoices/:id            | Fetch an invoice             |
| POST   | /api/orders/:id/coupon       | Apply a coupon to an order   |
| POST   | /api/orders/:id/fulfill      | Mark an order as fulfilled   |
| POST   | /api/admin/users/:id/promote | Grant a user the admin role  |

All endpoints require an `Authorization: Bearer <jwt>` header.

# Authentication

POST /api/auth/register
POST /api/auth/login

# Vehicle

GET /api/vehicles
GET /api/vehicles/<id>
POST /api/vehicles
PUT /api/vehicles/<id>
DELETE /api/vehicles/<id>

# Driver

GET /api/drivers
POST /api/drivers
PUT /api/drivers/<id>
DELETE /api/drivers/<id>

# Trip

GET /api/trips
POST /api/trips
POST /api/trips/<id>/dispatch
POST /api/trips/<id>/complete

# Maintenance

GET /api/maintenance
POST /api/maintenance

# Fuel

GET /api/fuel
POST /api/fuel

# Expense

GET /api/expenses
POST /api/expenses

# Dashboard

GET /api/dashboard
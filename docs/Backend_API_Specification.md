# TransitOps Backend API Specification

Version: 1.0

Backend: Flask + PostgreSQL

Frontend: React

Data Format: JSON

Authentication: JWT

Base URL:

http://localhost:5000/api

---

# 1. Authentication Module

## Purpose

Authenticate users before allowing access to the system.

---

## Database Fields

| Field | Type | Editable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Auto-generated User ID |
| name | String | Yes | Full Name |
| email | String | Yes | Unique Email Address |
| password | String | Yes | Encrypted Password |
| role | String | No | User Role |
| created_at | DateTime | No | Created Timestamp |
| updated_at | DateTime | No | Updated Timestamp |

---

## Roles

- Admin
- Fleet Manager
- Driver
- Safety Officer
- Financial Analyst

## Login API

### Endpoint

POST /api/auth/login

### Request Body

```json
{
  "email": "admin@transitops.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@transitops.com",
    "role": "Admin"
  }
}
```

Status Code

200 OK

### Failed Response

```json
{
  "success": false,
  "message": "Invalid Email or Password"
}
```

Status Code

401 Unauthorized

## Logout API

### Endpoint

POST /api/auth/logout

### Request

No Body

### Response

```json
{
  "success": true,
  "message": "Logout Successful"
}
```

## Get Current User

### Endpoint

GET /api/auth/profile

### Headers

Authorization: Bearer JWT_TOKEN

### Response

```json
{
  "id": 1,
  "name": "Admin",
  "email": "admin@transitops.com",
  "role": "Admin"
}
```

## Validation Rules

- Email is required.
- Email must be valid.
- Password is required.
- Password must contain at least 6 characters.

---

## Read Only Fields

- id
- role
- created_at
- updated_at

---

## Editable Fields

- name
- email
- password

---

# 2. Vehicle Module

## Purpose

Manage all fleet vehicles used in transportation operations.

---

## Database Fields

| Field | Type | Editable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Auto-generated Vehicle ID |
| registration_number | String | No | Unique Registration Number |
| vehicle_name | String | Yes | Vehicle Name |
| vehicle_model | String | Yes | Vehicle Model |
| vehicle_type | String | Yes | Truck / Van / Bus / Pickup |
| maximum_load_capacity | Float | Yes | Capacity in KG |
| odometer | Float | Yes | Current Odometer Reading |
| acquisition_cost | Float | Yes | Purchase Cost |
| status | Enum | No | Vehicle Status |
| created_at | DateTime | No | Created Timestamp |
| updated_at | DateTime | No | Updated Timestamp |

## Vehicle Status

- Available
- On Trip
- In Shop
- Retired

## Get All Vehicles

### Endpoint

GET /api/vehicles

### Response

```json
[
  {
    "id":1,
    "registration_number":"GJ01AB1234",
    "vehicle_name":"Truck A",
    "vehicle_model":"Tata 407",
    "vehicle_type":"Truck",
    "maximum_load_capacity":5000,
    "odometer":150000,
    "acquisition_cost":1200000,
    "status":"Available"
  }
]
```

## Get Vehicle By ID

### Endpoint

GET /api/vehicles/{id}

Example

GET /api/vehicles/1

## Create Vehicle

### Endpoint

POST /api/vehicles

### Request Body

```json
{
  "registration_number":"GJ01AB1234",
  "vehicle_name":"Truck A",
  "vehicle_model":"Tata 407",
  "vehicle_type":"Truck",
  "maximum_load_capacity":5000,
  "odometer":150000,
  "acquisition_cost":1200000
}
```

### Success Response

```json
{
  "success":true,
  "message":"Vehicle Created Successfully"
}
```

## Update Vehicle

### Endpoint

PUT /api/vehicles/{id}

Editable Fields

- vehicle_name
- vehicle_model
- vehicle_type
- maximum_load_capacity
- odometer
- acquisition_cost

Read Only Fields

- id
- registration_number
- status
- created_at
- updated_at

## Delete Vehicle

### Endpoint

DELETE /api/vehicles/{id}

### Success Response

```json
{
  "success":true,
  "message":"Vehicle Deleted Successfully"
}
```

## Validation Rules

- Registration Number is required.
- Registration Number must be unique.
- Vehicle Name is required.
- Capacity must be greater than 0.
- Acquisition Cost cannot be negative.
- Odometer cannot be negative.

## Error Responses

### Duplicate Registration Number

```json
{
  "success":false,
  "message":"Vehicle Registration Number Already Exists"
}
```

Status Code

409 Conflict

---

### Vehicle Not Found

```json
{
  "success":false,
  "message":"Vehicle Not Found"
}
```

Status Code

404 Not Found

## Frontend Notes

- Display status using colored badges.
  - Green → Available
  - Blue → On Trip
  - Orange → In Shop
  - Red → Retired

- Registration Number is displayed but cannot be edited.

- Show confirmation dialog before deleting a vehicle.

- Allow search by:
  - Registration Number
  - Vehicle Name
  - Vehicle Type
  - Status

- Allow sorting by:
  - Vehicle Name
  - Status
  - Odometer

  ---

# 3. Driver Module

## Purpose

Manage driver information, license details, availability, and assignments for transportation operations.

---

## Database Fields

| Field | Type | Editable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Auto-generated Driver ID |
| name | String | Yes | Driver Full Name |
| license_number | String | No | Unique Driving License Number |
| license_category | String | Yes | LMV / HMV / Transport |
| license_expiry | Date | Yes | License Expiry Date |
| contact_number | String | Yes | Driver Contact Number |
| safety_score | Integer | Yes | Safety Rating (0–100) |
| status | Enum | No | Driver Status |
| created_at | DateTime | No | Created Timestamp |
| updated_at | DateTime | No | Updated Timestamp |

## Driver Status

- Available
- On Trip
- Off Duty
- Suspended

## Get All Drivers

### Endpoint

GET /api/drivers

### Response

```json
[
  {
    "id":1,
    "name":"Rahul Patel",
    "license_number":"DL12345678",
    "license_category":"HMV",
    "license_expiry":"2028-06-15",
    "contact_number":"9876543210",
    "safety_score":95,
    "status":"Available"
  }
]
```

## Get Driver By ID

### Endpoint

GET /api/drivers/{id}

Example

GET /api/drivers/1

## Create Driver

### Endpoint

POST /api/drivers

### Request Body

```json
{
  "name":"Rahul Patel",
  "license_number":"DL12345678",
  "license_category":"HMV",
  "license_expiry":"2028-06-15",
  "contact_number":"9876543210",
  "safety_score":95
}
```

### Success Response

```json
{
  "success":true,
  "message":"Driver Created Successfully"
}
```

## Update Driver

### Endpoint

PUT /api/drivers/{id}

Editable Fields

- name
- license_category
- license_expiry
- contact_number
- safety_score

Read Only Fields

- id
- license_number
- status
- created_at
- updated_at

## Delete Driver

### Endpoint

DELETE /api/drivers/{id}

### Success Response

```json
{
  "success":true,
  "message":"Driver Deleted Successfully"
}
```

## Validation Rules

- Driver Name is required.
- License Number must be unique.
- License Expiry Date cannot be in the past.
- Contact Number must contain exactly 10 digits.
- Safety Score must be between 0 and 100.

## Error Responses

### Duplicate License Number

```json
{
  "success":false,
  "message":"License Number Already Exists"
}
```

Status Code

409 Conflict

---

### Driver Not Found

```json
{
  "success":false,
  "message":"Driver Not Found"
}
```

Status Code

404 Not Found

## Frontend Notes

- Display status using colored badges.
  - Green → Available
  - Blue → On Trip
  - Gray → Off Duty
  - Red → Suspended

- License Number should be displayed but not editable.

- Show a warning badge if the license expires within 30 days.

- Allow search by:
  - Driver Name
  - License Number
  - Contact Number
  - Status

- Allow sorting by:
  - Driver Name
  - Safety Score
  - License Expiry Date

---

# 4. Trip Module

## Purpose

Manage transportation trips by assigning vehicles and drivers, tracking trip progress, cargo, and operational status.

---

## Database Fields

| Field | Type | Editable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Auto-generated Trip ID |
| vehicle_id | Integer | Yes | Selected Vehicle ID |
| driver_id | Integer | Yes | Selected Driver ID |
| source | String | Yes | Pickup Location |
| destination | String | Yes | Delivery Location |
| cargo_weight | Float | Yes | Cargo Weight (KG) |
| planned_distance | Float | Yes | Planned Distance (KM) |
| actual_distance | Float | Yes | Actual Distance (KM) |
| revenue | Float | Yes | Revenue Earned |
| dispatch_time | DateTime | No | Dispatch Timestamp |
| completion_time | DateTime | No | Completion Timestamp |
| status | Enum | No | Current Trip Status |
| created_at | DateTime | No | Created Timestamp |
| updated_at | DateTime | No | Updated Timestamp |

## Trip Status

- Draft
- Dispatched
- In Progress
- Completed
- Cancelled

## Get All Trips

### Endpoint

GET /api/trips

### Response

```json
[
  {
    "id":1,
    "vehicle_id":2,
    "driver_id":5,
    "source":"Ahmedabad",
    "destination":"Surat",
    "cargo_weight":4500,
    "planned_distance":280,
    "actual_distance":0,
    "revenue":15000,
    "status":"Draft"
  }
]
```

## Get Trip By ID

### Endpoint

GET /api/trips/{id}

## Create Trip

### Endpoint

POST /api/trips

### Request Body

```json
{
  "vehicle_id":2,
  "driver_id":5,
  "source":"Ahmedabad",
  "destination":"Surat",
  "cargo_weight":4500,
  "planned_distance":280,
  "revenue":15000
}
```

### Success Response

```json
{
  "success":true,
  "message":"Trip Created Successfully"
}
```

## Update Trip

### Endpoint

PUT /api/trips/{id}

Editable Fields

- source
- destination
- cargo_weight
- planned_distance
- actual_distance
- revenue

Read Only Fields

- id
- vehicle_id (after dispatch)
- driver_id (after dispatch)
- dispatch_time
- completion_time
- status

## Delete Trip

### Endpoint

DELETE /api/trips/{id}

Allowed Only When Status = Draft

## Business Rules

Before Dispatch:

- Vehicle must be Available.
- Driver must be Available.
- Driver License must not be expired.
- Cargo Weight must not exceed Vehicle Capacity.

On Dispatch:

- Trip Status → Dispatched
- Vehicle Status → On Trip
- Driver Status → On Trip
- Dispatch Time is automatically recorded.

On Completion:

- Trip Status → Completed
- Vehicle Status → Available
- Driver Status → Available
- Completion Time is automatically recorded.

Cancelled Trip:

- Vehicle Status → Available
- Driver Status → Available

## Validation Rules

- Source is required.
- Destination is required.
- Source and Destination cannot be the same.
- Cargo Weight must be greater than 0.
- Planned Distance must be greater than 0.
- Revenue cannot be negative.

## Error Responses

Vehicle Already Assigned

```json
{
  "success":false,
  "message":"Selected Vehicle is already assigned to another trip."
}
```

Status Code

409 Conflict

---

Driver Already Assigned

```json
{
  "success":false,
  "message":"Selected Driver is already assigned to another trip."
}
```

Status Code

409 Conflict

---

Vehicle Capacity Exceeded

```json
{
  "success":false,
  "message":"Cargo weight exceeds vehicle capacity."
}
```

Status Code

400 Bad Request

---

Driver License Expired

```json
{
  "success":false,
  "message":"Driver license has expired."
}
```

Status Code

400 Bad Request

## Frontend Notes

- Vehicle dropdown should show only Available vehicles.
- Driver dropdown should show only Available drivers.
- Disable editing after the trip is dispatched.
- Display status using colored badges.
- Confirmation dialog before dispatching a trip.
- Confirmation dialog before completing a trip.
- Show dispatch and completion timestamps.

---

# 5. Maintenance Module

## Purpose

Track vehicle maintenance activities, repair history, maintenance costs, and vehicle availability.

---

## Database Fields

| Field | Type | Editable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Auto-generated Maintenance ID |
| vehicle_id | Integer | Yes | Selected Vehicle |
| maintenance_type | String | Yes | Preventive / Corrective / Emergency |
| description | String | Yes | Maintenance Details |
| priority | Enum | Yes | Low / Medium / High |
| cost | Float | Yes | Maintenance Cost |
| start_date | Date | Yes | Start Date |
| end_date | Date | Yes | End Date |
| status | Enum | No | Current Status |
| created_at | DateTime | No | Created Timestamp |
| updated_at | DateTime | No | Updated Timestamp |

## Maintenance Status

- Pending
- Approved
- In Progress
- Completed
- Rejected

## Get All Maintenance Records

### Endpoint

GET /api/maintenance

### Response

```json
[
  {
    "id":1,
    "vehicle_id":2,
    "maintenance_type":"Preventive",
    "description":"Engine Oil Change",
    "priority":"Medium",
    "cost":2500,
    "start_date":"2026-07-10",
    "end_date":"2026-07-11",
    "status":"Pending"
  }
]
```

## Get Maintenance By ID

### Endpoint

GET /api/maintenance/{id}

## Create Maintenance

### Endpoint

POST /api/maintenance

### Request Body

```json
{
  "vehicle_id":2,
  "maintenance_type":"Preventive",
  "description":"Engine Oil Change",
  "priority":"Medium",
  "cost":2500,
  "start_date":"2026-07-10",
  "end_date":"2026-07-11"
}
```

### Success Response

```json
{
  "success":true,
  "message":"Maintenance Record Created Successfully"
}
```

## Update Maintenance

### Endpoint

PUT /api/maintenance/{id}

Editable Fields

- maintenance_type
- description
- priority
- cost
- start_date
- end_date

Read Only Fields

- id
- vehicle_id
- status
- created_at
- updated_at

## Delete Maintenance

### Endpoint

DELETE /api/maintenance/{id}

Allowed only if Status = Pending

## Business Rules

When Maintenance is Approved:

- Vehicle Status → In Shop

When Maintenance Starts:

- Vehicle remains In Shop

When Maintenance Completes:

- Vehicle Status → Available

Rejected Maintenance:

- Vehicle Status remains unchanged

## Validation Rules

- Vehicle must exist.
- Maintenance Type is required.
- Cost cannot be negative.
- End Date cannot be earlier than Start Date.

## Error Responses

Vehicle Not Found

```json
{
  "success":false,
  "message":"Vehicle Not Found"
}
```

Status Code

404 Not Found

---

Invalid Date Range

```json
{
  "success":false,
  "message":"End Date cannot be before Start Date."
}
```

Status Code

400 Bad Request

## Frontend Notes

- Vehicle dropdown should show active vehicles.
- Use colored badges for maintenance status.
- Display maintenance cost with currency formatting.
- Disable delete option after maintenance is approved.
- Show maintenance history on the vehicle details page.

---

# 6. Fuel Module

## Purpose

Track fuel purchases for vehicles, calculate fuel efficiency, and monitor fuel expenses.

---

## Database Fields

| Field | Type | Editable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Auto-generated Fuel Log ID |
| vehicle_id | Integer | Yes | Selected Vehicle |
| trip_id | Integer | Yes | Related Trip |
| fuel_station | String | Yes | Fuel Station Name |
| liters | Float | Yes | Fuel Quantity |
| cost | Float | Yes | Total Fuel Cost |
| date | Date | Yes | Fuel Date |
| created_at | DateTime | No | Created Timestamp |
| updated_at | DateTime | No | Updated Timestamp |

## Get All Fuel Logs

### Endpoint

GET /api/fuel

### Response

```json
[
  {
    "id":1,
    "vehicle_id":2,
    "trip_id":5,
    "fuel_station":"Indian Oil",
    "liters":45,
    "cost":4800,
    "date":"2026-07-11"
  }
]
```

## Get Fuel Log By ID

### Endpoint

GET /api/fuel/{id}

## Create Fuel Log

### Endpoint

POST /api/fuel

### Request Body

```json
{
  "vehicle_id":2,
  "trip_id":5,
  "fuel_station":"Indian Oil",
  "liters":45,
  "cost":4800,
  "date":"2026-07-11"
}
```

### Success Response

```json
{
  "success":true,
  "message":"Fuel Log Added Successfully"
}
```

## Update Fuel Log

### Endpoint

PUT /api/fuel/{id}

Editable Fields

- fuel_station
- liters
- cost
- date

Read Only Fields

- id
- vehicle_id
- trip_id
- created_at
- updated_at

## Delete Fuel Log

### Endpoint

DELETE /api/fuel/{id}

## Validation Rules

- Vehicle must exist.
- Trip must exist.
- Liters must be greater than 0.
- Cost must be greater than 0.
- Date cannot be in the future.

## Error Responses

Vehicle Not Found

```json
{
  "success":false,
  "message":"Vehicle Not Found"
}
```

Status Code

404 Not Found

---

Trip Not Found

```json
{
  "success":false,
  "message":"Trip Not Found"
}
```

Status Code

404 Not Found

## Frontend Notes

- Vehicle dropdown should load from Vehicle API.
- Trip dropdown should load from Trip API.
- Display fuel cost with currency formatting.
- Allow sorting by:
  - Date
  - Cost
  - Liters
- Allow filtering by vehicle and date.

---

# 7. Expense Module

## Purpose

Track all operational expenses related to vehicles and trips, including fuel, maintenance, tolls, insurance, and miscellaneous costs.

---

## Database Fields

| Field | Type | Editable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Auto-generated Expense ID |
| vehicle_id | Integer | Yes | Selected Vehicle |
| trip_id | Integer | Yes | Related Trip (Optional) |
| expense_type | Enum | Yes | Expense Category |
| amount | Float | Yes | Expense Amount |
| description | String | Yes | Expense Description |
| expense_date | Date | Yes | Date of Expense |
| created_at | DateTime | No | Created Timestamp |
| updated_at | DateTime | No | Updated Timestamp |

---

## Expense Types

- Fuel
- Maintenance
- Toll
- Insurance
- Repair
- Parking
- Other

---

## Get All Expenses

### Endpoint

GET /api/expenses

### Response

```json
[
  {
    "id":1,
    "vehicle_id":2,
    "trip_id":5,
    "expense_type":"Toll",
    "amount":750,
    "description":"National Highway Toll",
    "expense_date":"2026-07-11"
  }
]
```

---

## Get Expense By ID

### Endpoint

GET /api/expenses/{id}

Example

GET /api/expenses/1

---

## Create Expense

### Endpoint

POST /api/expenses

### Request Body

```json
{
  "vehicle_id":2,
  "trip_id":5,
  "expense_type":"Toll",
  "amount":750,
  "description":"National Highway Toll",
  "expense_date":"2026-07-11"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Expense Added Successfully"
}
```

Status Code

201 Created

---

## Update Expense

### Endpoint

PUT /api/expenses/{id}

Editable Fields

- expense_type
- amount
- description
- expense_date

Read Only Fields

- id
- vehicle_id
- trip_id
- created_at
- updated_at

---

## Delete Expense

### Endpoint

DELETE /api/expenses/{id}

### Success Response

```json
{
  "success": true,
  "message": "Expense Deleted Successfully"
}
```

Status Code

200 OK

---

## Validation Rules

- Vehicle must exist.
- Amount must be greater than 0.
- Expense Type is required.
- Expense Date cannot be in the future.
- Description cannot be empty.

---

## Error Responses

### Vehicle Not Found

```json
{
  "success": false,
  "message": "Vehicle Not Found"
}
```

Status Code

404 Not Found

---

### Invalid Amount

```json
{
  "success": false,
  "message": "Expense amount must be greater than zero."
}
```

Status Code

400 Bad Request

---

## Frontend Notes

- Load vehicle dropdown using Vehicle API.
- Load trip dropdown using Trip API.
- Display amount using currency formatting.
- Allow filtering by:
  - Expense Type
  - Vehicle
  - Date
- Allow sorting by:
  - Expense Date
  - Amount
  - Expense Type
- Show total expenses at the bottom of the table.

---

# 8. Dashboard Module

## Purpose

Provide real-time operational statistics, KPIs, charts, and recent activity for fleet management.

---

## Dashboard KPIs

The dashboard should display the following summary cards:

- Total Vehicles
- Available Vehicles
- Vehicles On Trip
- Vehicles In Maintenance
- Total Drivers
- Drivers Available
- Active Trips
- Completed Trips
- Total Fuel Cost
- Total Maintenance Cost
- Total Operational Expenses
- Fleet Utilization (%)

---

## Get Dashboard Summary

### Endpoint

GET /api/dashboard

### Response

```json
{
  "total_vehicles": 20,
  "available_vehicles": 12,
  "vehicles_on_trip": 6,
  "vehicles_in_maintenance": 2,

  "total_drivers": 18,
  "available_drivers": 10,

  "active_trips": 6,
  "completed_trips": 152,

  "total_fuel_cost": 245000,
  "total_maintenance_cost": 120000,
  "total_operational_expenses": 420000,

  "fleet_utilization": 70
}
```

Status Code

200 OK

---

## Fleet Status Chart

### Endpoint

GET /api/dashboard/fleet-status

### Response

```json
{
  "available":12,
  "on_trip":6,
  "maintenance":2
}
```

Recommended Chart

- Pie Chart
- Doughnut Chart

---

## Trip Statistics

### Endpoint

GET /api/dashboard/trips

### Response

```json
{
  "draft":4,
  "dispatched":5,
  "in_progress":2,
  "completed":150,
  "cancelled":3
}
```

Recommended Chart

- Bar Chart

---

## Expense Breakdown

### Endpoint

GET /api/dashboard/expenses

### Response

```json
{
  "fuel":180000,
  "maintenance":120000,
  "insurance":45000,
  "toll":30000,
  "other":45000
}
```

Recommended Chart

- Pie Chart

---

## Monthly Revenue

### Endpoint

GET /api/dashboard/revenue

### Response

```json
[
  {
    "month":"January",
    "revenue":320000
  },
  {
    "month":"February",
    "revenue":410000
  },
  {
    "month":"March",
    "revenue":390000
  }
]
```

Recommended Chart

- Line Chart

---

## Recent Trips

### Endpoint

GET /api/dashboard/recent-trips

### Response

```json
[
  {
    "trip_id":45,
    "vehicle":"Truck A",
    "driver":"Rahul Patel",
    "status":"Completed",
    "destination":"Surat"
  },
  {
    "trip_id":46,
    "vehicle":"Van B",
    "driver":"Amit Shah",
    "status":"In Progress",
    "destination":"Vadodara"
  }
]
```

---

## Upcoming Maintenance

### Endpoint

GET /api/dashboard/upcoming-maintenance

### Response

```json
[
  {
    "vehicle":"Truck A",
    "maintenance_type":"Oil Change",
    "scheduled_date":"2026-07-18"
  }
]
```

---

## Low Fuel Alerts (Bonus)

### Endpoint

GET /api/dashboard/fuel-alerts

### Response

```json
[
  {
    "vehicle":"Truck A",
    "fuel_percentage":15
  }
]
```

---

## Expiring Licenses (Bonus)

### Endpoint

GET /api/dashboard/license-alerts

### Response

```json
[
  {
    "driver":"Rahul Patel",
    "expiry_date":"2026-08-01"
  }
]
```

---

## Frontend Notes

- Dashboard loads immediately after login.
- Fetch all dashboard APIs asynchronously.
- Display loading skeletons while data loads.
- Refresh dashboard every 60 seconds.
- Use:
  - KPI Cards
  - Pie Charts
  - Line Charts
  - Bar Charts
  - Tables
- Color Code:
  - Green → Available
  - Blue → On Trip
  - Orange → Maintenance
  - Red → Critical Alerts
- Show "Last Updated" timestamp.

---

# 9. Reports Module

## Purpose

Generate analytical reports to help administrators monitor fleet performance, operational costs, fuel consumption, maintenance history, and profitability.

---

## Available Reports

- Fleet Utilization Report
- Vehicle Report
- Driver Report
- Trip Report
- Fuel Consumption Report
- Fuel Efficiency Report
- Maintenance Report
- Expense Report
- Revenue Report
- ROI Report

---

## Fleet Utilization Report

### Endpoint

GET /api/reports/fleet-utilization

### Response

```json
{
  "total_vehicles":20,
  "active_vehicles":14,
  "idle_vehicles":4,
  "maintenance_vehicles":2,
  "fleet_utilization":70
}
```

Status Code

200 OK

---

## Vehicle Report

### Endpoint

GET /api/reports/vehicles

### Response

```json
[
  {
    "vehicle":"Truck A",
    "status":"Available",
    "total_trips":45,
    "total_distance":13500,
    "maintenance_cost":45000
  }
]
```

---

## Driver Report

### Endpoint

GET /api/reports/drivers

### Response

```json
[
  {
    "driver":"Rahul Patel",
    "completed_trips":85,
    "safety_score":96,
    "status":"Available"
  }
]
```

---

## Trip Report

### Endpoint

GET /api/reports/trips

### Query Parameters (Optional)

status

vehicle_id

driver_id

start_date

end_date

### Example

GET /api/reports/trips?status=Completed

---

## Fuel Consumption Report

### Endpoint

GET /api/reports/fuel

### Response

```json
[
  {
    "vehicle":"Truck A",
    "fuel_cost":45000,
    "liters":420
  }
]
```

---

## Fuel Efficiency Report

### Endpoint

GET /api/reports/fuel-efficiency

### Response

```json
[
  {
    "vehicle":"Truck A",
    "distance":2500,
    "fuel_used":240,
    "efficiency":10.41
  }
]
```

Efficiency Unit

KM/L

---

## Maintenance Report

### Endpoint

GET /api/reports/maintenance

### Response

```json
[
  {
    "vehicle":"Truck A",
    "maintenance_count":4,
    "maintenance_cost":42000
  }
]
```

---

## Expense Report

### Endpoint

GET /api/reports/expenses

### Response

```json
[
  {
    "expense_type":"Fuel",
    "total_amount":250000
  },
  {
    "expense_type":"Maintenance",
    "total_amount":180000
  }
]
```

---

## Revenue Report

### Endpoint

GET /api/reports/revenue

### Response

```json
{
  "total_revenue":1450000,
  "total_expense":980000,
  "net_profit":470000
}
```

---

## ROI Report

### Endpoint

GET /api/reports/roi

### Response

```json
{
  "investment":4500000,
  "profit":470000,
  "roi_percentage":10.44
}
```

---

## Export Report as CSV

### Endpoint

GET /api/reports/export/csv

### Query Parameters

report

### Example

GET /api/reports/export/csv?report=expenses

### Response

CSV File Download

---

## Export Report as PDF

### Endpoint

GET /api/reports/export/pdf

### Query Parameters

report

### Example

GET /api/reports/export/pdf?report=fuel

### Response

PDF File Download

---

## Validation Rules

- Report name must be valid.
- Date range must be valid.
- Start Date cannot be greater than End Date.
- Unknown report names return an error.

---

## Error Responses

Invalid Report

```json
{
  "success":false,
  "message":"Invalid Report Type"
}
```

Status Code

400 Bad Request

---

Invalid Date Range

```json
{
  "success":false,
  "message":"Invalid Date Range"
}
```

Status Code

400 Bad Request

---

## Frontend Notes

- Allow filtering reports by:
  - Vehicle
  - Driver
  - Status
  - Date Range

- Provide Export buttons:
  - Export CSV
  - Export PDF

- Show loading spinner while generating reports.

- Display "No Data Found" if the report is empty.

- Use tables for detailed reports.

- Use charts where applicable.

- Show summary statistics at the top of every report page.

---

# Common API Response Format

## Success

```json
{
  "success": true,
  "message": "Operation Successful",
  "data": {}
}
```

---

## Validation Error

```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": {
    "field_name": "Error message"
  }
}
```

---

## Server Error

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

Status Code

500 Internal Server Error

---

# Standard HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |


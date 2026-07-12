# TransitOps Database Schema

Version: 1.0

Database: PostgreSQL

---

# Entity Relationship Diagram

User
│
├────────────┐
│            │
▼            ▼

Driver      Vehicle
     \      /
      \    /
       ▼  ▼

        Trip
       / | \
      /  |  \
     ▼   ▼   ▼

 Fuel  Expense  Maintenance

Vehicle
│
▼

VehicleDocument

---

# Table: users

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK, Auto Increment |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE |
| password | VARCHAR(255) | NOT NULL |
| role | ENUM | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Relationships

One User can manage many records.

---

# Table: vehicles

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK |
| registration_number | VARCHAR(30) | UNIQUE |
| vehicle_name | VARCHAR(100) | NOT NULL |
| vehicle_model | VARCHAR(100) | NOT NULL |
| vehicle_type | VARCHAR(50) | NOT NULL |
| maximum_load_capacity | FLOAT | NOT NULL |
| odometer | FLOAT | DEFAULT 0 |
| acquisition_cost | FLOAT | NOT NULL |
| status | ENUM | DEFAULT 'Available' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Relationships

Vehicle

1 → Many Trips

1 → Many Fuel Logs

1 → Many Maintenance

1 → Many Expenses

1 → Many Documents

---

# Table: drivers

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK |
| name | VARCHAR(100) | NOT NULL |
| license_number | VARCHAR(50) | UNIQUE |
| license_category | VARCHAR(50) | NOT NULL |
| license_expiry | DATE | NOT NULL |
| contact_number | VARCHAR(15) | NOT NULL |
| safety_score | INTEGER | DEFAULT 100 |
| status | ENUM | DEFAULT 'Available' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Relationships

Driver

1 → Many Trips

---

# Table: trips

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK |
| vehicle_id | Integer | FK → vehicles.id |
| driver_id | Integer | FK → drivers.id |
| source | VARCHAR(100) | NOT NULL |
| destination | VARCHAR(100) | NOT NULL |
| cargo_weight | FLOAT | NOT NULL |
| planned_distance | FLOAT | NOT NULL |
| actual_distance | FLOAT | DEFAULT 0 |
| revenue | FLOAT | DEFAULT 0 |
| dispatch_time | TIMESTAMP | NULL |
| completion_time | TIMESTAMP | NULL |
| status | ENUM | DEFAULT 'Draft' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Relationships

Trip

Many → One Vehicle

Many → One Driver

1 → Many Fuel Logs

1 → Many Expenses

---

# Table: maintenance

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK |
| vehicle_id | Integer | FK |
| maintenance_type | VARCHAR(50) | NOT NULL |
| description | TEXT | |
| priority | ENUM | |
| cost | FLOAT | DEFAULT 0 |
| start_date | DATE | |
| end_date | DATE | |
| status | ENUM | DEFAULT 'Pending' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

# Table: fuel_logs

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK |
| vehicle_id | Integer | FK |
| trip_id | Integer | FK |
| fuel_station | VARCHAR(100) | |
| liters | FLOAT | NOT NULL |
| cost | FLOAT | NOT NULL |
| date | DATE | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

# Table: expenses

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK |
| vehicle_id | Integer | FK |
| trip_id | Integer | FK |
| expense_type | ENUM | |
| amount | FLOAT | NOT NULL |
| description | TEXT | |
| expense_date | DATE | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

# Table: vehicle_documents

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PK |
| vehicle_id | Integer | FK |
| document_name | VARCHAR(100) | |
| document_type | VARCHAR(50) | |
| file_path | VARCHAR(255) | |
| expiry_date | DATE | |
| uploaded_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

# Status Enums

Vehicle Status

- Available
- On Trip
- In Shop
- Retired

Driver Status

- Available
- On Trip
- Off Duty
- Suspended

Trip Status

- Draft
- Dispatched
- In Progress
- Completed
- Cancelled

Maintenance Status

- Pending
- Approved
- In Progress
- Completed
- Rejected

Expense Types

- Fuel
- Maintenance
- Toll
- Insurance
- Repair
- Parking
- Other

---

# Business Rules

Vehicle

- Registration Number must be unique.
- Vehicle cannot be dispatched if status ≠ Available.

Driver

- License Number must be unique.
- License must not be expired.

Trip

- Vehicle must be Available.
- Driver must be Available.
- Cargo Weight ≤ Vehicle Capacity.
- Source ≠ Destination.

Maintenance

- Approved Maintenance → Vehicle Status = In Shop.
- Completed Maintenance → Vehicle Status = Available.

Fuel

- Vehicle must exist.
- Trip must exist.

Expense

- Amount > 0.

---

# Indexes

Create indexes on:

- registration_number
- license_number
- vehicle_id
- driver_id
- trip_id
- status
- expense_date
- created_at
from enum import Enum


# ===========================
# Vehicle Status
# ===========================

class VehicleStatus(Enum):
    AVAILABLE = "Available"
    ON_TRIP = "On Trip"
    IN_SHOP = "In Shop"
    RETIRED = "Retired"


# ===========================
# Driver Status
# ===========================

class DriverStatus(Enum):
    AVAILABLE = "Available"
    ON_TRIP = "On Trip"
    OFF_DUTY = "Off Duty"
    SUSPENDED = "Suspended"


# ===========================
# Trip Status
# ===========================

class TripStatus(Enum):
    DRAFT = "Draft"
    DISPATCHED = "Dispatched"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


# ===========================
# Maintenance Status
# ===========================

class MaintenanceStatus(Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    REJECTED = "Rejected"


# ===========================
# Maintenance Priority
# ===========================

class MaintenancePriority(Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


# ===========================
# Expense Type
# ===========================

class ExpenseType(Enum):
    FUEL = "Fuel"
    MAINTENANCE = "Maintenance"
    TOLL = "Toll"
    INSURANCE = "Insurance"
    REPAIR = "Repair"
    PARKING = "Parking"
    OTHER = "Other"


# ===========================
# User Roles
# ===========================

class UserRole(Enum):
    ADMIN = "Admin"
    FLEET_MANAGER = "Fleet Manager"
    DRIVER = "Driver"
    SAFETY_OFFICER = "Safety Officer"
    FINANCIAL_ANALYST = "Financial Analyst"
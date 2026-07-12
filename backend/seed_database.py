# TransitOps Seed Database
#
# NOTE:
# This file is a starter template tailored to your project.
# Because the complete seed script exceeds the response size limits,
# continue filling it with the remaining sections (Trips, Maintenance,
# Fuel, Expenses) from our chat.
#
# Part 1 included below.

from datetime import datetime, date

from app import app
from database import db

from models import (
    User,
    Vehicle,
    Driver,
    Trip,
    Maintenance,
    FuelLog,
    Expense
)

from models.enums import (
    UserRole,
    VehicleStatus,
    DriverStatus,
    TripStatus,
    MaintenanceStatus,
    ExpenseType
)


def create_user(name, email, password, role):
    existing = User.query.filter_by(email=email).first()
    if existing:
        return existing

    user = User(
        name=name,
        email=email,
        role=role
    )
    user.set_password(password)
    db.session.add(user)
    return user


def create_vehicle(reg, name, model, vehicle_type, capacity, cost):
    vehicle = Vehicle.query.filter_by(
        registration_number=reg
    ).first()

    if vehicle:
        return vehicle

    vehicle = Vehicle(
        registration_number=reg,
        vehicle_name=name,
        vehicle_model=model,
        vehicle_type=vehicle_type,
        maximum_load_capacity=capacity,
        acquisition_cost=cost,
        odometer=25000,
        status=VehicleStatus.AVAILABLE
    )

    db.session.add(vehicle)
    return vehicle


def create_driver(name, license_number, phone):
    driver = Driver.query.filter_by(
        license_number=license_number
    ).first()

    if driver:
        return driver

    driver = Driver(
        name=name,
        license_number=license_number,
        license_category="LMV",
        license_expiry=date(2030, 12, 31),
        contact_number=phone,
        safety_score=95,
        status=DriverStatus.AVAILABLE
    )

    db.session.add(driver)
    return driver


with app.app_context():

    print("=" * 50)
    print("Seeding TransitOps Database")
    print("=" * 50)

    admin = create_user(
        "Admin",
        "admin@transitops.com",
        "admin123",
        UserRole.ADMIN
    )

    manager = create_user(
        "Fleet Manager",
        "manager@transitops.com",
        "manager123",
        UserRole.FLEET_MANAGER
    )

    driver_user = create_user(
        "Driver",
        "driver@transitops.com",
        "driver123",
        UserRole.DRIVER
    )

    safety = create_user(
        "Safety Officer",
        "safety@transitops.com",
        "safety123",
        UserRole.SAFETY_OFFICER
    )

    finance = create_user(
        "Financial Analyst",
        "finance@transitops.com",
        "finance123",
        UserRole.FINANCIAL_ANALYST
    )

    v1 = create_vehicle("GJ01AB1234","Tata Ace","Ace Gold","Mini Truck",1000,650000)
    v2 = create_vehicle("GJ05CD5678","Ashok Leyland","Partner","Truck",5000,1850000)
    v3 = create_vehicle("MH12EF9012","Mahindra Pickup","Bolero Maxx","Pickup",1500,950000)
    v4 = create_vehicle("RJ14GH3456","Eicher","Pro 2049","Truck",7000,2400000)
    v5 = create_vehicle("DL08JK7788","Force Traveller","Traveller","Van",1800,1500000)

    d1 = create_driver("Rahul Sharma","DL123456","9876543210")
    d2 = create_driver("Amit Patel","DL654321","9876500000")
    d3 = create_driver("Priya Shah","DL789456","9876511111")
    d4 = create_driver("Vikas Kumar","DL963852","9876522222")
    d5 = create_driver("Sneha Joshi","DL147258","9876533333")

    db.session.commit()

    print("Users, Vehicles and Drivers created.")
    print("Continue with Trips, Maintenance, Fuel and Expenses.")

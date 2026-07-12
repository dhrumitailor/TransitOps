from sqlalchemy import func

from database import db
from models import (
    Vehicle,
    Driver,
    Trip,
    FuelLog,
    Expense,
)
from models.enums import VehicleStatus, TripStatus


class DashboardService:

    @staticmethod
    def get_dashboard():

        total_vehicles = Vehicle.query.count()

        available_vehicles = Vehicle.query.filter(
            Vehicle.status == VehicleStatus.AVAILABLE
        ).count()

        on_trip = Vehicle.query.filter(
            Vehicle.status == VehicleStatus.ON_TRIP
        ).count()

        maintenance = Vehicle.query.filter(
            Vehicle.status == VehicleStatus.IN_SHOP
        ).count()

        total_drivers = Driver.query.count()

        total_trips = Trip.query.count()

        completed_trips = Trip.query.filter(
            Trip.status == TripStatus.COMPLETED
        ).count()

        fuel_cost = db.session.query(
            func.sum(FuelLog.cost)
        ).scalar() or 0

        expense = db.session.query(
            func.sum(Expense.amount)
        ).scalar() or 0

        revenue = db.session.query(
            func.sum(Trip.revenue)
        ).scalar() or 0

        return {

            "total_vehicles": total_vehicles,
            "available_vehicles": available_vehicles,
            "vehicles_on_trip": on_trip,
            "vehicles_in_maintenance": maintenance,

            "total_drivers": total_drivers,

            "total_trips": total_trips,
            "completed_trips": completed_trips,

            "total_fuel_cost": fuel_cost,
            "total_expenses": expense,
            "total_revenue": revenue,
            "profit": revenue - expense - fuel_cost
        }
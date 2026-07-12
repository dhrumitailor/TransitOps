# from sqlalchemy import func

# from database import db
# from models import (
#     Vehicle,
#     Driver,
#     Trip,
#     FuelLog,
#     Expense,
# )
# from models.enums import VehicleStatus, TripStatus


# class DashboardService:

#     @staticmethod
#     def get_dashboard():

#         total_vehicles = Vehicle.query.count()

#         available_vehicles = Vehicle.query.filter(
#             Vehicle.status == VehicleStatus.AVAILABLE
#         ).count()

#         on_trip = Vehicle.query.filter(
#             Vehicle.status == VehicleStatus.ON_TRIP
#         ).count()

#         maintenance = Vehicle.query.filter(
#             Vehicle.status == VehicleStatus.IN_SHOP
#         ).count()

#         total_drivers = Driver.query.count()

#         total_trips = Trip.query.count()

#         completed_trips = Trip.query.filter(
#             Trip.status == TripStatus.COMPLETED
#         ).count()

#         fuel_cost = db.session.query(
#             func.sum(FuelLog.cost)
#         ).scalar() or 0

#         expense = db.session.query(
#             func.sum(Expense.amount)
#         ).scalar() or 0

#         revenue = db.session.query(
#             func.sum(Trip.revenue)
#         ).scalar() or 0

#         return {

#             "total_vehicles": total_vehicles,
#             "available_vehicles": available_vehicles,
#             "vehicles_on_trip": on_trip,
#             "vehicles_in_maintenance": maintenance,

#             "total_drivers": total_drivers,

#             "total_trips": total_trips,
#             "completed_trips": completed_trips,

#             "total_fuel_cost": fuel_cost,
#             "total_expenses": expense,
#             "total_revenue": revenue,
#             "profit": revenue - expense - fuel_cost
#         }
from sqlalchemy import func

from database import db
from models import (
    Vehicle,
    Driver,
    Trip,
    FuelLog,
    Expense,
)
from models.enums import (
    VehicleStatus,
    TripStatus,
    DriverStatus
)


class DashboardService:

    @staticmethod
    def get_dashboard():

        # -----------------------------
        # Vehicle KPIs
        # -----------------------------
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

        # -----------------------------
        # Driver KPIs
        # -----------------------------
        total_drivers = Driver.query.count()

        drivers_on_duty = Driver.query.filter(
            Driver.status == DriverStatus.ON_TRIP
        ).count()

        # -----------------------------
        # Trip KPIs
        # -----------------------------
        total_trips = Trip.query.count()

        completed_trips = Trip.query.filter(
            Trip.status == TripStatus.COMPLETED
        ).count()

        active_trips = Trip.query.filter(
            Trip.status.in_([
                TripStatus.DISPATCHED,
                TripStatus.IN_PROGRESS
            ])
        ).count()

        pending_trips = Trip.query.filter(
            Trip.status == TripStatus.SCHEDULED
        ).count()

        # -----------------------------
        # Financial KPIs
        # -----------------------------
        fuel_cost = db.session.query(
            func.sum(FuelLog.cost)
        ).scalar() or 0

        expense = db.session.query(
            func.sum(Expense.amount)
        ).scalar() or 0

        revenue = db.session.query(
            func.sum(Trip.revenue)
        ).scalar() or 0

        profit = revenue - expense - fuel_cost

        # -----------------------------
        # Fleet Utilization
        # -----------------------------
        if total_vehicles > 0:
            fleet_utilization = round(
                (on_trip / total_vehicles) * 100,
                2
            )
        else:
            fleet_utilization = 0

        # -----------------------------
        # Response
        # -----------------------------
        return {

            "total_vehicles": total_vehicles,
            "available_vehicles": available_vehicles,
            "vehicles_on_trip": on_trip,
            "vehicles_in_maintenance": maintenance,

            "total_drivers": total_drivers,
            "drivers_on_duty": drivers_on_duty,

            "total_trips": total_trips,
            "active_trips": active_trips,
            "pending_trips": pending_trips,
            "completed_trips": completed_trips,

            "total_fuel_cost": fuel_cost,
            "total_expenses": expense,
            "total_revenue": revenue,
            "profit": profit,

            "fleet_utilization": fleet_utilization
        }
import csv
import io

from sqlalchemy import func

from database import db
from models import (
    Vehicle,
    Trip,
    FuelLog,
    Expense
)
from models.enums import VehicleStatus


class ReportsService:

    @staticmethod
    def get_report():

        total_vehicles = Vehicle.query.count()

        vehicles_on_trip = Vehicle.query.filter(
            Vehicle.status == VehicleStatus.ON_TRIP
        ).count()

        fleet_utilization = (
            (vehicles_on_trip / total_vehicles) * 100
            if total_vehicles > 0 else 0
        )

        total_distance = db.session.query(
            func.sum(Trip.planned_distance)
        ).scalar() or 0

        total_liters = db.session.query(
            func.sum(FuelLog.liters)
        ).scalar() or 0

        fuel_efficiency = (
            total_distance / total_liters
            if total_liters > 0 else 0
        )

        total_fuel_cost = db.session.query(
            func.sum(FuelLog.cost)
        ).scalar() or 0

        total_expenses = db.session.query(
            func.sum(Expense.amount)
        ).scalar() or 0

        operational_cost = total_fuel_cost + total_expenses

        total_revenue = db.session.query(
            func.sum(Trip.revenue)
        ).scalar() or 0

        roi = (
            ((total_revenue - operational_cost) / operational_cost) * 100
            if operational_cost > 0 else 0
        )

        return {
            "fleet_utilization": round(fleet_utilization, 2),
            "fuel_efficiency": round(fuel_efficiency, 2),
            "operational_cost": round(operational_cost, 2),
            "roi": round(roi, 2),
            "total_revenue": round(total_revenue, 2),
            "total_expenses": round(total_expenses, 2),
            "total_fuel_cost": round(total_fuel_cost, 2)
        }

    @staticmethod
    def export_csv():

        report = ReportsService.get_report()

        output = io.StringIO()

        writer = csv.writer(output)

        writer.writerow([
            "Metric",
            "Value"
        ])

        for key, value in report.items():
            writer.writerow([key, value])

        return output.getvalue()
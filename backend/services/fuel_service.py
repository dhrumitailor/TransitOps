from datetime import datetime

from database import db
from models.fuel import FuelLog


class FuelService:

    @staticmethod
    def get_all():
        return FuelLog.query.all()

    @staticmethod
    def get_by_id(fuel_id):
        return FuelLog.query.get(fuel_id)

    @staticmethod
    def create(data):

        fuel = FuelLog(
            vehicle_id=data["vehicle_id"],
            trip_id=data.get("trip_id"),
            fuel_date=datetime.strptime(
                data["fuel_date"],
                "%Y-%m-%d"
            ).date(),
            liters=data["liters"],
            price_per_liter=data["price_per_liter"],
            cost=data["cost"],
            odometer=data["odometer"],
            fuel_station=data.get("fuel_station", "")
        )

        db.session.add(fuel)
        db.session.commit()

        return fuel

    @staticmethod
    def delete(fuel):

        db.session.delete(fuel)
        db.session.commit()
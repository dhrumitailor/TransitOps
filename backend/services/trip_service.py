from datetime import datetime

from database import db
from models.trip import Trip
from models.vehicle import Vehicle
from models.driver import Driver
from models.enums import VehicleStatus, DriverStatus, TripStatus


class TripService:

    @staticmethod
    def get_all():
        return Trip.query.all()

    @staticmethod
    def get_by_id(trip_id):
        return Trip.query.get(trip_id)

    @staticmethod
    def create(data):

        vehicle = Vehicle.query.get(data["vehicle_id"])

        if vehicle is None:
            raise ValueError("Vehicle not found.")

        driver = Driver.query.get(data["driver_id"])

        if driver is None:
            raise ValueError("Driver not found.")

        if vehicle.status != VehicleStatus.AVAILABLE:
            raise ValueError("Vehicle is already assigned.")

        if driver.status != DriverStatus.AVAILABLE:
            raise ValueError("Driver is already assigned.")

        trip = Trip(
            vehicle_id=data["vehicle_id"],
            driver_id=data["driver_id"],
            source=data["source"],
            destination=data["destination"],
            cargo_weight=data["cargo_weight"],
            planned_distance=data["planned_distance"],
            revenue=data.get("revenue", 0),
            remarks=data.get("remarks", "")
        )

        db.session.add(trip)
        db.session.commit()

        return trip

    @staticmethod
    def dispatch(trip):

        if trip.status != TripStatus.SCHEDULED:
            raise ValueError("Trip cannot be dispatched.")

        trip.status = TripStatus.DISPATCHED
        trip.dispatch_time = datetime.utcnow()

        trip.vehicle.status = VehicleStatus.ON_TRIP
        trip.driver.status = DriverStatus.ON_TRIP

        db.session.commit()

        return trip

    @staticmethod
    def complete(trip):

        if trip.status not in [
            TripStatus.DISPATCHED,
            TripStatus.IN_PROGRESS
        ]:
            raise ValueError("Trip cannot be completed.")

        trip.status = TripStatus.COMPLETED
        trip.completion_time = datetime.utcnow()

        trip.vehicle.status = VehicleStatus.AVAILABLE
        trip.driver.status = DriverStatus.AVAILABLE

        db.session.commit()

        return trip

    @staticmethod
    def cancel(trip):

        if trip.status == TripStatus.COMPLETED:
            raise ValueError(
                "Completed trip cannot be cancelled."
            )

        trip.status = TripStatus.CANCELLED

        trip.vehicle.status = VehicleStatus.AVAILABLE
        trip.driver.status = DriverStatus.AVAILABLE

        db.session.commit()

        return trip

    @staticmethod
    def delete(trip):

        db.session.delete(trip)
        db.session.commit()
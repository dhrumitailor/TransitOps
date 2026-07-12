from models.vehicle import Vehicle
from database import db


class VehicleService:

    @staticmethod
    def get_all():
        return Vehicle.query.all()

    @staticmethod
    def get_by_id(vehicle_id):
        return Vehicle.query.get(vehicle_id)

    @staticmethod
    def create(data):
        vehicle = Vehicle(
            registration_number=data["registration_number"],
            vehicle_name=data["vehicle_name"],
            vehicle_model=data["vehicle_model"],
            vehicle_type=data["vehicle_type"],
            maximum_load_capacity=data["maximum_load_capacity"],
            odometer=data.get("odometer", 0),
            acquisition_cost=data["acquisition_cost"],
        )

        db.session.add(vehicle)
        db.session.commit()

        return vehicle

    @staticmethod
    def update(vehicle, data):
        vehicle.vehicle_name = data.get("vehicle_name", vehicle.vehicle_name)
        vehicle.vehicle_model = data.get("vehicle_model", vehicle.vehicle_model)
        vehicle.vehicle_type = data.get("vehicle_type", vehicle.vehicle_type)
        vehicle.maximum_load_capacity = data.get(
            "maximum_load_capacity",
            vehicle.maximum_load_capacity
        )
        vehicle.odometer = data.get("odometer", vehicle.odometer)
        vehicle.acquisition_cost = data.get(
            "acquisition_cost",
            vehicle.acquisition_cost
        )

        db.session.commit()

        return vehicle

    @staticmethod
    def delete(vehicle):
        db.session.delete(vehicle)
        db.session.commit()
from flask import Blueprint, jsonify, request

from services.vehicle_service import VehicleService

vehicle_bp = Blueprint("vehicle_bp", __name__)


@vehicle_bp.route("/vehicles", methods=["GET"])
def get_vehicles():
    vehicles = VehicleService.get_all()
    return jsonify([vehicle.to_dict() for vehicle in vehicles])


@vehicle_bp.route("/vehicles/<int:vehicle_id>", methods=["GET"])
def get_vehicle(vehicle_id):
    vehicle = VehicleService.get_by_id(vehicle_id)

    if vehicle is None:
        return jsonify({"message": "Vehicle not found"}), 404

    return jsonify(vehicle.to_dict())


@vehicle_bp.route("/vehicles", methods=["POST"])
def create_vehicle():
    data = request.get_json()

    vehicle = VehicleService.create(data)

    return jsonify(vehicle.to_dict()), 201


@vehicle_bp.route("/vehicles/<int:vehicle_id>", methods=["PUT"])
def update_vehicle(vehicle_id):
    vehicle = VehicleService.get_by_id(vehicle_id)

    if vehicle is None:
        return jsonify({"message": "Vehicle not found"}), 404

    data = request.get_json()

    vehicle = VehicleService.update(vehicle, data)

    return jsonify(vehicle.to_dict())


@vehicle_bp.route("/vehicles/<int:vehicle_id>", methods=["DELETE"])
def delete_vehicle(vehicle_id):
    vehicle = VehicleService.get_by_id(vehicle_id)

    if vehicle is None:
        return jsonify({"message": "Vehicle not found"}), 404

    VehicleService.delete(vehicle)

    return jsonify({"message": "Vehicle deleted successfully"})
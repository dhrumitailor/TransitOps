from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from middleware.auth import role_required
from services.fuel_service import FuelService

fuel_bp = Blueprint(
    "fuel_bp",
    __name__
)


@fuel_bp.route("/fuel", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Financial Analyst"
)
def get_all():

    return jsonify([
        fuel.to_dict()
        for fuel in FuelService.get_all()
    ])


@fuel_bp.route("/fuel", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def create():

    fuel = FuelService.create(
        request.get_json()
    )

    return jsonify(
        fuel.to_dict()
    ), 201


@fuel_bp.route("/fuel/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("Admin")
def delete(id):

    fuel = FuelService.get_by_id(id)

    if not fuel:
        return jsonify({
            "message": "Fuel log not found"
        }), 404

    FuelService.delete(fuel)

    return jsonify({
        "success": True
    })
from flask import Blueprint, jsonify, request

from services.fuel_service import FuelService

fuel_bp = Blueprint(
    "fuel_bp",
    __name__
)


@fuel_bp.route("/fuel", methods=["GET"])
def get_all():

    return jsonify([
        fuel.to_dict()
        for fuel in FuelService.get_all()
    ])


@fuel_bp.route("/fuel", methods=["POST"])
def create():

    fuel = FuelService.create(
        request.get_json()
    )

    return jsonify(
        fuel.to_dict()
    ), 201


@fuel_bp.route("/fuel/<int:id>", methods=["DELETE"])
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
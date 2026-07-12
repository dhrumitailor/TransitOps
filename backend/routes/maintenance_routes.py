from flask import Blueprint, jsonify, request

from services.maintenance_service import MaintenanceService

maintenance_bp = Blueprint(
    "maintenance_bp",
    __name__
)


@maintenance_bp.route("/maintenance", methods=["GET"])
def get_all():

    maintenance = MaintenanceService.get_all()

    return jsonify([
        item.to_dict()
        for item in maintenance
    ])


@maintenance_bp.route("/maintenance/<int:id>", methods=["GET"])
def get_one(id):

    item = MaintenanceService.get_by_id(id)

    if not item:
        return jsonify({"message": "Maintenance not found"}), 404

    return jsonify(item.to_dict())


@maintenance_bp.route("/maintenance", methods=["POST"])
def create():

    item = MaintenanceService.create(
        request.get_json()
    )

    return jsonify(item.to_dict()), 201


@maintenance_bp.route("/maintenance/<int:id>", methods=["PUT"])
def update(id):

    item = MaintenanceService.get_by_id(id)

    if not item:
        return jsonify({"message": "Maintenance not found"}), 404

    item = MaintenanceService.update(
        item,
        request.get_json()
    )

    return jsonify(item.to_dict())


@maintenance_bp.route("/maintenance/<int:id>", methods=["DELETE"])
def delete(id):

    item = MaintenanceService.get_by_id(id)

    if not item:
        return jsonify({"message": "Maintenance not found"}), 404

    MaintenanceService.delete(item)

    return jsonify({
        "success": True,
        "message": "Maintenance deleted successfully"
    })
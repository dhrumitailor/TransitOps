from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from middleware.auth import role_required
from services.driver_service import DriverService

driver_bp = Blueprint(
    "driver_bp",
    __name__
)


@driver_bp.route("/drivers", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Safety Officer"
)
def get_drivers():

    search = request.args.get("search")

    page = request.args.get("page", default=1, type=int)

    per_page = request.args.get("per_page", default=10, type=int)

    drivers = DriverService.get_all(search, page, per_page)

    return jsonify({
        "total": drivers.total,
        "page": drivers.page,
        "pages": drivers.pages,
        "items": [driver.to_dict() for driver in drivers.items]
    })


@driver_bp.route("/drivers/<int:driver_id>", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Safety Officer"
)
def get_driver(driver_id):

    driver = DriverService.get_by_id(driver_id)

    if not driver:
        return jsonify({
            "success": False,
            "message": "Driver Not Found"
        }), 404

    return jsonify(driver.to_dict())


@driver_bp.route("/drivers", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def create_driver():

    data = request.get_json()

    required = [
        "name",
        "license_number",
        "license_category",
        "license_expiry",
        "contact_number"
    ]

    for field in required:
        if field not in data:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    driver = DriverService.create(data)

    return jsonify({
        "success": True,
        "message": "Driver Created Successfully",
        "driver": driver.to_dict()
    }), 201


@driver_bp.route("/drivers/<int:driver_id>", methods=["PUT"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def update_driver(driver_id):

    driver = DriverService.get_by_id(driver_id)

    if not driver:
        return jsonify({
            "success": False,
            "message": "Driver Not Found"
        }), 404

    data = request.get_json()

    driver = DriverService.update(driver, data)

    return jsonify({
        "success": True,
        "message": "Driver Updated Successfully",
        "driver": driver.to_dict()
    })


@driver_bp.route("/drivers/<int:driver_id>", methods=["DELETE"])
@jwt_required()
@role_required("Admin")
def delete_driver(driver_id):

    driver = DriverService.get_by_id(driver_id)

    if not driver:
        return jsonify({
            "success": False,
            "message": "Driver Not Found"
        }), 404

    DriverService.delete(driver)

    return jsonify({
        "success": True,
        "message": "Driver Deleted Successfully"
    })
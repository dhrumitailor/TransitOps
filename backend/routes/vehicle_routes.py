from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from middleware.auth import role_required
from services.vehicle_service import VehicleService

vehicle_bp = Blueprint(
    "vehicle_bp",
    __name__
)


@vehicle_bp.route("/vehicles", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Safety Officer",
    "Financial Analyst"
)
def get_vehicles():

    search = request.args.get("search")

    page = request.args.get(
        "page",
        default=1,
        type=int
    )

    per_page = request.args.get(
        "per_page",
        default=10,
        type=int
    )

    vehicles = VehicleService.get_all(
        search,
        page,
        per_page
    )

    return jsonify({

        "total": vehicles.total,

        "page": vehicles.page,

        "pages": vehicles.pages,

        "items": [
            vehicle.to_dict()
            for vehicle in vehicles.items
        ]

    })


@vehicle_bp.route("/vehicles/<int:vehicle_id>", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Safety Officer",
    "Financial Analyst"
)
def get_vehicle(vehicle_id):

    vehicle = VehicleService.get_by_id(vehicle_id)

    if not vehicle:

        return jsonify({

            "success": False,

            "message": "Vehicle Not Found"

        }), 404

    return jsonify(vehicle.to_dict())


@vehicle_bp.route("/vehicles", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def create_vehicle():

    data = request.get_json()

    required = [

        "registration_number",

        "vehicle_name",

        "vehicle_model",

        "vehicle_type",

        "maximum_load_capacity",

        "acquisition_cost"

    ]

    for field in required:

        if field not in data:

            return jsonify({

                "success": False,

                "message": f"{field} is required"

            }), 400

    vehicle = VehicleService.create(data)

    return jsonify({

        "success": True,

        "message": "Vehicle Created Successfully",

        "vehicle": vehicle.to_dict()

    }), 201


@vehicle_bp.route("/vehicles/<int:vehicle_id>", methods=["PUT"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def update_vehicle(vehicle_id):

    vehicle = VehicleService.get_by_id(vehicle_id)

    if not vehicle:

        return jsonify({

            "success": False,

            "message": "Vehicle Not Found"

        }), 404

    data = request.get_json()

    vehicle = VehicleService.update(
        vehicle,
        data
    )

    return jsonify({

        "success": True,

        "message": "Vehicle Updated Successfully",

        "vehicle": vehicle.to_dict()

    })


@vehicle_bp.route("/vehicles/<int:vehicle_id>", methods=["DELETE"])
@jwt_required()
@role_required("Admin")
def delete_vehicle(vehicle_id):

    vehicle = VehicleService.get_by_id(vehicle_id)

    if not vehicle:

        return jsonify({

            "success": False,

            "message": "Vehicle Not Found"

        }), 404

    VehicleService.delete(vehicle)

    return jsonify({

        "success": True,

        "message": "Vehicle Deleted Successfully"

    })
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from middleware.auth import role_required
from services.trip_service import TripService

trip_bp = Blueprint(
    "trip_bp",
    __name__
)


@trip_bp.route("/trips", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Safety Officer"
)
def get_trips():

    trips = TripService.get_all()

    return jsonify([
        trip.to_dict()
        for trip in trips
    ])


@trip_bp.route("/trips/<int:trip_id>", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Safety Officer"
)
def get_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({
            "message": "Trip not found"
        }), 404

    return jsonify(
        trip.to_dict()
    )


@trip_bp.route("/trips", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def create_trip():

    try:

        trip = TripService.create(
            request.get_json()
        )

        return jsonify({
            "success": True,
            "trip": trip.to_dict()
        }), 201

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


@trip_bp.route("/trips/<int:trip_id>/dispatch", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def dispatch_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({
            "message": "Trip not found"
        }), 404

    try:

        trip = TripService.dispatch(trip)

        return jsonify({
            "success": True,
            "trip": trip.to_dict()
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


@trip_bp.route("/trips/<int:trip_id>/complete", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def complete_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({
            "message": "Trip not found"
        }), 404

    try:

        trip = TripService.complete(trip)

        return jsonify({
            "success": True,
            "trip": trip.to_dict()
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


# -----------------------------
# Cancel Trip
# -----------------------------
@trip_bp.route("/trips/<int:trip_id>/cancel", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager"
)
def cancel_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({
            "message": "Trip not found"
        }), 404

    try:

        trip = TripService.cancel(trip)

        return jsonify({
            "success": True,
            "trip": trip.to_dict()
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


@trip_bp.route("/trips/<int:trip_id>", methods=["DELETE"])
@jwt_required()
@role_required("Admin")
def delete_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({
            "message": "Trip not found"
        }), 404

    TripService.delete(trip)

    return jsonify({
        "success": True
    })
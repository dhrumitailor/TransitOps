# from flask import Blueprint, jsonify, request

# from services.trip_service import TripService

# trip_bp = Blueprint(
#     "trip_bp",
#     __name__
# )


# @trip_bp.route("/trips", methods=["GET"])
# def get_trips():

#     trips = TripService.get_all()

#     return jsonify([
#         trip.to_dict()
#         for trip in trips
#     ])


# @trip_bp.route("/trips/<int:trip_id>", methods=["GET"])
# def get_trip(trip_id):

#     trip = TripService.get_by_id(trip_id)

#     if not trip:
#         return jsonify({
#             "success": False,
#             "message": "Trip Not Found"
#         }), 404

#     return jsonify(trip.to_dict())


# @trip_bp.route("/trips", methods=["POST"])
# def create_trip():

#     data = request.get_json()

#     try:

#         trip = TripService.create(data)

#         return jsonify({
#             "success": True,
#             "message": "Trip Created Successfully",
#             "trip": trip.to_dict()
#         }), 201

#     except ValueError as e:

#         return jsonify({
#             "success": False,
#             "message": str(e)
#         }), 400


# @trip_bp.route("/trips/<int:trip_id>/dispatch", methods=["POST"])
# def dispatch_trip(trip_id):

#     trip = TripService.get_by_id(trip_id)

#     if not trip:

#         return jsonify({
#             "success": False,
#             "message": "Trip Not Found"
#         }), 404

#     trip = TripService.dispatch(trip)

#     return jsonify({
#         "success": True,
#         "message": "Trip Dispatched",
#         "trip": trip.to_dict()
#     })


# @trip_bp.route("/trips/<int:trip_id>/complete", methods=["POST"])
# def complete_trip(trip_id):

#     trip = TripService.get_by_id(trip_id)

#     if not trip:

#         return jsonify({
#             "success": False,
#             "message": "Trip Not Found"
#         }), 404

#     trip = TripService.complete(trip)

#     return jsonify({
#         "success": True,
#         "message": "Trip Completed",
#         "trip": trip.to_dict()
#     })
from flask import Blueprint, jsonify, request

from services.trip_service import TripService

trip_bp = Blueprint(
    "trip_bp",
    __name__
)


@trip_bp.route("/trips", methods=["GET"])
def get_trips():

    trips = TripService.get_all()

    return jsonify([trip.to_dict() for trip in trips])


@trip_bp.route("/trips/<int:trip_id>", methods=["GET"])
def get_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({"message": "Trip not found"}), 404

    return jsonify(trip.to_dict())


@trip_bp.route("/trips", methods=["POST"])
def create_trip():

    try:

        trip = TripService.create(request.get_json())

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
def dispatch_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({"message": "Trip not found"}), 404

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
def complete_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({"message": "Trip not found"}), 404

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


@trip_bp.route("/trips/<int:trip_id>", methods=["DELETE"])
def delete_trip(trip_id):

    trip = TripService.get_by_id(trip_id)

    if trip is None:
        return jsonify({"message": "Trip not found"}), 404

    TripService.delete(trip)

    return jsonify({
        "success": True
    })
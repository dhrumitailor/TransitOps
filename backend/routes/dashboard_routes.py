from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from middleware.auth import role_required
from services.dashboard_service import DashboardService

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__
)


@dashboard_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Financial Analyst",
    "Safety Officer"
)
def dashboard():

    return jsonify(
        DashboardService.get_dashboard()
    )
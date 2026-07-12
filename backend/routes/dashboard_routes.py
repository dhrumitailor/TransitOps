from flask import Blueprint, jsonify

from services.dashboard_service import DashboardService

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__
)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():

    return jsonify(
        DashboardService.get_dashboard()
    )
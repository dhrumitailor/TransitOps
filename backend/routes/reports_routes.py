from flask import Blueprint, jsonify, Response
from flask_jwt_extended import jwt_required

from middleware.auth import role_required
from services.reports_service import ReportsService

reports_bp = Blueprint(
    "reports_bp",
    __name__
)


@reports_bp.route("/reports", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Financial Analyst"
)
def reports():

    return jsonify(
        ReportsService.get_report()
    )


@reports_bp.route("/reports/export", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Financial Analyst"
)
def export_report():

    csv_data = ReportsService.export_csv()

    return Response(
        csv_data,
        mimetype="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=TransitOps_Report.csv"
        }
    )
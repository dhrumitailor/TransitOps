from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from middleware.auth import role_required
from services.expense_service import ExpenseService

expense_bp = Blueprint(
    "expense_bp",
    __name__
)


@expense_bp.route("/expenses", methods=["GET"])
@jwt_required()
@role_required(
    "Admin",
    "Fleet Manager",
    "Financial Analyst"
)
def get_all():

    return jsonify([
        expense.to_dict()
        for expense in ExpenseService.get_all()
    ])


@expense_bp.route("/expenses", methods=["POST"])
@jwt_required()
@role_required(
    "Admin",
    "Financial Analyst"
)
def create():

    expense = ExpenseService.create(
        request.get_json()
    )

    return jsonify(
        expense.to_dict()
    ), 201


@expense_bp.route("/expenses/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("Admin")
def delete(id):

    expense = ExpenseService.get_by_id(id)

    if not expense:
        return jsonify({
            "message": "Expense not found"
        }), 404

    ExpenseService.delete(expense)

    return jsonify({
        "success": True
    })
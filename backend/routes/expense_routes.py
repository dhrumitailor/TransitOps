from flask import Blueprint, jsonify, request

from services.expense_service import ExpenseService

expense_bp = Blueprint(
    "expense_bp",
    __name__
)


@expense_bp.route("/expenses", methods=["GET"])
def get_all():

    return jsonify([
        expense.to_dict()
        for expense in ExpenseService.get_all()
    ])


@expense_bp.route("/expenses", methods=["POST"])
def create():

    expense = ExpenseService.create(
        request.get_json()
    )

    return jsonify(
        expense.to_dict()
    ), 201


@expense_bp.route("/expenses/<int:id>", methods=["DELETE"])
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
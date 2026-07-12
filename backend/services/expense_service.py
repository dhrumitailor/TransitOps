from datetime import datetime

from database import db
from models.expense import Expense


class ExpenseService:

    @staticmethod
    def get_all():
        return Expense.query.all()

    @staticmethod
    def get_by_id(expense_id):
        return Expense.query.get(expense_id)

    @staticmethod
    def create(data):

        expense = Expense(
            vehicle_id=data["vehicle_id"],
            trip_id=data.get("trip_id"),
            category=data["category"],
            description=data.get("description", ""),
            amount=data["amount"],
            expense_date=datetime.strptime(
                data["expense_date"],
                "%Y-%m-%d"
            ).date()
        )

        db.session.add(expense)
        db.session.commit()

        return expense

    @staticmethod
    def delete(expense):

        db.session.delete(expense)
        db.session.commit()
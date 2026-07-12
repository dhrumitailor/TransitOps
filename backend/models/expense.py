from datetime import datetime

from database import db
from .enums import ExpenseType


class Expense(db.Model):
    __tablename__ = "expenses"

    id = db.Column(db.Integer, primary_key=True)

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.id"),
        nullable=False
    )

    trip_id = db.Column(
        db.Integer,
        db.ForeignKey("trips.id"),
        nullable=True
    )

    category = db.Column(
        db.Enum(ExpenseType),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    expense_date = db.Column(
        db.Date,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    vehicle = db.relationship(
        "Vehicle",
        back_populates="expenses"
    )

    trip = db.relationship(
        "Trip",
        back_populates="expenses"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "vehicle_id": self.vehicle_id,
            "trip_id": self.trip_id,
            "category": self.category.value,
            "description": self.description,
            "amount": self.amount,
            "expense_date": self.expense_date.isoformat(),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
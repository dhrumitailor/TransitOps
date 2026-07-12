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
        nullable=False
    )

    expense_type = db.Column(
        db.Enum(ExpenseType),
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    description = db.Column(
        db.Text
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
            "expense_type": self.expense_type.value,
            "amount": self.amount,
            "description": self.description,
            "expense_date": self.expense_date.isoformat(),
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f"<Expense {self.id}>"
from datetime import datetime

from database import db
from .enums import TripStatus


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.id"),
        nullable=False
    )

    driver_id = db.Column(
        db.Integer,
        db.ForeignKey("drivers.id"),
        nullable=False
    )

    source = db.Column(
        db.String(150),
        nullable=False
    )

    destination = db.Column(
        db.String(150),
        nullable=False
    )

    cargo_weight = db.Column(
        db.Float,
        nullable=False
    )

    planned_distance = db.Column(
        db.Float,
        nullable=False
    )

    actual_distance = db.Column(
        db.Float,
        default=0
    )

    revenue = db.Column(
        db.Float,
        default=0
    )

    dispatch_time = db.Column(
        db.DateTime,
        nullable=True
    )

    completion_time = db.Column(
        db.DateTime,
        nullable=True
    )

    remarks = db.Column(
        db.Text,
        nullable=True
    )

    status = db.Column(
        db.Enum(TripStatus),
        default=TripStatus.SCHEDULED,
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

    # -------------------------
    # Relationships
    # -------------------------

    vehicle = db.relationship(
        "Vehicle",
        back_populates="trips"
    )

    driver = db.relationship(
        "Driver",
        back_populates="trips"
    )

    fuel_logs = db.relationship(
        "FuelLog",
        back_populates="trip",
        cascade="all, delete-orphan",
        lazy=True
    )

    expenses = db.relationship(
        "Expense",
        back_populates="trip",
        cascade="all, delete-orphan",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "vehicle_id": self.vehicle_id,
            "driver_id": self.driver_id,
            "source": self.source,
            "destination": self.destination,
            "cargo_weight": self.cargo_weight,
            "planned_distance": self.planned_distance,
            "actual_distance": self.actual_distance,
            "revenue": self.revenue,
            "dispatch_time": self.dispatch_time.isoformat() if self.dispatch_time else None,
            "completion_time": self.completion_time.isoformat() if self.completion_time else None,
            "remarks": self.remarks,
            "status": self.status.value,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f"<Trip {self.id}>"
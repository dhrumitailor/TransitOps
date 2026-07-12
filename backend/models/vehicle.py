from datetime import datetime

from database import db
from .enums import VehicleStatus


class Vehicle(db.Model):
    __tablename__ = "vehicles"

    id = db.Column(db.Integer, primary_key=True)

    registration_number = db.Column(
        db.String(30),
        unique=True,
        nullable=False
    )

    vehicle_name = db.Column(
        db.String(100),
        nullable=False
    )

    vehicle_model = db.Column(
        db.String(100),
        nullable=False
    )

    vehicle_type = db.Column(
        db.String(50),
        nullable=False
    )

    maximum_load_capacity = db.Column(
        db.Float,
        nullable=False
    )

    odometer = db.Column(
        db.Float,
        default=0
    )

    acquisition_cost = db.Column(
        db.Float,
        nullable=False
    )

    status = db.Column(
        db.Enum(VehicleStatus),
        default=VehicleStatus.AVAILABLE,
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

    trips = db.relationship(
        "Trip",
        back_populates="vehicle",
        cascade="all, delete-orphan",
        lazy=True
    )

    maintenance_records = db.relationship(
        "Maintenance",
        back_populates="vehicle",
        cascade="all, delete-orphan",
        lazy=True
    )

    fuel_logs = db.relationship(
        "FuelLog",
        back_populates="vehicle",
        cascade="all, delete-orphan",
        lazy=True
    )

    expenses = db.relationship(
        "Expense",
        back_populates="vehicle",
        cascade="all, delete-orphan",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "registration_number": self.registration_number,
            "vehicle_name": self.vehicle_name,
            "vehicle_model": self.vehicle_model,
            "vehicle_type": self.vehicle_type,
            "maximum_load_capacity": self.maximum_load_capacity,
            "odometer": self.odometer,
            "acquisition_cost": self.acquisition_cost,
            "status": self.status.value,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f"<Vehicle {self.registration_number}>"
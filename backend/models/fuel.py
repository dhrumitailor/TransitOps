from datetime import datetime

from database import db


class FuelLog(db.Model):
    __tablename__ = "fuel_logs"

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

    fuel_date = db.Column(
        db.Date,
        nullable=False
    )

    liters = db.Column(
        db.Float,
        nullable=False
    )

    price_per_liter = db.Column(
        db.Float,
        nullable=False
    )

    cost = db.Column(
        db.Float,
        nullable=False
    )

    odometer = db.Column(
        db.Float,
        nullable=False
    )

    fuel_station = db.Column(
        db.String(150)
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
        back_populates="fuel_logs"
    )

    trip = db.relationship(
        "Trip",
        back_populates="fuel_logs"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "vehicle_id": self.vehicle_id,
            "trip_id": self.trip_id,
            "fuel_date": self.fuel_date.isoformat(),
            "liters": self.liters,
            "price_per_liter": self.price_per_liter,
            "cost": self.cost,
            "odometer": self.odometer,
            "fuel_station": self.fuel_station,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
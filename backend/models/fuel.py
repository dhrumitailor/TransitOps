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
        nullable=False
    )

    fuel_station = db.Column(
        db.String(100)
    )

    liters = db.Column(
        db.Float,
        nullable=False
    )

    cost = db.Column(
        db.Float,
        nullable=False
    )

    date = db.Column(
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
            "fuel_station": self.fuel_station,
            "liters": self.liters,
            "cost": self.cost,
            "date": self.date.isoformat(),
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f"<FuelLog {self.id}>"
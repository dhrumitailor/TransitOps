from datetime import datetime

from database import db
from .enums import DriverStatus
from datetime import datetime

class Driver(db.Model):
    __tablename__ = "drivers"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(100),
        nullable=False
    )

    license_number = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    license_category = db.Column(
        db.String(50),
        nullable=False
    )

    license_expiry = db.Column(
        db.Date,
        nullable=False
    )

    contact_number = db.Column(
        db.String(15),
        nullable=False
    )

    safety_score = db.Column(
        db.Integer,
        default=100
    )

    status = db.Column(
        db.Enum(DriverStatus),
        default=DriverStatus.AVAILABLE,
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

    # Relationships

    trips = db.relationship(
        "Trip",
        back_populates="driver",
        cascade="all, delete-orphan",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "license_number": self.license_number,
            "license_category": self.license_category,
            "license_expiry": self.license_expiry.isoformat(),
            "contact_number": self.contact_number,
            "safety_score": self.safety_score,
            "status": self.status.value,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f"<Driver {self.name}>"
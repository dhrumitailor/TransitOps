# from datetime import datetime

# from database import db
# from .enums import MaintenanceStatus, MaintenancePriority


# class Maintenance(db.Model):
#     __tablename__ = "maintenance"

#     id = db.Column(db.Integer, primary_key=True)

#     vehicle_id = db.Column(
#         db.Integer,
#         db.ForeignKey("vehicles.id"),
#         nullable=False
#     )

#     maintenance_type = db.Column(
#         db.String(100),
#         nullable=False
#     )

#     description = db.Column(
#         db.Text
#     )

#     priority = db.Column(
#         db.Enum(MaintenancePriority),
#         default=MaintenancePriority.MEDIUM
#     )

#     cost = db.Column(
#         db.Float,
#         default=0
#     )

#     start_date = db.Column(
#         db.Date,
#         nullable=False
#     )

#     end_date = db.Column(
#         db.Date,
#         nullable=True
#     )

#     status = db.Column(
#         db.Enum(MaintenanceStatus),
#         default=MaintenanceStatus.PENDING
#     )

#     created_at = db.Column(
#         db.DateTime,
#         default=datetime.utcnow
#     )

#     updated_at = db.Column(
#         db.DateTime,
#         default=datetime.utcnow,
#         onupdate=datetime.utcnow
#     )

#     vehicle = db.relationship(
#         "Vehicle",
#         back_populates="maintenance_records"
#     )

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "vehicle_id": self.vehicle_id,
#             "maintenance_type": self.maintenance_type,
#             "description": self.description,
#             "priority": self.priority.value,
#             "cost": self.cost,
#             "start_date": self.start_date.isoformat(),
#             "end_date": self.end_date.isoformat() if self.end_date else None,
#             "status": self.status.value,
#             "created_at": self.created_at.isoformat() if self.created_at else None,
#             "updated_at": self.updated_at.isoformat() if self.updated_at else None
#         }

#     def __repr__(self):
#         return f"<Maintenance {self.id}>"
from datetime import datetime

from database import db
from .enums import MaintenanceStatus


class Maintenance(db.Model):
    __tablename__ = "maintenance"

    id = db.Column(db.Integer, primary_key=True)

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.id"),
        nullable=False
    )

    maintenance_type = db.Column(
        db.String(100),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    service_date = db.Column(
        db.Date,
        nullable=False
    )

    cost = db.Column(
        db.Float,
        default=0
    )

    # status = db.Column(
    #     db.Enum(MaintenanceStatus),
    #     default=MaintenanceStatus.SCHEDULED,
    #     nullable=False
    # )
    status = db.Column(
    db.Enum(MaintenanceStatus),
    default=MaintenanceStatus.PENDING,
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
        back_populates="maintenance_records"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "vehicle_id": self.vehicle_id,
            "maintenance_type": self.maintenance_type,
            "description": self.description,
            "service_date": self.service_date.isoformat(),
            "cost": self.cost,
            "status": self.status.value,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

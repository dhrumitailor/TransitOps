from database import db
from models.maintenance import Maintenance


class MaintenanceService:

    @staticmethod
    def get_all():
        return Maintenance.query.all()

    @staticmethod
    def get_by_id(maintenance_id):
        return Maintenance.query.get(maintenance_id)

    @staticmethod
    def create(data):

        maintenance = Maintenance(
            vehicle_id=data["vehicle_id"],
            maintenance_type=data["maintenance_type"],
            description=data.get("description", ""),
            service_date=data["service_date"],
            cost=data.get("cost", 0),
            status=data.get("status", "Scheduled")
        )

        db.session.add(maintenance)
        db.session.commit()

        return maintenance

    @staticmethod
    def update(maintenance, data):

        maintenance.maintenance_type = data.get(
            "maintenance_type",
            maintenance.maintenance_type
        )

        maintenance.description = data.get(
            "description",
            maintenance.description
        )

        maintenance.service_date = data.get(
            "service_date",
            maintenance.service_date
        )

        maintenance.cost = data.get(
            "cost",
            maintenance.cost
        )

        maintenance.status = data.get(
            "status",
            maintenance.status
        )

        db.session.commit()

        return maintenance

    @staticmethod
    def delete(maintenance):

        db.session.delete(maintenance)
        db.session.commit()
from datetime import datetime

from sqlalchemy import or_

from database import db
from models.driver import Driver


class DriverService:

    @staticmethod
    def get_all(search=None, page=1, per_page=10):

        query = Driver.query

        if search:
            query = query.filter(
                or_(
                    Driver.name.ilike(f"%{search}%"),
                    Driver.license_number.ilike(f"%{search}%"),
                    Driver.contact_number.ilike(f"%{search}%")
                )
            )

        return query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

    @staticmethod
    def get_by_id(driver_id):
        return Driver.query.get(driver_id)

    @staticmethod
    def create(data):

        driver = Driver(
            name=data["name"],
            license_number=data["license_number"],
            license_category=data["license_category"],
            license_expiry=datetime.strptime(
                data["license_expiry"],
                "%Y-%m-%d"
            ).date(),
            contact_number=data["contact_number"],
            safety_score=data.get("safety_score", 100)
        )

        db.session.add(driver)
        db.session.commit()

        return driver

    @staticmethod
    def update(driver, data):

        driver.name = data.get("name", driver.name)
        driver.license_number = data.get(
            "license_number",
            driver.license_number
        )
        driver.license_category = data.get(
            "license_category",
            driver.license_category
        )

        if "license_expiry" in data:
            driver.license_expiry = datetime.strptime(
                data["license_expiry"],
                "%Y-%m-%d"
            ).date()

        driver.contact_number = data.get(
            "contact_number",
            driver.contact_number
        )

        driver.safety_score = data.get(
            "safety_score",
            driver.safety_score
        )

        db.session.commit()

        return driver

    @staticmethod
    def delete(driver):

        db.session.delete(driver)
        db.session.commit()
from models.user import User
from database import db


class AuthService:

    @staticmethod
    def register(data):

        existing_user = User.query.filter_by(
            email=data["email"]
        ).first()

        if existing_user:
            raise ValueError("Email already exists.")

        user = User(
            name=data["name"],
            email=data["email"],
            role=data.get("role", "FLEET_MANAGER")
        )

        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        return user

    @staticmethod
    def login(email, password):

        user = User.query.filter_by(
            email=email
        ).first()

        if not user:
            return None

        if not user.check_password(password):
            return None

        return user
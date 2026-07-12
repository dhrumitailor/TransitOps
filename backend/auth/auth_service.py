# from models.user import User
# from database import db


# class AuthService:

#     @staticmethod
#     def register(data):

#         existing_user = User.query.filter_by(
#             email=data["email"]
#         ).first()

#         if existing_user:
#             raise ValueError("Email already exists.")

#         user = User(
#             name=data["name"],
#             email=data["email"],
#             role=data.get("role", "FLEET_MANAGER")
#         )

#         user.set_password(data["password"])

#         db.session.add(user)
#         db.session.commit()

#         return user

#     @staticmethod
#     def login(email, password):

#         user = User.query.filter_by(
#             email=email
#         ).first()

#         if not user:
#             return None

#         if not user.check_password(password):
#             return None

#         return user
from database import db
from models.user import User
from models.enums import UserRole


class AuthService:

    @staticmethod
    def register(data):

        existing_user = User.query.filter_by(
            email=data["email"]
        ).first()

        if existing_user:
            raise ValueError("Email already exists.")

        role_map = {
            "Admin": UserRole.ADMIN,
            "Fleet Manager": UserRole.FLEET_MANAGER,
            "Driver": UserRole.DRIVER,
            "Safety Officer": UserRole.SAFETY_OFFICER,
            "Financial Analyst": UserRole.FINANCIAL_ANALYST
        }

        role = role_map.get(
            data.get("role", "Fleet Manager"),
            UserRole.FLEET_MANAGER
        )

        user = User(
            name=data["name"],
            email=data["email"],
            role=role
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


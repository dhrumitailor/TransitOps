from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token

from auth.auth_service import AuthService

auth_bp = Blueprint(
    "auth_bp",
    __name__
)


@auth_bp.route("/auth/register", methods=["POST"])
def register():

    try:

        user = AuthService.register(
            request.get_json()
        )

        return jsonify({
            "success": True,
            "message": "User registered successfully.",
            "user": user.to_dict()
        }), 201

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


@auth_bp.route("/auth/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body is required."
        }), 400

    if "email" not in data or "password" not in data:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    user = AuthService.login(
        data["email"],
        data["password"]
    )

    if not user:
        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role.value
        }
    )

    return jsonify({
        "success": True,
        "access_token": access_token,
        "user": user.to_dict()
    }), 200
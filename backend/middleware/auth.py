from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt_identity

from models.user import User


def role_required(*roles):

    def decorator(fn):

        @wraps(fn)
        def wrapper(*args, **kwargs):

            user_id = get_jwt_identity()

            user = User.query.get(user_id)

            if not user:
                return jsonify({
                    "success": False,
                    "message": "User not found."
                }), 404

            if user.role.value not in roles:
                return jsonify({
                    "success": False,
                    "message": "Access denied."
                }), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator
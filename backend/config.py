# import os

# class Config:
#     SECRET_KEY = os.getenv("SECRET_KEY", "transitops_secret_key")

#     SQLALCHEMY_DATABASE_URI = os.getenv(
#         "DATABASE_URL",
#         "postgresql://postgres:YOUR_PASSWORD@localhost:5432/transitops"
#     )

#     SQLALCHEMY_TRACK_MODIFICATIONS = False

import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "transitops_secret_key")

    SQLALCHEMY_DATABASE_URI = "sqlite:///transitops.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "transitops_super_secret"
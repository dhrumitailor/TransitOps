from flask import Flask
from flask_cors import CORS

from config import Config
from database import db, migrate
from models import *
from routes.vehicle_routes import vehicle_bp
from routes.driver_routes import driver_bp
from routes.trip_routes import trip_bp
from routes.dashboard_routes import dashboard_bp
from routes.maintenance_routes import maintenance_bp
from routes.fuel_routes import fuel_bp
from routes.expense_routes import expense_bp
from flask_jwt_extended import JWTManager
from auth.auth_routes import auth_bp
from routes.reports_routes import reports_bp


app = Flask(__name__)
jwt = JWTManager(app)
app.config.from_object(Config)

CORS(app)

db.init_app(app)
migrate.init_app(app, db)
app.register_blueprint(vehicle_bp, url_prefix="/api")
app.register_blueprint(driver_bp, url_prefix="/api")
app.register_blueprint(
    trip_bp,
    url_prefix="/api"
)
app.register_blueprint(
    dashboard_bp,
    url_prefix="/api"
)
app.register_blueprint(
    maintenance_bp,
    url_prefix="/api"
)
app.register_blueprint(
    fuel_bp,
    url_prefix="/api"
)
app.register_blueprint(
    expense_bp,
    url_prefix="/api"
)
app.register_blueprint(
    auth_bp,
    url_prefix="/api"
)
app.register_blueprint(reports_bp, url_prefix="/api")

@app.route("/")
def home():
    return {
        "project": "TransitOps Backend",
        "status": "Running Successfully"
    }

if __name__ == "__main__":
    app.run(debug=True)
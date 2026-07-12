from flask import Flask
from flask_cors import CORS

from config import Config
from database import db, migrate
from models import *
from routes.vehicle_routes import vehicle_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)
migrate.init_app(app, db)
app.register_blueprint(vehicle_bp, url_prefix="/api")

@app.route("/")
def home():
    return {
        "project": "TransitOps Backend",
        "status": "Running Successfully"
    }

if __name__ == "__main__":
    app.run(debug=True)
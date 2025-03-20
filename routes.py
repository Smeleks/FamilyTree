from flask import Flask, request, jsonify, session, render_template
from db import db
from models import User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

app = Flask(__name__)
app.config['SECRET_KEY'] = "your_secret_key"
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:@localhost/family_tree"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
bcrypt.init_app(app)

@app.route("/")
def home():
    return render_template("main.html")

@app.route("/register_page")
def register_page():
    return render_template("reg.html")

@app.route("/login_page")
def login_page():
    return render_template("login.html")

@app.route("/map")
def map_page():
    return render_template("map.html")

# Reg
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email is already registered."}), 400

    new_user = User(
        last_name=data.get("last_name"),
        first_name=data.get("first_name"),
        middle_name=data.get("middle_name"),
        day=data.get("day"),
        month=data.get("month"),
        year=data.get("year"),
        email=email,
        gender=data.get("gender")
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id
    session["user_email"] = new_user.email

    return jsonify({"redirect": "/map"}), 201

# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "No user found with this email."}), 404

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Wrong Password"}), 401

    session["user_id"] = user.id
    session["user_email"] = user.email
    session["user_name"] = f"{user.first_name} {user.last_name}"

    return jsonify({"success": "Login successful", "redirect": "/map"}), 200

# Get User Info
@app.route("/get_user_info", methods=["GET"])
def get_user_info():
    if "user_id" not in session:
        return jsonify({"error": "User not logged in."}), 401

    user = User.query.get(session["user_id"])
    if not user:
        return jsonify({"error": "User not found."}), 404

    response = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "day": user.day,
        "month": user.month,
        "year": user.year
    }

    if user.middle_name and user.middle_name != "0":
        response["middle_name"] = user.middle_name

    return jsonify(response), 200

# Redirect for Logrout
@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"redirect": "/login_page"}), 200

# App Run
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
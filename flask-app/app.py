from flask import Flask
from flask_login import LoginManager
from Customers import customer_bp
from Eateries import eatery_bp
from flask import Flask, request, jsonify
from extensions import *
from models import *
from utils import *
import pymysql
from flask_login import LoginManager
from forms import *

# initiate FLASK instance
app = Flask(__name__, static_folder='Static')
################测试阶段禁用CSRF保护
app.config['WTF_CSRF_ENABLED'] = False
from flask_cors import CORS
#CORS(app) # 这将使整个应用支持CORS
CORS(app, supports_credentials=True)
# , resources={r"/*": {"origins": "http://localhost:8081"}}

# Initializing Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    if '/customers' in request.url:
        return Customer_User.query.filter_by(id=user_id).first()
    elif '/eateries' in request.url:
        return Eatery_User.query.filter_by(id=user_id).first()
    else:
        return None

# Initiate MYSQL databse
pymysql.install_as_MySQLdb()
# Database config
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Wananny0328@db:3306/eatery_management'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Wananny0328@db:3306/eatery_management'

# 
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['JSON_AS_ASCII'] = False
# 关闭数据库追踪对象修改，提高性能，避免不必要的数据库更新操作
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# set session KEY
app.config['SECRET_KEY'] = '9900F15APT5D'

# Initiate APP
db.init_app(app)

"""----------------------------------------
        Initiate API page
-------------------------------------------"""
# If successfully visit the API, raise 'Welcome!' msg
@app.route('/', methods=['GET'])
def hello():
    welcome_response = {
        'msg': 'Welcome!'
    }
    return jsonify(welcome_response), 200

"""----------------------------------------
        Run customer/eatery APIs
-------------------------------------------"""
app.register_blueprint(customer_bp)
app.register_blueprint(eatery_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, debug=False)

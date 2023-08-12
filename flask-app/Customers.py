from flask import request, jsonify, Blueprint, send_from_directory
from extensions import *
from models import *
from utils import *
from flask_login import login_user, logout_user, login_required, current_user
from forms import *
from sqlalchemy import desc, func
from datetime import datetime

customer_bp = Blueprint('customer', __name__)


def create_customer_blueprint():
    customer_bp = Blueprint('customer', __name__)
    """----------------------------------------------------------------------------------------------------              
                                        Func1
    ----------------------------------------------------------------------------------------------------"""

    """----------------------------------------
            Search for all users (Customer/Eatery)
    -------------------------------------------"""
    # Search for all users
    # Return 200 and data

    # Customer_users
    @customer_bp.route('/customers', methods=['GET'])
    def user_find_all():
        all_customer_users_info = Customer_User.query.all()
        response_users_info = {
            'msg': 'User successful found!',
            'data': model_list_to_dict(all_customer_users_info)
        }
        return jsonify(response_users_info), 200

    """----------------------------------------
            Search for certain user by ID
    -------------------------------------------"""
    # Search for user by userID
    # return 200 if exits, else 404
        
    # Customer user
    @customer_bp.route('/customers/<int:user_id>', methods=['GET'])
    def find_user_by_id(user_id):
        user = Customer_User.query.get(user_id)
        if user == None:
            response_user_id = {
                'msg': 'User does not exit!'
            }
            return jsonify(response_user_id), 404
        else:
            response_user_id = {
                'msg': 'User successful found!',
                'data': user.dict()
            }
            return jsonify(response_user_id), 200

    """----------------------------------------
                    User register
    -------------------------------------------"""
    # API to actively check if username already exits
    @customer_bp.route('/customers/check_username', methods=['POST'])
    def check_username():
        form = CustomerSignUpForm()
        username = form.username.data
        user = Customer_User.query.filter_by(name=username).first()
        if user:
            return jsonify({'msg': '1'}), 200
        else:
            return jsonify({'msg': '0'}), 200

    # API to actively check if email already exits
    @customer_bp.route('/customers/check_email', methods=['POST'])
    def check_email():
        form = CustomerSignUpForm()
        email = form.email.data
        #email = request.form.get('email') 
        # Check if the user_name has already been registered
        user_email = Customer_User.query.filter_by(email=email).first()
        if user_email:
            return jsonify({'msg': '1'}), 200
        else:
            return jsonify({'msg': '0'}), 200

    # API to actively check if phone_number already exits
    @customer_bp.route('/customers/check_phonenum', methods=['POST'])
    def check_phonenum():
        form = CustomerSignUpForm()
        phone_number = form.phone_number.data
        #phone_number = request.form.get('phone_number')  
        # Check if the user_name has already been registered
        user_phonenum = Customer_User.query.filter_by(phone_number=phone_number).first()
        if user_phonenum:
            return jsonify({'msg': '1'}), 200
        else:
            return jsonify({'msg': '0'}), 200

    # User register main function
    @customer_bp.route('/customers/register', methods=['POST'])
    def user_register():
        
        form = CustomerSignUpForm()
        if form.validate_on_submit():
            
            username = form.username.data
            password = form.password.data
            birthday = form.birthday.data
            gender = form.gender.data
            phone_number = form.phone_number.data
            email = form.email.data
            avatar=None

            user = Customer_User.query.filter_by(name=username).first()
            if user:
                return jsonify({'msg': 'User already used!'})
            
            # Register user to database
            user = Customer_User(name=username, 
                                password=password,
                                gender=gender,
                                birthday=birthday,
                                phone_number=phone_number,
                                email=email,
                                avatar=avatar
                                )
            try:
                db.session.add(user)
                db.session.commit()  # commit transaction
            except Exception as e:
                db.session.rollback()  # rollback when abnormal
                print(e, '[Error] in [/customers/register] [POST] when inserting a user into MySQL.')
                response = {
                    'msg': 'Server error, please try again later.'
                }
                return jsonify(response), 500
            
            login_user(user)
            
            response = {
                'msg': 'Register successful!',
                'data': user.dict()
            }
            return jsonify(response), 200
        else:
            errors = form.errors
            return jsonify({'msg': 'Validation failed.', 'errors': errors}), 404

            
    """----------------------------------------
                    User login
    -------------------------------------------"""
    @customer_bp.route('/customers/login', methods=['POST'])
    def user_login():
        
        form = UserLoginForm()
        if form.validate_on_submit():
            
            username = form.username.data
            password = form.password.data
            
            #user = Customer_User.objects(username=username, password=password).first()
            user = Customer_User.query.filter_by(name=username, password=password).first()
            
            if user:
                login_user(user)
                response = {
                    'msg': 'Login successfully!',
                    'data': user.dict()
                }
                return jsonify(response), 200
            else:
                return jsonify({'code': 401, 'msg': 'Username or Password Error!'}), 401
        else:
            errors = form.errors
            return jsonify({'msg': 'Validation failed.', 'errors': errors}), 404


    """----------------------------------------
                User logout
    -------------------------------------------"""
    @customer_bp.route('/customers/logout', methods=['GET'])
    @login_required
    def user_logout():
        logout_user()
        return jsonify({'code': 200, 'msg': 'Logout success!'})

    """----------------------------------------
                Get user info when is online
    -------------------------------------------"""
    @customer_bp.route('/customers/user_info', methods=['GET'])
    def user_info():
        if current_user.is_authenticated:
            response = {"code": 200,
                    "data": current_user.dict()}
        else:
            response = {"code": 401,
                    "data": {"message": "User not authenticated"}}
        return jsonify(**response)

    """----------------------------------------
                    User update
    -------------------------------------------"""
    @customer_bp.route('/customers/sendAvatar', methods=['GET'])
    @login_required
    def send_file():
        filepath = request.form.get('avatar')
        directory = filepath.split('/')[0]
        filename = filepath.split('/')[1]
        return send_from_directory(directory, filename)
    
    
    @customer_bp.route('/customers/update', methods=['GET', 'PUT'])
    @login_required
    def update():
    #if int(current_user.get_id()) == id:
        id = int(current_user.get_id())
        if request.method == 'PUT':

            user_to_update = Customer_User.query.get_or_404(id)
            
            user_to_update.name = request.form.get('username')
            if not request.form.get('password'):
                return jsonify({'code': 401, 'msg': 'Password can not be empty!'})
            user_to_update.password = request.form.get('password')
            user_to_update.gender = request.form.get('gender')
            birthday = request.form.get('birthday')
            if not not Check_date_format(birthday):
                response = {
                    'msg': 'Invalid birthday format. Please use %Y-%m-%d.'
                }
                return jsonify(response), 400
            user_to_update.birthday = request.form.get('birthday')
            user_to_update.phone_number = request.form.get('phone_number')
            user_to_update.email = request.form.get('email')
            
            if 'avatar' in request.files:
                file = request.files['avatar']
                filename = file.filename
                filepath = 'Static/'+filename
                file.save(filepath)
                user_to_update.avatar = filepath
            
            
            db.session.commit()
            res = {
                'msg': 'Update success',
                'data': user_to_update.dict()
            }
            return jsonify(res), 200
            
        elif request.method == 'GET':
            user_to_update = Customer_User.query.get_or_404(id)
            response = {"code": 200,
                        "data": user_to_update.dict()}
            return jsonify(response)
            
    #else:
        #return jsonify({'msg': 'No authority to eidt this user info'}), 401
                

    """----------------------------------------
                    Delect account
    -------------------------------------------"""
    @customer_bp.route('/customers/delete', methods=['DELETE'])
    @login_required
    def delete_user():
        
    #if int(current_user.get_id()) == id:
        id = int(current_user.get_id())
        user_to_delete = Customer_User.query.get_or_404(id)

        db.session.delete(user_to_delete)
        db.session.commit()
        response = {
            'msg': 'User account delete success'
        }
        return jsonify(response), 200
    #else:
        #return jsonify({'msg': 'No authority to eidt this user info'}), 401
    
    """----------------------------------------
                    Check user online
    -------------------------------------------"""
    @customer_bp.route('/customers/loggedin', methods=['GET'])
    @login_required
    def logged_in():
        return jsonify(success=True)
        
    """----------------------------------------------------------------------------------------------------              
                                      Func2
    ----------------------------------------------------------------------------------------------------"""


    """----------------------------------------
                    Book voucher
    -------------------------------------------"""


    @customer_bp.route('/customers/voucher/book', methods=['PUT'])
    @login_required
    def book_voucher():
        voucher_id = request.form.get('voucher_id')
        result = Vouchers.query.filter(
            Vouchers.id == voucher_id, Vouchers.number > 0).first()
        check_Vouchers = has_vouchers.query.filter_by(
            voucher_id=voucher_id).first()
        if check_Vouchers:
            return jsonify({'msg': 'The Voucher has been received.'}), 403
        if result is None:
            return jsonify({'msg': 'No such voucher.'}), 404
        else:
            result.number -= 1
            code = generate_code()
            book_vou = has_vouchers(voucher_id=result.id,
                                    customer_id=current_user.get_id(),
                                    code=code,
                                    start_=result.start_,
                                    end_=result.end_
                                    )
            db.session.add(book_vou)
            db.session.commit()
            response = {
                'msg': 'User books vocher successfully'
            }
            return jsonify(response), 200


    """----------------------------------------
            Search for all Eateries
    -------------------------------------------"""
    # customers_eateries


    @customer_bp.route('/customers/eateries', methods=['GET'])
    #@login_required
    def user_find_eateries():
        all_eatery_users_info = Eatery_User.query.all()
        response_users_info = {
            'msg': 'Eateries successful found!',
            'data': model_list_to_list(all_eatery_users_info)
        }
        return jsonify(response_users_info), 200


    """----------------------------------------
        Search for customer self vouchers
    -------------------------------------------"""


    @customer_bp.route('/customers/vouchers', methods=['GET'])
    @login_required
    def customers_find_self_vouchers():
        self_vouchers = customers_vouchers_info(current_user.get_id())
        if not self_vouchers:
            return jsonify({'msg': 'No vouchers.'}), 200
        else:
            response_users_info = {
                'msg': 'Self_vouchers successful found!',
                'data': self_vouchers
            }
            return jsonify(response_users_info), 200


    """--------------------------------------------------------
            Search for certain eateries vouchers by eatery_id 
    -------------------------------------------------------------"""


    @customer_bp.route('/customers/eateries/vouchers/<int:eatery_id>', methods=['GET'])
    @login_required
    def customers_find_eatery_vouchers(eatery_id):
        #eatery_id = request.form.get('eatery_id')
        eatery_vouchers = Vouchers.query.filter(
            Vouchers.eatery_id == eatery_id, Vouchers.number > 0).all()
        if not eatery_vouchers:
            return jsonify({'msg': 'No vouchers.'}), 200
        else:
            response_users_info = {
                'msg': 'eatery vouchers successful found!',
                'data': model_list_to_list(eatery_vouchers)
            }
            return jsonify(response_users_info), 200
    """--------------------------------------------------------
            Search for eatery_name bu eatery_id 
    -------------------------------------------------------------"""
    @customer_bp.route('/customers/eateries/<int:eatery_id>', methods=['GET'])
    @login_required
    def get_eateryName_by_id(eatery_id):
        eatery = Eatery_User.query.filter_by(id=eatery_id).first()
        res = {
            'eatery_name': eatery.name
        }
        return jsonify(res), 200
    
    
    """----------------------------------------------------------------------------------------------------              
                                        Func4
    ----------------------------------------------------------------------------------------------------"""
    # function4业务逻辑：
    # 首先前端需要传进来discount, cuisine, eatery_name, location以及code
    # 对不同字段是否为默认值进行判断后，search匹配字段的商家数据


    @customer_bp.route('/customers/eateries/search', methods=['POST'])
    #@login_required
    def customers_search_eateries():
        data = request.get_json()
        discount_start = int(data['discount_start'])
        discount_end = int(data['discount_end'])
        cuisine = data['cuisine']
        city = data['city']
        state = data['state']
        suburb = data['suburb']
        postcode = data['postcode']
        eatery_name = data['eatery_name']

        query = Eatery_User.query
        if discount_start != 0:
            query = query.join(Vouchers, Eatery_User.id == Vouchers.eatery_id) \
                        .filter(Vouchers.discount_percentage >= discount_start, \
                                Vouchers.discount_percentage <= discount_end)
        if cuisine and cuisine.lower() != 'all':
            query = query.filter(func.lower(Eatery_User.cuisine) == func.lower(cuisine))

        if city and city.lower() != 'all':
            query = query.filter(func.lower(Eatery_User.city) == func.lower(city))

        if state and state.lower() != 'all':
            query = query.filter(func.lower(Eatery_User.state) == func.lower(state))

        if suburb and suburb.lower() != 'all':
            query = query.filter(func.lower(Eatery_User.suburb) == func.lower(suburb))

        if postcode and postcode.lower() != 'all':
            query = query.filter(Eatery_User.postcode.ilike(f'%{postcode}%'))

        if eatery_name and eatery_name.lower() != 'all':
            # regex_pattern = f'.*{re.escape(eatery_name)}.*'
            # query = query.filter(Eatery_User.name.op('REGEXP')(regex_pattern))
            query = query.filter(Eatery_User.name.ilike(f'%{eatery_name}%'))

        # Execute the query and fetch the results
        search_reasult = query.all()
        if not search_reasult:
            return jsonify({'msg': 'No eateries.'}), 404
        else:
            response_users_info = {
                'msg': 'eateries successful found!',
                'data': model_list_to_list(search_reasult)
            }
            return jsonify(response_users_info), 200



    """----------------------------------------------------------------------------------------------------              
                    Func6: Customers add reviews and ratings where they use voucher for
    ----------------------------------------------------------------------------------------------------"""
    # function6业务逻辑：
    # 1. 首先通过customer的id查询该用户所有的history（包括voucher以及餐），按照用餐时间降序排列。前端的history应该包含餐厅名字
    #     voucher code， voucher信息， 以及用户评论和打分（没有的话显示为空）
    #               前端直接在record中显示一个框为review和rating，内容如果有就显示在框中，用户的按钮都为eidt your review and rating
    # 2. 用户选择想要添加评论的voucher，点击之后前端返回该voucher的code，eatery的id，以及添加的review和rating给后端，
    #    后端将数据添加进history的表中，并且更新该商家的average rating添加进eateries的表中
    # 3. 之后网页自动跳转回customer的history页面.添加完评论后该history记录按钮从add comment变成eidt review and rating
    # 4. customer之后可以点击编辑或者删除评论，并且可以通过点击history记录上的eatery name来跳转到该eatery的全部review和rating界面
    # 5. 用户如果想要删除review或者rating，rating的下拉选项中有None，0，1，2，3，4，5，只需要选择None并且令review框为空submit
    # 6. 其中添加了判断，如果商家账号已经注销了，通过history的信息显示的record中，用户点击“前往商家”会显示商家不存在提示；并且在用户不能够添加评论。
    #       在获取顾客感兴趣商家的评论时如果商家已经注销了账号，也会提示商家不存在。
    
    """--------------------------------------------------------
                    Customer get all history 
    -------------------------------------------------------------"""
    # 前端用GET请求，获取当前用户的全部历史使用记录，包括了eatery id， voucher id， review， rating
    #
    # 如果有使用记录，返回200ok， history found信息，以及所有历史记录
    # 如果没有历史记录， 返回404， no history的信息
    #
    @customer_bp.route('/customers/history', methods=['GET'])
    @login_required
    def customers_history():
        user_id = int(current_user.get_id())
        # 按照voucher使用时间降序排列history
        all_history = History.query.filter_by(customer_id=user_id).order_by(desc(History.use_voucher_time)).all()
        if all_history:
            
            # 构建结果字典列表
            results = []
            for history in all_history:
                eatery = Eatery_User.query.get(history.eatery_id)
                #获取每一条history的字典
                history_dict = history.dict()
                #在每一条字典里添加eatery_name和eatery_avatar（要判断是否有avatar)
                if eatery:
                    history_dict['eatery_name'] = eatery.name
                    if eatery.avatar:
                        history_dict['eatery_avatar'] = eatery.avatar
                else:
                    history_dict['eatery_name'] = "Unkonwn eatery"
                
                results.append(history_dict)
                    
            
            response = {
                'msg': 'History found!',
                'data': model_list_to_dict(all_history)
            }
            return jsonify(results), 200
        else:
            return jsonify({'msg': 'No history!'}), 404
    
    
    """--------------------------------------------------------
                    Add review and rating 
    -------------------------------------------------------------"""
    #
    # 用户点击想要添加评论的voucher之后，添加review和rating
    #
    # 不论之前有没有添加review 和 rating，都会显示在record上，所以用户可以通过编辑review和rating框中的内容并且点击submit来添加或者更新review和rating
    #
    @customer_bp.route('/customers/add_review_rating/<int:historyid>', methods=['POST'])
    @login_required
    def customers_add_review_rating(historyid):
        
        customer_id = current_user.get_id()
        review = request.form.get('review')
        rating = request.form.get('rating')
        
        history_to_update = History.query.filter_by(id=historyid).first()
        
        if history_to_update:
        
            eatery_id = history_to_update.eatery_id
            
            #Get current_time
            current_review_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            # 先判断该eatery是不是已经注销了账号
            #
            eatery_user = Eatery_User.query.filter_by(id=eatery_id).first()
            # 账号存在
            if eatery_user:
                
                #
                # 添加评论和打分以及时间到数据库
                #
                history_to_update.review = review
                history_to_update.rating = rating
                history_to_update.review_time = current_review_time
                try:
                    db.session.commit()  # commit transaction
                except Exception as e:
                    db.session.rollback()  # rollback when abnormal
                    print(e, '[Error] in [/customers/register] [POST] when inserting a user into MySQL.')
                    response = {
                        'msg': 'Server error, please try again later.'
                    }
                    return jsonify(response), 500
                #
                # 重新计算该商家的平均分数并且添加到eateries表中
                #
                eatery_avg_rating = db.session.query(func.round(func.avg(History.rating), 2)).filter(History.eatery_id == eatery_id).scalar()
                eatery_user_to_update = Eatery_User.query.filter_by(id=eatery_id).first()
                # 如果商家的rating计算出来为Null，那么显示0.0
                eatery_user_to_update.average_rating = eatery_avg_rating if eatery_avg_rating is not None else 0.0
                try:
                    db.session.commit()  # commit transaction
                except Exception as e:
                    db.session.rollback()  # rollback when abnormal
                    print(e, '[Error] in [/customers/register] [POST] when inserting a user into MySQL.')
                    response = {
                        'msg': 'Server error, please try again later.'
                    }
                    return jsonify(response), 500
                
                return jsonify({'msg': 'Review and rating added success'}), 200
                
            # eatery 账号已经注销了
            else:
                return jsonify({'msg': 'Eatery account does not exist!'}), 400
        else:
            return jsonify({'msg': 'History record not found'}), 404
        
    """--------------------------------------------------------
        Show all review_rating of eatery that customer interested in 
    -------------------------------------------------------------"""
    #
    # 用户可以查看感兴趣的eatery的所有review rating以及平均rating
    #
    @customer_bp.route('/customers/check_review_rating/<int:eatery_id>', methods=['GET'])
    @login_required
    def customers_check_review_rating(eatery_id):
        
        #
        # 首先查询eatery是否注销
        #
        eatery_user = Eatery_User.query.filter_by(id=eatery_id).first()
        if eatery_user:
        
            all_history = History.query.filter_by(eatery_id=eatery_id).order_by(desc(History.review_time)).all()
            
            if all_history:
                # 拿到按时间降序排列的reviews的列表
                response = [
                    {'review': r.review, 
                    'rating': r.rating, 
                    'review_time': r.review_time,
                    'customer_username': Customer_User.query.filter_by(id=r.customer_id).first().name if Customer_User.query.filter_by(id=r.customer_id).first() else "Unknown User",
                    'customer_avatar': Customer_User.query.filter_by(id=r.customer_id).first().avatar if Customer_User.query.filter_by(id=r.customer_id).first() else "Unknown"
                    } 
                    for r in all_history
                    if r.review is not None
                ]
                
                return jsonify(response), 200
            else:
                return jsonify({'msg': 'No review or rating for this eatery'}), 200
        
        else:
            return jsonify({'msg': 'Eatery account does not exist!'}), 404
    
    
    """--------------------------------------------------------
        Get history by historyID 
    -------------------------------------------------------------"""
    #
    # 接收前端historyID，返回history
    #
    @customer_bp.route('/customers/singleHistory/<int:historyid>', methods=['GET'])
    @login_required
    def get_single_history_record(historyid):
        
        
        historyRecord = History.query.filter_by(id=int(historyid)).first()
        
        response = {
            'review': historyRecord.review,
            'rating': historyRecord.rating,
            'eatery_id': historyRecord.eatery_id,
        }

        # 拿到eatery名字和头像
        # 先判断该eatery是不是已经注销了账号
        #
        eatery_user = Eatery_User.query.filter_by(id=historyRecord.eatery_id).first()
        
        response['eatery_name'] = eatery_user.name
        response['eatery_avatar'] = eatery_user.avatar
        
        return jsonify(response), 200
    
    """----------------------------------------------------------------------------------------------------              
                                        Func8
    ----------------------------------------------------------------------------------------------------"""


    @customer_bp.route('/customers/eateries/sorted', methods=['POST'])
    def customers_eateries_sorted():
        data = request.get_json()
        cuisine = data['cuisine']
        city = data['city']
        state = data['state']
        suburb = data['suburb']

        query = Eatery_User.query
        if cuisine and cuisine.lower() != 'all':
            query = query.filter(func.lower(
                Eatery_User.cuisine) == func.lower(cuisine))

        if city and city.lower() != 'all':
            query = query.filter(func.lower(Eatery_User.city) == func.lower(city))

        if state and state.lower() != 'all':
            query = query.filter(func.lower(Eatery_User.state)
                                == func.lower(state))

        if suburb and suburb.lower() != 'all':
            query = query.filter(func.lower(Eatery_User.suburb)
                                == func.lower(suburb))

        # Sorting by average rating in descending order (highest first)
        query = query.order_by(Eatery_User.average_rating.desc())

        # Execute the query and get the sorted results
        sorted_eateries = query.all()
        if not sorted_eateries:
            return jsonify({'msg': 'No eateries.'}), 404
        else:
            response_users_info = {
                'msg': 'eateries successful sorted!',
                'data': model_list_to_list(sorted_eateries)
            }
            return jsonify(response_users_info), 200
        

    
    #login_manager.user_loader(load_user)
    
    return customer_bp
    
# Register for blueprint
customer_bp = create_customer_blueprint()

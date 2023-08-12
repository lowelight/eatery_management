from flask import request, jsonify, Blueprint, send_from_directory
from extensions import *
from models import *
from utils import *
from flask_login import login_user, logout_user, login_required, current_user
from forms import *
from sqlalchemy import desc, func


eatery_bp = Blueprint('eatery', __name__)

    
def create_eatery_blueprint():
    eatery_bp = Blueprint('eatery', __name__)
    """-----------------------------------------------------------------           
                                Function 1
    --------------------------------------------------------------------"""

    """----------------------------------------
                Search for all users
    -------------------------------------------"""
    # Eatery_users
    @eatery_bp.route('/eateries', methods=['GET'])
    def user_find_all():
        all_eatery_users_info = Eatery_User.query.all()
        response_users_info = {
            'msg': 'User successful found!',
            'data': model_list_to_dict(all_eatery_users_info)
        }
        return jsonify(response_users_info), 200

    """----------------------------------------
            Search for certain user by ID
    -------------------------------------------"""
    # Search for user by userID
    # return 200 if exits, else 404

    # Eatery user
    @eatery_bp.route('/eateries/<int:user_id>', methods=['GET'])
    def find_user_by_id(user_id):
        user = Eatery_User.query.get(user_id)
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
    @eatery_bp.route('/eateries/check_username', methods=['POST'])
    def check_username():
        form = EaterySignUpForm()
        username = form.username.data
        user = Eatery_User.query.filter_by(name=username).first()
        if user:
            return jsonify({'msg': '1'}),200
        else:
            return jsonify({'msg': '0'}),200

    # API to actively check if email already exits
    @eatery_bp.route('/eateries/check_email', methods=['POST'])
    def check_email():
        form = EaterySignUpForm()
        email = form.email.data
        #email = request.form.get('email') 
        # Check if the user_name has already been registered
        user_email = Eatery_User.query.filter_by(email=email).first()
        if user_email:
            return jsonify({'msg': '1'}),200
        else:
            return jsonify({'msg': '0'}),200
    # API to actively check if phone_number already exits
    @eatery_bp.route('/eateries/check_phonenum', methods=['POST'])
    def check_phonenum():
        form = EaterySignUpForm()
        phone_number = form.phone_number.data
        #phone_number = request.form.get('phone_number')  
        # Check if the user_name has already been registered
        user_phonenum = Eatery_User.query.filter_by(phone_number=phone_number).first()
        if user_phonenum:
            return jsonify({'msg': '1'}),200
        else:
            return jsonify({'msg': '0'}),200

    # Eatery register main function
    @eatery_bp.route('/eateries/register', methods=['POST'])
    def user_register():
        
        form = EaterySignUpForm()
        if form.validate_on_submit():
            
            username = form.username.data
            password = form.password.data
            bussiness_hours_start = form.bussiness_hours_start.data
            bussiness_hours_end = form.bussiness_hours_end.data
            address = form.address.data
            suburb = form.suburb.data
            city = form.city.data
            state = form.state.data
            postcode = form.postcode.data
            email = form.email.data
            phone_number = form.phone_number.data
            cuisine = form.cuisine.data
            avatar = None
            menu = None
            description = None
            average_rating = None

            user = Eatery_User.query.filter_by(name=username).first()
            if user:
                return jsonify({'msg': 'User already used!'})
            
            # 4. Register user to database
            user = Eatery_User( name=username, 
                                password=password,
                                address=address,
                                suburb=suburb,
                                city=city,
                                state=state,
                                postcode=postcode,
                                cuisine=cuisine,
                                phone_number=phone_number,
                                email=email,
                                bussiness_hours_start=bussiness_hours_start,
                                bussiness_hours_end=bussiness_hours_end,
                                avatar=avatar,
                                menu=menu,
                                description=description,
                                average_rating=average_rating
                                )
            try:
                db.session.add(user)
                db.session.commit()  # commit transaction
            except Exception as e:
                db.session.rollback()  # rollback when abnormal
                print(e, '[Error] in [/eateries/register] [POST] when inserting a user into MySQL.')
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
        #return render_template('register.html', form=form)

    """----------------------------------------
                    User login
    -------------------------------------------"""
    @eatery_bp.route('/eateries/login', methods=['POST'])
    def user_login():
        
        form = UserLoginForm()
        if form.validate_on_submit():
            
            username = form.username.data
            password = form.password.data
            
            #user = Customer_User.objects(username=username, password=password).first()
            user = Eatery_User.query.filter_by(name=username, password=password).first()
            
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
        #return render_template('login.html', form=form)

    """----------------------------------------
                Get user info when is online
    -------------------------------------------"""
    @eatery_bp.route('/eateries/user_info', methods=['GET'])
    def user_info():
        if current_user.is_authenticated:
            response = {"code": 200,
                        "data": current_user.dict()}
        else:
            response = {"code": 401,
                        "data": {"message": "User not authenticated"}}
        return jsonify(**response)

    """----------------------------------------
                    User logout
    -------------------------------------------"""
    @eatery_bp.route('/eateries/logout', methods=['GET'])
    @login_required
    def user_logout():
        logout_user()
        return jsonify({'code': 200, 'msg': 'Logout success!'})

    """----------------------------------------
                User information update
    -------------------------------------------"""
    #获取avatar图片文件
    @eatery_bp.route('/eateries/sendAvatar', methods=['GET'])
    @login_required
    def send_file():
        filepath = request.form.get('avatar')
        directory = filepath.split('/')[0]
        filename = filepath.split('/')[1]
        return send_from_directory(directory, filename)
    
    
    @eatery_bp.route('/eateries/update', methods=['GET', 'PUT'])
    @login_required
    def update(): 
    #if int(current_user.get_id()) == id:
        id = int(current_user.get_id())
        if request.method == 'PUT':
            user_to_update = Eatery_User.query.get_or_404(id)
            #username
            user_to_update.name = request.form.get('username')
            #password
            if not request.form.get('password'):
                return jsonify({'code': 401, 'msg': 'Password can not be empty!'})
            user_to_update.password = request.form.get('password')
            #bussiness hours start
            bussiness_hours_start = request.form.get('bussiness_hours_start')
            if not check_hours(bussiness_hours_start):
                response = {
                    'msg': 'Invalid bussiness hours format. Please use H:M.'
                }
                return jsonify(response), 400
            user_to_update.bussiness_hours_start = bussiness_hours_start
            #bussiness hours end
            bussiness_hours_end = request.form.get('bussiness_hours_end')
            if not check_hours(bussiness_hours_end):
                response = {
                    'msg': 'Invalid bussiness hours format. Please use H:M.'
                }
                return jsonify(response), 400
            user_to_update.bussiness_hours_end = bussiness_hours_end
            #email
            user_to_update.email = request.form.get('email')
            #phone number
            user_to_update.phone_number = request.form.get('phone_number')
            #address
            user_to_update.address = request.form.get('address')
            user_to_update.suburb = request.form.get('suburb')
            user_to_update.city = request.form.get('city')
            user_to_update.state = request.form.get('state')
            user_to_update.postcode = request.form.get('postcode')
            #cuisine
            user_to_update.cuisine = request.form.get('cuisine')
            #avatar
            if 'avatar' in request.files:
                file = request.files['avatar']
                filename = file.filename
                filepath = 'Static/'+filename
                file.save(filepath)
                user_to_update.avatar = filepath
            
            #menu
            if 'menu' in request.files:
                file = request.files['menu']
                filename = file.filename
                filepath = 'Static/'+filename
                file.save(filepath)
                user_to_update.menu = filepath
            
            #description
            user_to_update.description = request.form.get('description')
            
            db.session.commit()
            response = {
                        'msg': 'Update success',
                        "data": user_to_update.dict()}
            return jsonify(response), 200
        
        elif request.method == 'GET':
            user_to_update = Eatery_User.query.get_or_404(id)
            response = {"code": 200,
                        "data": user_to_update.dict()}
            return jsonify(response)
            
    #else:
        #return jsonify({'msg': 'No authority to eidt this user info'})

    """----------------------------------------
                    Delect account
    -------------------------------------------"""
    @eatery_bp.route('/eateries/delete', methods=['DELETE'])
    @login_required
    def delete_user():
        
    #if int(current_user.get_id()) == id:
        id = int(current_user.get_id())
        user_to_delete = Eatery_User.query.get_or_404(id)

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
    @eatery_bp.route('/eateries/loggedin', methods=['GET'])
    @login_required
    def logged_in():
        return jsonify(success=True)
        
        
    """----------------------------------------------------------------------------------------------------              
                                      Func2
    ----------------------------------------------------------------------------------------------------"""



    """----------------------------------------
                    Offer discount voucher
    -------------------------------------------"""
    @eatery_bp.route('/eateries/voucher/offer', methods=['POST'])
    @login_required
    def offer_voucher():
        form = EateryOfferVoucher()
        if form.validate_on_submit():
            discount = form.discount_percentage.data
            start_ = form.start_.data
            end_ = form.end_.data
            eatery_id = current_user.get_id()
            set_number = form.set_number.data
            vou = Vouchers(     eatery_id=eatery_id,
                                discount_percentage=discount,
                                start_=start_,
                                end_=end_,
                                set_number = set_number,
                                number = set_number
                                )
            try:
                db.session.add(vou)
                db.session.commit()  # commit transaction
            except Exception as e:
                db.session.rollback()  # rollback when abnormal
                print(e, '[Error] in [/eateries/voucher/offer] [POST] when inserting a voucher into MySQL.')
                response = {
                    'msg': 'Server error, please try again later.'
                }
                return jsonify(response), 500
            response = {
                'msg': 'Voucher offered successful!',
                'data': vou.dict()
            }
            return jsonify(response), 200
            
    """----------------------------------------
        Search for eatery self vouchers
    -------------------------------------------"""
    @eatery_bp.route('/eateries/vouchers', methods=['GET'])
    @login_required
    def eateries_find_self_vouchers():
            self_vouchers = Vouchers.query.filter_by(eatery_id=current_user.get_id()).all()
            if not self_vouchers:
                return jsonify({'msg': 'No vouchers.'}), 404
            else:
                response_users_info = {
                    'msg': 'self_vouchers successful found!',
                    'data': model_list_to_list(self_vouchers)
                }
                return jsonify(response_users_info), 200

    """----------------------------------------
            Delect eatery self voucher
    -------------------------------------------"""
    @eatery_bp.route('/eateries/vouchers/delete', methods=['DELETE'])
    @login_required
    def delete_eatery_self_voucher():
        delete_voucher_id = request.form.get('id')
        print(delete_voucher_id)
        eatery_to_delete_voucher = Vouchers.query.get_or_404(delete_voucher_id)
        db.session.delete(eatery_to_delete_voucher)
        db.session.commit()
        response = {
            'msg': 'voucher delete success'
        }
        return jsonify(response), 200



    """----------------------------------------------------------------------------------------------------              
                                             Func3
     ----------------------------------------------------------------------------------------------------"""
    # # function3业务逻辑：
    # # 前端传进来weekly voucher的开始时间start_, weekday, discount_percentage，set_number
    # # 注意weekday设置为"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
    # # 后端接收存进table Voucher中

    # """----------------------------------------
    #         Offer weekly discount voucher
    # -------------------------------------------"""


    @eatery_bp.route('/eateries/voucher/weekly_offer', methods=['POST'])
    @login_required
    def offer_weekly_voucher():
        form = EateryOfferWeeklyVoucher()
        if form.validate_on_submit():
            discount = form.discount_percentage.data
            weekday = form.weekday.data
            start_ = weekly_voucher_settime(form.start_.data, weekday)
            end_ = start_
            eatery_id = current_user.get_id()
            set_number = form.set_number.data
            vou = Vouchers(eatery_id=eatery_id,
                            discount_percentage=discount,
                            weekday=weekday,
                            start_=start_,
                            end_=end_,
                            set_number=set_number,
                            number=set_number
                            )
            try:
                db.session.add(vou)
                db.session.commit()  # commit transaction
            except Exception as e:
                db.session.rollback()  # rollback when abnormal
                print(
                    e, '[Error] in [/eateries/voucher/weekly_offer] [POST] when inserting a voucher into MySQL.')
                response = {
                    'msg': 'Server error, please try again later.'
                }
                return jsonify(response), 500
            response = {
                'msg': 'Voucher offered successful!',
                'data': vou.dict()
            }
            return jsonify(response), 200

    """----------------------------------------------------------------------------------------------------              
                                            Func4
    ----------------------------------------------------------------------------------------------------"""
    # function4业务逻辑：
    # 首先前端需要传进来discount, cuisine, eatery_name, location以及code
    # 对不同字段是否为默认值进行判断后，search匹配字段的商家数据


    @eatery_bp.route('/eateries/search', methods=['POST'])
    #@login_required
    def eateries_search_eateries():
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



    """----------------------------------------
        Search for eatery self normal vouchers
    -------------------------------------------"""
    @eatery_bp.route('/eateries/vouchers/normal', methods=['GET'])
    @login_required
    def eateries_find_self_normal_vouchers():
            self_vouchers = Vouchers.query.filter_by(eatery_id=current_user.get_id(),weekday=None).all()
            if not self_vouchers:
                return jsonify({'msg': 'No vouchers.'}), 404
            else:
                response_users_info = {
                    'msg': 'self_vouchers successful found!',
                    'data': model_list_to_list(self_vouchers)
                }
                return jsonify(response_users_info), 200

    """----------------------------------------
        Search for eatery self  weekly vouchers
    -------------------------------------------"""
    @eatery_bp.route('/eateries/vouchers/weekly', methods=['GET'])
    @login_required
    def eateries_find_self_weekly_vouchers():
            self_vouchers = Vouchers.query.filter(Vouchers.eatery_id==current_user.get_id(), Vouchers.weekday != None).all()
            if not self_vouchers:
                return jsonify({'msg': 'No vouchers.'}), 404
            else:
                response_users_info = {
                    'msg': 'self_vouchers successful found!',
                    'data': model_list_to_list(self_vouchers)
                }
                return jsonify(response_users_info), 200
            
    
    """----------------------------------------------------------------------------------------------------              
                                      Func5
    ----------------------------------------------------------------------------------------------------"""
    """--------------------------------------------------------
            check code by voucher_id 
    -------------------------------------------------------------"""
    @eatery_bp.route('/eateries/vouchers/verify', methods=['POST'])
    @login_required
    def customers_show_code():
            eatery_id=current_user.get_id()
            #data = request.get_json()
            #code=data.get('code')
            data = request.get_json()
            code = data['code']
            
            print(code)
            voucher_record= db.session.query(Vouchers, has_vouchers,Eatery_User)\
                .join(has_vouchers, has_vouchers.voucher_id==Vouchers.id)\
                .join(Eatery_User, Eatery_User.id==Vouchers.eatery_id)\
                    .filter(has_vouchers.code ==code,Eatery_User.id == eatery_id).first()
            if not voucher_record:
                return jsonify({'msg': 'No such voucher or voucher has been used.'}), 404
            else:
                response_users_info = {
                    'data': redeemList(voucher_record),
                    'msg' : 'Voucher Available'
                    
                }
                return jsonify(response_users_info), 200
            
    """--------------------------------------------------------
            redeem code 
    -------------------------------------------------------------"""
    @eatery_bp.route('/eateries/vouchers/use', methods=['POST'],endpoint='eatery_use_code')
    @login_required
    def customers_show_code():
            eatery_id=current_user.get_id()
            data = request.get_json()
            code = data['code']
            voucher_record= db.session.query(Vouchers, has_vouchers,Eatery_User)\
                .join(has_vouchers, has_vouchers.voucher_id==Vouchers.id)\
                .join(Eatery_User, Eatery_User.id==Vouchers.eatery_id)\
                    .filter(has_vouchers.code ==code,Eatery_User.id == eatery_id).first()
            voucher_record=model_list_to_list(voucher_record)
            
            if not voucher_record:
                return jsonify({'msg': 'No such voucher or voucher has been used.'}), 404
            eatery_id_1 = voucher_record[2]['id']
            customer_id = voucher_record[1]["customer_id"]
            discount = voucher_record[0]['discount_percentage']
            weekday = voucher_record[0]['weekday']
            start_ = voucher_record[0]['start_']
            end_ = voucher_record[0]['end_']
            code1 = voucher_record[1]['code']
            use_voucher_time =datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            his = History(customer_id=customer_id,
                        eatery_id=eatery_id_1,
                        discount_percentage=discount,
                        weekday=weekday,
                        start_=start_,
                        end_=end_,
                        code=code1,
                        use_voucher_time=use_voucher_time)
            db.session.add(his)
            db.session.commit()


            delete = has_vouchers.query.filter_by(code=code).first()
            if delete:
                db.session.delete(delete)
                db.session.commit()

            response_users_info = {
                'result' : 'Voucher used!'
            }
            return jsonify(response_users_info), 200


    
    
    """----------------------------------------------------------------------------------------------------              
                    Func6: Eatery can check their own reviews ratings and average_ratings
    ----------------------------------------------------------------------------------------------------"""
    # function6业务逻辑：
    # 商家只能查看自己的review rating 以及平均rating
    # 如果顾客已经注销了账户，评论历史记录还会在，但是顾客用户名和头像都会显示unknown
    """--------------------------------------------------------
        Show all review_rating of current eatery 
    -------------------------------------------------------------"""
    #
    # 商家可以查看自己的
    #
    @eatery_bp.route('/eateries/check_review_rating', methods=['GET'])
    @login_required
    def eateries_check_review_rating():
        
        eatery_id = current_user.get_id()
        all_history = History.query.filter_by(eatery_id=eatery_id).order_by(desc(History.review_time)).all()
        
        if all_history:
            
            # 拿到按时间降序排列的reviews的列表
            response = [{'review': r.review, 
                         'rating': r.rating, 
                         'review_time': r.review_time,
                         # 如果用户已经删除账号，那么customer_id是找不到的
                         'customer_username': Customer_User.query.filter_by(id=r.customer_id).first().name if Customer_User.query.filter_by(id=r.customer_id).first() else "Unknown User",
                         'customer_avatar': Customer_User.query.filter_by(id=r.customer_id).first().avatar if Customer_User.query.filter_by(id=r.customer_id).first() else "Unknown"} for r in all_history]
            
            return jsonify(response), 200
        else:
            return jsonify({'msg': 'No review or rating for your eatery'}), 404
        
    """----------------------------------------------------------------------------------------------------              
                                        Func8
    ----------------------------------------------------------------------------------------------------"""


    @eatery_bp.route('/eateries/sorted', methods=['POST'])
    def eateries_sorted():
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
    
    return eatery_bp

# Register for blueprint
eatery_bp = create_eatery_blueprint()

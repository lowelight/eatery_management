from datetime import datetime, timedelta
from flask import jsonify
import random
import string
from models import *
from sqlalchemy import text

"""This func is used to transfer LIST type model to dict"""

def model_list_to_dict(Model_list):
    result = {}
    for index, model in enumerate(Model_list):
        result.update({index: model.dict()})
    return result

def model_list_to_list(Model_list):
    result = []
    for model in Model_list:
        result.append(model.dict())
    return result

'''This function is used to check if the date format is correct'''
def Check_date_format(date_str):
     # check date format
    try:
        date_obj = datetime.strptime(date_str, '%y-%m-%d').date()
        return True
    except (ValueError, TypeError):
        return False

'''This function is used to check if users input hours between 00-23'''
def check_hours(time_str):
    
    try:
        time_obj = datetime.strptime(time_str, '%H:%M').time()
        return True
    except (ValueError, TypeError):
        return False
    
'''检查上传文件后缀'''
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # 允许的文件扩展名
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# 该功能用于生成六位数code
def generate_code():
    # 生成由大小写英文字母和数字组成的字符集
    characters = string.ascii_letters + string.digits
    # 生成六位数code
    code = ''.join(random.choice(characters) for _ in range(6))
    while True:
        check_code_has_vouchers = has_vouchers.query.filter_by(
            code=code).first()
        check_code_History = History.query.filter_by(code=code).first()
        if not check_code_has_vouchers and not check_code_History:
            break
        else:
            code = ''.join(random.choice(characters) for _ in range(6))
    return code

def redeemList(voucher_record):
    voucher_record = model_list_to_list(voucher_record)
    eatery_name = voucher_record[2]['name']
    eatery_id_1 = voucher_record[2]['id']
    customer_id = voucher_record[1]["customer_id"]
    discount = voucher_record[0]['discount_percentage']
    weekday = voucher_record[0]['weekday']
    start_ = voucher_record[0]['start_']
    end_ = voucher_record[0]['end_']
    code1 = voucher_record[1]['code']
    city = voucher_record[2]['city']
    dict_item = {
        'start_': start_,
        'end_': end_,
        'discount_percentag': discount,
        'eatery_name': eatery_name,
        'weekday': weekday,
        'code' : code1,
        'city': city
    }

    return dict_item

def customers_vouchers_info(customer_id):
    sql = text(f"SELECT has_vouchers.*, Vouchers.discount_percentage, Eateries.name, Eateries.city \
               FROM has_vouchers \
               JOIN Vouchers ON Vouchers.id = has_vouchers.voucher_id \
               JOIN Eateries ON Eateries.id = Vouchers.eatery_id \
               WHERE has_vouchers.customer_id = {customer_id};")
    vouchers_info = db.session.execute(sql).all()
    result = []
    for item in vouchers_info:
        dict_item = {
            'id': item[0],
            'voucher_id': item[1],
            'customer_id': item[2],
            'code': item[3],
            'start_': item[4].strftime('%Y-%m-%d'),
            'end_': item[5].strftime('%Y-%m-%d'),
            'discount_percentage': item[6],
            'eatery_name': item[7],
            'eatery_city': item[8]
        }
        result.append(dict_item)
    return result

# 根据weekly voucher的开始时间，设置weekday对应voucher当天的start_和end_
def weekly_voucher_settime(start_, weekday):
    weekday_list = ["Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday", "Sunday"]
    set_weekday_index = weekday_list.index(weekday)
    print(set_weekday_index)
    start_weekday = start_.weekday()
    print(start_weekday)
    # start_weekday_index = weekday_list.index(start_weekday)
    days_diff = (set_weekday_index - start_weekday) % 7
    date= start_ + timedelta(days=days_diff)
    return date
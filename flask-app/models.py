from extensions import *
from sqlalchemy import Time
from datetime import datetime



"""--------------------------------------
    Object Table of Users Image from MySQL
-----------------------------------------"""
class Customer_User(db.Model):
    __tablename__ = 'Customers'  
    id = db.Column('id', db.Integer, primary_key=True)
    name  = db.Column('name', db.String(255),unique=True)
    password = db.Column('password', db.String(255))
    gender = db.Column(db.String, name='gender')
    birthday = db.Column('birthdate', db.Date)
    phone_number = db.Column('phone_number', db.String(255))
    email = db.Column('email', db.String(255))
    avatar= db.Column('avatar', db.String(255))
    
    def dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'gender': self.gender,
            'birthday': self.birthday,
            'phone_number': self.phone_number,
            'email': self.email,
            'avatar': self.avatar
        }
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def get_id(self):
        return str(self.id)
    
class Eatery_User(db.Model):
    __tablename__ = 'Eateries'  
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(255),unique=True)
    password = db.Column('password', db.String(255))
    address = db.Column(db.String(255), name='address')
    suburb = db.Column(db.String(255), name='suburb')
    city = db.Column(db.String(255), name='city')
    state = db.Column(db.String(255), name='state')
    postcode = db.Column(db.String(255), name='postcode')
    cuisine = db.Column(db.String(255), name='cuisine')
    avatar= db.Column('avatar', db.String(255))
    phone_number = db.Column('phone_number', db.String(255))
    bussiness_hours_start = db.Column(Time(timezone=False), name='start_time')
    bussiness_hours_end = db.Column(Time(timezone=False), name='end_time')
    email = db.Column('email', db.String(255))
    menu = db.Column('menu', db.String(255))
    description = db.Column('description', db.String(1000))
    average_rating = db.Column('average_rating', db.Numeric(precision=2, asdecimal=True, scale=1))

    def dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'address': self.address,
            'suburb': self.suburb,
            'city': self.city,
            'state': self.state,
            'postcode': self.postcode,
            'cuisine': self.cuisine,
            'phone_number': self.phone_number,
            'email': self.email,
            'bussiness_hours_start': self.bussiness_hours_start.strftime('%H:%M'),
            'bussiness_hours_end': self.bussiness_hours_end.strftime('%H:%M'),
            'avatar': self.avatar,
            'menu': self.menu,
            'description': self.description,
            'average_rating': self.average_rating
        }
        
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def get_id(self):
        return str(self.id)

class favourite_list(db.Model):
    __tablename__ = 'favourite_list'  
    id = db.Column('id', db.Integer, primary_key=True)
    customer_id = db.Column('customer_id', db.Integer, db.ForeignKey('Customers.id'))
    eatery_id = db.Column('eatery_id', db.Integer, db.ForeignKey('Eateries.id'))


'''class Cuisines(db.Model):
    __tablename__ = 'Cuisines' 
    id = db.Column('id', db.Integer, primary_key=True)
    cuisine_name = db.Column('cuisine_name', db.String(255))

class has_cuisines(db.Model):
    __tablename__ = 'has_cuisines' 
    id = db.Column('id', db.Integer, primary_key=True)
    eatery_id = db.Column('eatery_id', db.String(255),db.ForeignKey('Eateries.id'))
    cuisine_id = db.Column('cuisine_id', db.String(255),db.ForeignKey('Cuisines.id'))'''
    
class Vouchers(db.Model):
    __tablename__ = 'Vouchers' 
    id = db.Column('id', db.Integer, primary_key=True)
    eatery_id = db.Column('eatery_id', db.Integer,db.ForeignKey('Eateries.id'))
    discount_percentage = db.Column('discount_percentage', db.Integer)
    weekday = db.Column('weekday', db.String(255))
    start_ = db.Column('start_', db.Date)
    end_ = db.Column('end_',db.Date)
    set_number =  db.Column('set_number', db.Integer)
    number = db.Column('number', db.Integer)
    #avaliability = db.Column('avaliability', db.Boolean)
    def dict(self):
        return {
            'id': self.id,
            'eatery_id': self.eatery_id,
            'discount_percentage': self.discount_percentage,
            'weekday': self.weekday,
            'start_': self.start_.strftime('%Y-%m-%d'),
            'end_': self.end_.strftime('%Y-%m-%d'),
            'set_number': self.set_number,
            'number': self.number
        }
    
class has_vouchers(db.Model):
    __tablename__ = 'has_vouchers' 
    id = db.Column('id', db.Integer, primary_key=True)
    voucher_id = db.Column('voucher_id', db.Integer,db.ForeignKey('Vouchers.id'))
    customer_id = db.Column('customer_id', db.Integer,db.ForeignKey('Customers.id'))
    code= db.Column('code', db.String(255))
    start_ = db.Column('start_', db.Date)
    end_ = db.Column('end_',db.Date)
    #avaliability = db.Column('avaliability', db.Boolean)
    def dict(self):
        return {
            'id': self.id,
            'voucher_id': self.voucher_id,
            'customer_id': self.customer_id,
            'code': self.code,
            'start_': self.start_.strftime('%Y-%m-%d'),
            'end_': self.end_.strftime('%Y-%m-%d')
        }
class History(db.Model):
    __tablename__ = 'History' 
    id = db.Column('id', db.Integer, primary_key=True)
    customer_id = db.Column('customer_id', db.Integer,db.ForeignKey('Customers.id'))
    eatery_id = db.Column('eatery_id', db.Integer,db.ForeignKey('Eateries.id'))
    discount_percentage = db.Column('discount_percentage', db.Integer)
    weekday =db.Column('weekday', db.Integer)
    start_ = db.Column('start_', db.Date)
    end_ = db.Column('end_',db.Date)
    code= db.Column('code', db.String(255))
    review= db.Column('review', db.String(1000))
    rating = db.Column('rating',db.Integer)
    use_voucher_time = db.Column('use_voucher_time',db.DateTime)
    review_time = db.Column('review_time',db.DateTime)
    #avaliability = db.Column('avaliability', db.Boolean)
    def dict(self):
        result = {
            'id': self.id,
            'customer_id': self.customer_id,
            'eatery_id': self.eatery_id,
            'discount_percentage': self.discount_percentage,
            'weekday': self.weekday,
            'start_': self.start_.strftime('%Y-%m-%d'),
            'end_': self.end_.strftime('%Y-%m-%d'),
            'code': self.code,
            'review': self.review,
            'rating': self.rating
        }
        if self.review_time is not None:
            result['review_time'] = self.review_time.strftime('%Y-%m-%d %H:%M:%S')
        else:
            result['review_time'] = None
        if self.use_voucher_time is not None:
            result['use_voucher_time'] = self.use_voucher_time.strftime('%Y-%m-%d %H:%M:%S')
        else:
            result['use_voucher_time'] = None
        return result
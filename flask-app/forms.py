from wtforms import StringField, PasswordField, SubmitField, DateField, SelectField, TimeField, IntegerField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, ValidationError, Email

'''Register form'''
def register_validate_password(form, field):
    password = field.data
    confirm_password = form.confirm.data
    if not password:
        raise ValidationError('Password field is required.')
    if password != confirm_password:
        raise ValidationError('Password and Confirm Password do not match.')
    if len(password) < 6:
        raise ValidationError('Password must be at least 6 characters long.')

def validate_empty(form, field):
    content = field.data
    if not content:
        raise ValidationError(f'{field.label.text} field is required.')

class CustomerSignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), validate_empty])
    password = PasswordField('Password', validators=[DataRequired(), register_validate_password])
    confirm = PasswordField('Confirm Password', validators=[DataRequired(), validate_empty])
    email = StringField('Email', validators=[DataRequired(), Email(), validate_empty])
    birthday = DateField('DOB', format='%Y-%m-%d')
    phone_number = StringField('Phone Number', validators=[DataRequired(), validate_empty])
    gender = SelectField('Gender', choices=[('M','Male'), ('F','Female')])
    submit = SubmitField('Sign In')
    
class EaterySignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), validate_empty])
    password = PasswordField('Password', validators=[DataRequired(), register_validate_password])
    confirm = PasswordField('Confirm Password', validators=[DataRequired(), validate_empty])
    email = StringField('Email', validators=[DataRequired(), Email(), validate_empty])
    bussiness_hours_start = TimeField('From', format='%H:%M')
    bussiness_hours_end = TimeField('To', format='%H:%M')
    address = StringField('Address', validators=[DataRequired(), validate_empty])
    suburb = StringField('Suburb', validators=[DataRequired(), validate_empty])
    city = StringField('City', validators=[DataRequired(), validate_empty])
    state = StringField('State', validators=[DataRequired(), validate_empty])
    postcode = StringField('Postcode', validators=[DataRequired(), validate_empty])
    phone_number = StringField('Phone Number', validators=[DataRequired(), validate_empty])
    cuisine = StringField('Cuisine')
    submit = SubmitField('Sign In')


'''Login form'''
def login_validate_password(form, field):
    password = field.data
    if not password:
        raise ValidationError('Password field is required.')

class UserLoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), validate_empty])
    password = PasswordField('Password', validators=[DataRequired(), login_validate_password])
    submit = SubmitField('Login')
    
class EateryOfferVoucher(FlaskForm):
    discount_percentage = IntegerField('discount', validators=[DataRequired(),validate_empty])
    start_ = DateField('start_', format='%Y-%m-%d',validators=[DataRequired(),validate_empty])
    end_ = DateField('end_', format='%Y-%m-%d',validators=[DataRequired(),validate_empty])
    set_number = IntegerField('set_number', validators=[DataRequired(),validate_empty])

class EateryOfferWeeklyVoucher(FlaskForm):
    discount_percentage = IntegerField('discount', validators=[DataRequired(),validate_empty])
    start_ = DateField('start_', format='%Y-%m-%d',validators=[DataRequired(),validate_empty])
    set_number = IntegerField('set_number', validators=[DataRequired(),validate_empty])
    weekday = StringField('weekday', validators=[DataRequired(), validate_empty])

class CustomerBookVoucher(FlaskForm):
    eatery_id = IntegerField('eatery', validators=[DataRequired(),validate_empty])
    discount_percentage = IntegerField('discount', validators=[DataRequired(),validate_empty])
    start_ = DateField('start_', format='%Y-%m-%d',validators=[DataRequired(),validate_empty])
    end_ = DateField('end_', format='%Y-%m-%d',validators=[DataRequired(),validate_empty])

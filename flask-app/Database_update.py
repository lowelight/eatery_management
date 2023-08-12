from models import *
from sqlalchemy import text
from datetime import datetime, timedelta, date
import schedule
import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:111111@localhost:3306/eatery_management'
db = SQLAlchemy(app)

# 该函数来删除Vouchers, has_vouchers过期数据 以及对weekly voucher更新


def data_update():
    with app.app_context():
        # query = text("DELETE FROM Vouchers WHERE end_ < CURDATE()")
        # db.session.execute(query)
        # db.session.commit()
        today = date.today()
        # 删除过期的vouchers
        vouchers_delete = db.session.query(Vouchers).filter(
            Vouchers.end_ < today, Vouchers.weekday.is_(None)).all()
        for voucher in vouchers_delete:
            db.session.delete(voucher)

        # 删除过期的has_vouchers
        has_vouchers_delete = db.session.query(
            has_vouchers).filter(has_vouchers.end_ < today).all()
        for has_voucher in has_vouchers_delete:
            db.session.delete(has_voucher)

        # 对过期的weekly vouchers及时更新
        weekly_vouchers_to_update = db.session.query(Vouchers).filter(
            Vouchers.end_ < today, Vouchers.weekday.isnot(None)).all()
        for weekly_voucher in weekly_vouchers_to_update:
            weekly_voucher.start_ += timedelta(days=7)
            weekly_voucher.end_ += timedelta(days=7)
        db.session.commit()


if __name__ == '__main__':
    # 安排任务，每天的特定时间运行一次（你可以根据需要调整时间间隔）
    schedule.every().day.at("23:10").do(data_update)

    # 保持脚本运行并在规定的时间间隔内检查任务
    while True:
        schedule.run_pending()
        time.sleep(1)

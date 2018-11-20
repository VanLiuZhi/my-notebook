# sqlAlchemy 查询操作

notin_   
in_
or_

## 批量插入（非orm方式）

```py
# MemberCouponRecord 为要操作的表名
db.session.execute(
    MemberCouponRecord.__table__.insert(),
    [{'coupon_id': 'NO0001', 'member_id': 0002, 'update_time': get_current_time(), 'create_by': get_op_user_name()} for item in item_data]
)
db.session.commit()
```
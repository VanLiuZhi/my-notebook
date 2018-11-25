# python 偷懒小工具

## markdown table 语法生成

<HightCode>
<template>
"""
markdown 的table语法格式 自动生成代码，错误的地方需要手动处理一下
"""

op_str = '''
len(d) 返回字典元素个数
d[key] 返回key对应的value
d[key] = value 为字典元素赋值，如果没有则增加元素
del d[key] 删除字典元素
key in d/ key not in d 查看key是否在d中
iter(d) 返回一个迭代器，具有__next__()方法
clear() 清空
copy() 浅复制
fromkeys(seq[, value]) 以seq作为键，value作为值建立字典，默认value为None
get(key[, default]) 安全的get方法，如果不存在返回default，如果不指定default则报错
items() 列出一个键值对的view
keys() 列出key的view,通常用于遍历
values() Return a new view of the dictionary's values.
pop(key[, default]) 如果键值key存在与字典中，删除dict[key]，返回 dict[key]的value值。key值必须给出。否则，返回default值。如果default值没有过出，就会报出KeyError异常。pop()方法至少接受一个参数，最多接受两个参数。
popitem() 弹出一个键值对，为key的哈希序列中的第一个
setdefault(key[, default]) 安全的添加操作，如果存在就返回value不更改值，如果不存在添加一个key:default的表项，default默认为0
update([other]) 更改操作，other可以是键值对的列表或元组（二级的），也可以是字典，用other中的键值对添加到或替换原有键值对
'''

_op_str = op_str.split('\n')

out_str = ''
max_str_len = 26  # pop(key[, default])
space = ' '

for item in _op_str:
    tmp = item.split(' ')
    tmp_str = "| {a}{space} | {b} \n".format(a=tmp[0], b=''.join(tmp[1:]), space=space * (max_str_len - len(tmp[0])))
    out_str += tmp_str

print(out_str)

</template>
</HightCode>

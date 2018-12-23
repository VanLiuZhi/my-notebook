# python 常用

## 获取文件所在目录

<highlight-code lang='python'>

    import os

    path = os.path.dirname(os.path.abspath(__file__))
    print(path)
    
</highlight-code>
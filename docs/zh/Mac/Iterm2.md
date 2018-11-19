# Iterm2

## 配置快捷键

### 移动一个单词

在Profile -- keys下，找到如同的原配置信息。
![image](/my-notebook/images/Mac/iterm2_key_1.png)
其实这是已有的功能，不过Mac默认的快捷键被占用了，修改成我们习惯的。
分别修改option+←和option+→的映射，选择Action为“Send Escape Sequence”，然后输入“b”和“f”即可。

## 配置远程ssh登陆

使用脚本传参数的方式登陆，先准备脚本，内容如下：

```sh
#!/usr/bin/expect

set timeout 30
spawn ssh -p [lindex $argv 0] [lindex $argv 1]@[lindex $argv 2]
expect {
        "(yes/no)?"
        {send "yes\n";exp_continue}
        "password:"
        {send "[lindex $argv 3]\n"}
}
interact
```

在本地创建这么一个文件 `*.sh`
然后去配置iterm2，如下图，用绝对路径指向这个文件，后面加上参数。 端口，用户，IP，password。
举例：
`/Users/liuzhi/Documents/LinuxServer/liuzhiTX.sh 22 root 123.207.***.202 12345`

![image](/my-notebook/images/Mac/iterm2_ssh.png)
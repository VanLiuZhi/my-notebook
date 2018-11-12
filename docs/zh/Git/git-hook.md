# git的hook(钩子)

为了防止一些不规范的代码 `commit` 并 `push` 到远端，我们可以在  `git` 命令执行前用一些钩子来检测并阻止。
安装需要的模块： `husky` , `pre-commit` 配置package.json在提交代码前执行自定义的脚本。

```
cd .git/hooks
ls -l
```

该目录提供了git的各个钩子的脚步案例。
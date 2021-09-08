## 使用技术
前端：React + react-router + axios + TypeScript + Recoil + Hooks + cssnext
后端：BFF Node Koa Serverless  函数计算  OSS

## scripts文件夹下的文件设置权限
chmod -R(递归处理) u(文件属主)+rx(增加读和可执行权限) ./scripts
https://www.cnblogs.com/Berryxiong/p/6193866.html

运行 “npm run client:dev” 就会自动执行dev.sh脚本，即执行“webpack --env development”
Windows：
但是，sh文件在windows中无法直接运行！所以按照上面的方式在windows中使用scripty可能会报错
spawn：UNKOWN
所以，在Windows环境下创建scripts-win目录，将.sh文件改为.bat文件，其余同上

## cnpm 安装模块可以，但cnpm uninstall 卸载时就不行
这是由于npm和cnpm的全局模块地址不同造成的。
先获取npm全局模块地址 npm config get prefix
再设置cnpm全局模块地址 cnpm config set prefix <npm全局模块地址>

# 需要加的功能
## 需要增加eslint
## 增加svg转icon处理
展示全部icon的页面未添加路由(未完成)
## 增加css模块化
.module.scss文件进行模块化处理
## 增加css变量,ant css全局变量修改
## 增加静态资源copy(静态资源放在assets文件中)



# 移动端要加的功能
## rem转换
## 调试js文件

## 增加viewport

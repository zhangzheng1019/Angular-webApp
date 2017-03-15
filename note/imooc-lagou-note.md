## AngularJS简述

- **module：模块，是一个容器；**
- **directive：指令，与html元素绑定，同时进行相互作用**
- **service：公有的逻辑**
- **controller：私有的逻辑，只对于特定的业务，和视图进行绑定**
- **filter：数据的过滤**

- **$scope常见属性**
    - **$id:唯一标识$scope对象的值**
    - **$parent:父作用域**
    - **$root:指向模块的$rootScope对象**
- **$scope常见函数**
    - **$watch:监控属性发生变化的时候调用的函数**
    - **$on:接受事件**
    - **$broadcast:向下广播**
    - **$emit:向上传递**
    - **$digest:双向数据绑定失效**

- **服务（service）:单例、懒加载、公用函数**
    - **$http:发出Ajax请求数据服务**
    - **$q:解决异步的请求**
    - **$timeout:延迟执行**
    - **$interval:循环执行**
    - **$rootScope:scope对象的祖先**

## AngularJS报错信息

- **Error: [$injector:modulerr] :模块加载问题**
<br>解决方法：您忘记将文件包含在定义的模块中或文件无法加载。
- **Error: [$compile:tpload] :$compile尝试从某个URL提取模板时发生此错误，并且请求失败。**
<br>解决方法：请确保模板的URL正确拼写，并解析为正确的绝对URL。

## Chrome/Firebug调试工具(扩展程序)：batarang

## 代码管理工具Git

## bower包管理工具（第三方依赖管理工具）
- **命令：init(初始化，创建bower配置文件)/install(安装)/uninstall(卸载)**
- **配置文件：.bowerrc(修改安装目录[命令行创建'null>.bowerrc'])/bower.json(常用)**
```
.bowerrc文件
{
    "directory":"lib"//将会生成一个lib文件夹
}
```
## less功能：
- **定义变量（@变量名:值）**
- **后代选择器（嵌套）**

```
    @width:100px;
    @bgColor:#ccc;
    .frame{
        //引用函数使用 .
        .fun(20px);
        background:@bgColor;
        .select{
        width:@width;
        &:after{
            content:'';
        }
    }
```

- **引用文件**
```
    @import "1.less";
```

- **函数功能**

```
    .fun(@px){
        height:@px;
    }
```

## 单页面应用：
- **定义：页面跳转无刷新**
- **方法：利用路由控制“页面”跳转**
- **优点：页面切换流畅、前后端分离**

## 文件目录说明
```
|--bower_components:
|--build:
|--dist:产品发布目录(部署发布)
|--src:源码
    |--data:假数据（json文件）
    |--image:
    |--script
        |--config:
        |--controller:
        |--directive:
        |--filter:
        |--service:
        |--app.js:入口文件
    |--style:样式文件
    |--view：视图文件
|--test:单元测试、集成测试<本项目没有引入>
|--eslintrc:代码审查<本项目没有引入>
|--gulpfile.js:gulp配置文件
|--package.json ：npm初始化
|--bower.json：bower配置文件
```
## 自动化构建工具
- **gulp**

    - **常见API：src/dest/watch/task/pipe**
    - **执行gulp任务**
    `gulp.task('')`
    - **对bower_components下的所有文件进行深度遍历**
    `gulp.src('bower_components/**/*')`
    - **对bower_components下的进行深度遍历查找js文件**
    `gulp.src('bower_components/**/*.js')`
    - **对文件的复制**
    `gulp.dest()`
    - **一旦编译less/js/image出现错误时，不会立即终断线程，而只是抛出错误**
    `gulp-plumber`

# Angular-webApp
AngularJS仿拉勾网WebApp 开发移动端单页应用
# 描述
基于AngularJS，仿拉勾网开发一个招聘类的移动端单页应用，包括登录、注册、搜索、查看、收藏等功能，涵盖如指令、数据绑定、过滤器等AngularJS最常用的、难理解的核心概念以及前端构建工具gulp的使用，通过这一次实际的开发，明晓了AngularJS开发单页应用的流程，以及模块化开发的优势，获得使用AngularJS独立开发单页应用的能力。
# Use it
- **安装依赖**
```
npm install
```
- **运行项目**
```
gulp
```
# 使用到的技术

- **包管理工具bower**
- **前端自动化构建工具gulp**
- **手机端布局rem**
- **CSS预编译语言less**
- **MVC前端框架AngularJS**

## 文件目录说明
```
|--bower_components:
|--build:
|--dist:产品发布目录(部署发布)
|--note:听课笔记
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

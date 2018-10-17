const express = require('express');
const router = require('./controller/router.js');
var app = express();

// 设置模板
app.set("view engine","ejs");

// 静态服务
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

// 首页路由
app.get('/',router.showIndex);

// 对应相册路由
app.get('/:albumName',router.showAlbum);

// 上传路由
app.get('/up',router.showUp);
// 上传提交
app.post('/up',router.doUp);

// 404(既不是首页路由也不是对应相册路由时)
app.use((req,res) => {
	res.render("err");
})
app.listen(3000); 
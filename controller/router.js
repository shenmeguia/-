const file = require('../models/file.js');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
exports.showIndex = function (req,res,next) {
	// 读取views中的index.ejs，并向index.ejs传递数据
	file.getAllAlbum((err,allAlbum) => {
		if(err) {
			next();
			return;
		}
		res.render("index",{
			"albums":allAlbum
		})
	})
}

exports.showAlbum = function (req,res,next) {
	// 相册名称
	var albumName = req.params.albumName;
	file.getImages(albumName,(err,images) => {
		if(err) {
			next();
			return;
		}
		res.render("album",{
			"albumName":albumName,
			"images":images
		})
	})
}

exports.showUp = function (req,res) {
	file.getAllAlbum((err,albums) => {
		res.render("up",{
			"albums":albums
		})
	})
}

// 图片上传
exports.doUp = function (req,res) {
	var form = new formidable.IncomingForm();
	// 上传路径(暂时的地址) 下面通过改名替换位置
	form.uploadDir = path.normalize(__dirname + "/../uploads/");
  form.parse(req, function(err, fields, files,next) {
    // console.log(fields);
    // console.log(files.photo);
    // 还可以使用files.photo.size限制上传图片的大小

    if(err) {
    	next();
    	return;
    }
    // 没有上传图片时
    if(files.photo.name === '') {
    	fs.unlink(files.photo.path,function (err) {});
    	res.redirect('/up');
    	return;
    }
    // 图片扩展名
    var extname = path.extname(files.photo.name);
   	// 图片名称用时间戳
    var timeName = Date.now();
    // 改名，添加扩展名
    var oldPath = files.photo.path;
    var newPath = path.normalize(__dirname + "/../uploads/" + fields.filders+ "/" + timeName + extname);
    fs.rename(oldPath,newPath,function(err) {
    	if(err) {
    		res.send('改名失败');
    		return;
    	}
    	// 上传成功重定向到首页
    	res.redirect('/');
    })
  });
}
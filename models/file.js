const fs = require('fs');
// 读取指定文件夹的方法
exports.getAllAlbum = function (callback) {
	// 读取upload下所有文件夹，upload文件夹存放相册所有图片
	// fs.readdir()读取一个文件夹下面的所有文件，返回以文件(夹)名的数组
	fs.readdir('./uploads',(err,files) => {
		if(err) {
			callback(err,null);
			return;
		}
		var folders = [];
		(function isFolder(i) {
			// 已经遍历完成终止遍历
			if(i === files.length) {
				// 并通过回调函数把数据传出去
				callback(err,files);
				return;
			}
			// fs.stat() 读取文件的状态  isDirectory()判断是不是文件夹
			fs.stat('./uploads/' + files[i],(err,stats) => {
				if(stats.isDirectory()) {
					folders.push(files[i]);
				}
				isFolder(i + 1);
			})
		})(0);
	})
}
// 读取指定文件夹下面所有文件的方法
exports.getImages = function (albumName,callback) {
	fs.readdir('./uploads/' + albumName,(err,files) => {
		if(err) {
			callback(err,null);
			return;
		}
		var images = [];
		(function isFiles(i) {
			if(i === files.length) {
				callback(err,files);
				return;
			}
			fs.stat('./uploads/' + albumName + '/' +files[i],(err,stats) => {
				// isFile()判断是不是文件
				if(stats.isFile()) {
					images.push(files[i]);
				}
				isFiles(i + 1);
			})
		})(0);
	})
}
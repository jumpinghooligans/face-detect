var request = require('request');
var qs = require('qs');
var mongoose = require('mongoose');

var FaceImage = mongoose.model('FaceImage');

exports.index = function (req, res) {
	res.render('face/index', { title: 'Face Index' });
}

exports.add = function (req, res) {
	if(req.method == 'GET') {
		res.render('face/add', { title: 'Face add' });
	} else {
		var post = req.body;

		post.api_key = global.api_key;
		post.api_secret = global.api_secret;
		post.jobs = "face_add"
		post.name_space = "thrillist";

		request.post(global.api_url, function(error, response, body) {
			var body_obj = JSON.parse(body);
			new FaceImage({
				user_id : post.user_id,
				index : body_obj.face_detection[0].img_index,
				base64 : post.base64
			}).save(function(err, faceimage, count) {
				res.render('face/add', {  title: 'Face add', response : body });
			});
		}).form(post);
	}
}

exports.train = function (req, res) {
	if(req.method == 'GET') {
		res.render('face/train', { title: 'Face train' });
	} else {
		var post = {};

		post.api_key = global.api_key;
		post.api_secret = global.api_secret;
		post.jobs = "face_train";
		post.name_space = "thrillist";
		post.user_id = "ryan";

		request.post(global.api_url, function(error, response, body) {
			res.render('face/train', {  title: 'Face train', response : body });
		}).form(post);
	}
}

exports.recognize = function (req, res) {
	if(req.method == 'GET') {
		res.render('face/recognize', { title: 'Face recognize' });
	} else {
		var post = req.body;

		post.api_key = global.api_key;
		post.api_secret = global.api_secret;
		post.jobs = "face_search"
		post.name_space = "thrillist";
		post.user_id = "ryan";

		request.post(global.api_url, function(error, response, body) {

			var body_obj = JSON.parse(body);

			if(body_obj.face_detection.length > 0) {
				FaceImage.findOne({ index : body_obj.face_detection[0].matches[0].img_index }, function(err, faceimage, count) {
					res.render('face/recognize', {  title: 'Face recognize', result : faceimage });
				});
			} else {
				res.render('face/recognize', {  title: 'Face recognize', response : body });
			}

		}).form(post);
	}
}
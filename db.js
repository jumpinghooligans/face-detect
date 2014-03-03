var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var FaceImage = new Schema({
    user_id : String,
    index  : String,
    base64  : String
});
 
mongoose.model('FaceImage', FaceImage);
 
mongoose.connect('mongodb://localhost/face-detect');
console.log("Mongo initialized");
$(document).ready(function() {
	
	$("#camera").scriptcam({
		showMicrophoneErrors: false,
		onError: onError,
		onWebcamReady:onWebcamReady
	});

	$("#snap").click(webcamToBase64);
});

function onWebcamReady(cameraNames, camera, microphoneNames, microphone, volume) {
	console.log("Camera ready.");
}

function onError(errorId, errorMsg) {
	alert(errorMsg);
}

function webcamToBase64() {
	var base64img = $.scriptcam.getFrameAsBase64();

	$("input[name='base64']").val(base64img);
	$("#preview").html("<img src='data:image/png;base64," + base64img + "' />");
}
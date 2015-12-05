var key = require("../login")['hmsspacekey'];
var email = require("../login")['creatoremail'];
var request = require("request");

module.exports.matchPattern = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

module.exports.action = function (api, message, cb) {
	target = "http://hms.space/api/add";
	request.post({
		url: target,
		form: {"apiKey": key, "creator": email, "target": message.body}
	}, function(err, httpResponse, body){
		if (err) {
			console.log(err);
			return setImmediate(cb);
		} else {
			var res = JSON.parse(body);
			if (res["Success"]) {
				api.sendMessage(res["ResultURL"], message.threadID);
				return setImmediate(cb);
			} else {
				api.sendMessage("hms.space fucked up. Blame @jordon wing.", message.threadID);
			}
		}
	});
}

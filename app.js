const express = require("express");
const body = require("body-parser");
const speakeasy = require("speakeasy");

var app = express()
	.use(body.json())
	.use(body.urlencoded({extended: true}));


//Generate secrete
app.get("/otp-secret", (request,response, next) => {
	var secret = speakeasy.generateSecret({ length: 20 });
	response.send({ "secret": secret.base32 });

});

/*
	################ TOTP ################
*/
//Validate code six digit
app.post("/totp-validate", (request,response, next) => {
	response.send(
		{
			"valid": speakeasy.totp.verify({
				"secret": request.body.secret, //Não passar assim, pegar da base de dados.
				"encoding": "base32",
				"token": request.body.token, //Token de 6 números.
				"window": 1 //tempo após expirar o código anterior, 1 = ON + 30 segundos, 0 = OFF
			}),
			"request": { //Only test
				"secret": request.body.secret,
				"token": request.body.token
			},
			"remaining": (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
		}
	);

});

//Generate code six digit (Only example)
app.post("/totp-code", (request,response, next) => {
	response.send(
		{
			"token": speakeasy.totp({
				"secret": request.body.secret,
				"encoding": "base32"
			}),
			"request": { //Only test
				"secret": request.body.secret
			},
			"remaining": (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
		}
	);

});

/*
	################ HOTP ################
*/
//Validate code six digit
app.post("/hotp-validate", (request,response, next) => {
	response.send(
		{
			"valid": speakeasy.hotp.verify({
				"secret": request.body.secret, //Não passar assim, pegar da base de dados.
				"encoding": "base32",
				"token": request.body.token, //Token de 6 números.
				"counter": request.body.counter //incrementar para mudar hash
			}),
			"request": { //Only test
				"secret": request.body.secret,
				"token": request.body.token,
				"counter": request.body.counter
			}
		}
	);

});

//Generate code six digit (Only example)
app.post("/hotp-code", (request,response, next) => {
	response.send(
		{
			"token": speakeasy.hotp({
				"secret": request.body.secret,
				"encoding": "base32",
				"counter": request.body.counter
			}),
			"request": { //Only test
				"secret": request.body.secret,
				"counter": request.body.counter
			}
		}
	);

});

app.listen(3000, () => {
	console.log("Listen on 3000 port");
});
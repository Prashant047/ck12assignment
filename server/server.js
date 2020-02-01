const fs = require('fs');
const axios = require('axios');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const safeEval = require('safe-eval');

const PORT = 8000 || process.env.PORT;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.get('/some', (req, res) => {
// 	res.send("Something");
// });


const CampK12 = {

	translate(text, fromLang, toLang){

		return new Promise((resolve, reject) => {
			axios.post("https://translate.yandex.net/api/v1.5/tr.json/translate" ,null, {params : {
				lang:`${fromLang}-${toLang}`,
				key: "trnsl.1.1.20200131T134450Z.40bdceadd6b715c0.6451fead3a42dc87e73bca2d45ed7a1bc15142dd",
				text:text
			}})
				.then((response) => {
					resolve(response.data.text[0]);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

};

app.post('/code', (req, res) => {
	const {code} = req.body;

	fs.writeFile("./clientcode.js", code, (error) => {
		if(error){
			throw "error writing client code";
		}

		res.send({
			received: true
		});
	});

});



app.post('/message', (req, res) => {
	const {message} = req.body;
	// console.log("Got message" , message);

	let context ={
		reverseIt: function(str) {
			return str.split("").reverse().join("");
		},
		CampK12: CampK12
	};

	let code = fs.readFileSync('./clientcode.js').toString();
	code = '(' + code + `)(\`${message}\`)`;

	try{
		let output = safeEval(code, context);

		output.then(reply => {
			res.send({
				reply: reply
			});
		}).catch(err => {
			console.log("Error in replying", err);
			res.send({
				reply: "Error in evaluating the function"
			})
		});

	}catch(except){
		res.send({
			reply: "Internal Server Error"
		});
	}


});

app.listen(PORT, (error) => {
	if(error){
		throw "Error Starting the server";
	}
	console.log(`Server running on port:${PORT}`);
});



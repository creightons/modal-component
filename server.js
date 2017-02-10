var express = require('express'),
	app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use('/public', express.static('public'));

app.get('/', function(req, res) { return res.render('index'); });

app.listen(3000, function() { console.log('Live on port 3000...'); });
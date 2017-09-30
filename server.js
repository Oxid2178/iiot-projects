var express = require('express');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);
//var bodyParser = require('body-parser');

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var ip = process.env.OPENSHIFT_NODEJS_IP || '192.168.178.28';
//var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//var ip = 0.0.0.0 || '192.168.178.28';
//var port = 8080 || 3000;




var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb://localhost/bastelraumtoedi',
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}




var mongoose = require('mongoose');
//var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/bastelraumtoedi';
var connectionString = mongoURL; 
mongoose.connect(connectionString);

app.use(express.static(__dirname + "/public"));

//var PageSchema = new mongoose.Schema({
//    name: String,
//    url: String,
//    created: { type: Date, default: Date.now }
//}, { collection: 'page' });

//var WebSiteSchema = new mongoose.Schema({
//    name: String,
//    pages: [PageSchema],
//    created: { type: Date, default: Date.now }
//}, { collection: 'website' });

//var WebSiteModel = mongoose.model('WebSite', WebSiteSchema);

var ContactListSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
}, { collection: 'bastelraumtoedi' });

var ContactListModel = mongoose.model('BastelraumToedi', ContactListSchema);

app.get('/contactlist', function(req, res) {
	console.log("I received a GET request");

	// ***dummy data no longer required with mongodb ***
	// person1 = {
	// 		name: 'Tim',
	// 		email: 'tim@email1.com',
	// 		number: '(111) 111-1111'
	// 	};

	// 	person2 = {
	// 		name: 'Emily',
	// 		email: 'emily@email2.com',
	// 		number: '(222) 222-2222'
	// 	};

	// 	person3 = {
	// 		name: 'John',
	// 		email: 'john@email3.com',
	// 		number: '(333) 333-3333'
	// 	};

	//	var contactlist = [person1, person2, person3];
	//	res.json(contactlist);
	//	***************************************************

	ContactListModel.find(function (err, docs) {
	    res.json(docs);
	});

	//db.contactlist.find(function(err, docs) {
	//	console.log(docs);
	//	res.json(docs);
	//});

});

app.post('/contactlist', function(req, res) {
    console.log(req.body);
    var contlist = new ContactListModel(req.body);
    contlist.save(function (err, doc) {
        ContactListModel.find(function (err, docs) {
            res.json(docs);
        });
    });
	//db.contactlist.insert(req.body, function(err, doc) {
    //	res.json(doc);
  	//});
});

app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	ContactListModel.remove({ _id: id }, function (err, count) {
	    ContactListModel.find(function (err, sites) {
	        res.json(sites);
	    });
	});
	//db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
	//	res.json(doc);
	//});
});

app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	ContactListModel.findById(req.params.id, function (err, site) {
	    res.json(site);
	});
	//db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
	//	res.json(doc);
	//});
});

app.put('/contactlist/:id', function(req, res) {
    var query = { _id: req.params.id };
    var update = { $set: { name: req.body.name, email: req.body.email, number: req.body.number } };
    console.log(query);
    console.log(req.body.name);
	ContactListModel.findOneAndUpdate(query, update, function (err, count) {
	    ContactListModel.find(function (err, sites) {
	        console.log(sites);
	        res.json(sites);
	    });
	});
	//db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
	//	update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	//	new: true}, function(err, doc) {
	//		res.json(doc);
	//});
});

app.listen(port, ip);
console.log("Server running on port 3000");






/*************************************webapp*********************************************/

//var website1 = new WebSiteModel({ name: "Website 1" });
//website1.save();

////** use post instead of get **
//app.get('/rest/website/:name/create', function (req, res) {
//    var website = new WebSiteModel({ name: req.params.name });
//    website.save(function (err, doc) {
//        res.json(doc);
//    }); 
//});

//// findById
//app.get('/rest/website/:id', function (req, res) {
//    WebSiteModel.findById(req.params.id, function (err, site) {
//        res.json(site);
//    });
//});

//// findAll
//app.get('/rest/website', function (req, res) {
//    WebSiteModel.find(function (err, sites) {
//        res.json(sites);
//    });
//});

//// get process env
//app.get('/process', function (req, res) {
//    res.json(process.env);
//});

//// create 
//app.post('/rest/website', function (req, res) {
//    var website = new WebSiteModel(req.body);
//    website.save(function (err, doc) {
//        WebSiteModel.find(function (err, sites) {
//            res.json(sites);
//        });
//    });
//});

//// remove
//app.delete('/rest/website/:id', function (req, res) {
//    var id = req.params.id;
//    WebSiteModel.remove({ _id: id }, function (err, count) {
//        WebSiteModel.find(function (err, sites) {
//            res.json(sites);
//        });
//    });
//});

//// find pages for a website
//app.get('/rest/website/:id/page', function (req, res) {
//    WebSiteModel.findById(req.params.id, function (err, site) {
//        res.json(site.pages);
//    });
//});

//var developer = [
//    { firstname: 'Alice', lastname: 'Wonderworld' },
//    { firstname: 'Bob', lastname: 'Marley' },
//    { firstname: 'Charlie', lastname: 'Garzia' },
//    { firstname: 'Dan', lastname: 'Aykroyd' },
//];

//app.get('/rest/developer/:index', function (req, res) {
//    res.json(developer[req.params.index]);
//});

// app.get('/', function (reg, res) {
// 	res.send("Hello world from server.js")
// });


/**********************************end webapp*********************************************/
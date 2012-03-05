var express  = require("express");
var mongoose = require("mongoose");


var roleSchema = require('./models/role.js');
var Role       = mongoose.model('Role', roleSchema);

mongoose.connect('mongodb://localhost/rbacker');

var app = express.createServer();

app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req,res) {
  res.redirect("/roles");
});

// Roles
app.get('/roles', function(req,res) {
  Role.find(function(err, roles) {
    res.render('roles/index', {locals: {
      roles: roles
    }});
  });
});
app.get('/roles/new', function(req,res) {
  res.render('roles/new', {locals: {
    role: {}
  }});
});
app.post('/roles', function(req,res) {
  var role = new Role({
    name: req.body.role.name,
    description: req.body.role.description,
    owner: req.body.role.owner,
  });
  role.save(function(err) {
    if (err) {
      throw err;
    };
    res.redirect('/roles/' + role._id);
  });
});
app.get('/roles/:id', function(req,res) {
  Role.findById(req.params.id, function(err, role) {
    if (err) {
      throw err;
    };
    res.render('roles/show', {locals: {
      role: role
    }});
  });
});
app.get('/roles/:id/edit', function(req,res) {
  Role.findById(req.params.id, function(err, role) {
    res.render('roles/edit', {locals: {
      role: role
    }});
  });
});
app.put('/roles/:id', function(req,res) {
  Role.findById(req.params.id, function(err, role) {
    role.name = req.body.role.name;
    role.description = req.body.role.description;
    role.owner = req.body.role.owner;
    role.save();
    res.redirect('/roles/' + req.params.id);
  });
});
app.delete('/roles/:id', function(req,res) {
  Role.findById(req.params.id, function(err, role) {
    if (err) {
      throw err;
    };
    role.remove(function(err) {
      if (err) {
        throw err;
      };
      res.redirect('/roles');
    });
  });
});

app.listen(3000);


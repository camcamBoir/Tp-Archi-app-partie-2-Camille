var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.


mydata = {
  name: "compteur",
  value: 0
}

var allMsgs = [{ "msg": "Hello World" },
{ "msg": "Blah Blah" },
{ "msg": "serveeeeur" }]

app.get("/", function(req, res) {
  res.json("Hello")
})

app.get("/cpt/inc*", function(req, res) {
  var valeurIncrement = 1;
  if (req.query.v) {
    if (Number.isInteger(req.query.v)) {
      valeurIncrement = parseInt(req.query.v);
    } else {
      res.json({ code: -1 });
    }
  }
  mydata.value += valeurIncrement;
  res.json({ code: 0 });
});

app.get("/cpt/query/", function(req, res) {
  res.json(mydata)
});


app.get("/msg/get/*", function(req, res) {
  var msgNumber = req.params[0];
  if (msgNumber > allMsgs.length) {
    res.json({ code: 0 });
  } else {
    res.json({ code: 1, msg: allMsgs[msgNumber] });
  }
});

app.get("/msg/nber", function(req, res) {
  res.json(allMsgs.length);
});

app.get("/msg/getAll", function(req, res) {
  res.json(allMsgs);
});

app.get("/msg/post/*", function(req, res) {
  allMsgs.push({ "msg": unescape(req.params[0]) });
  res.json(allMsgs.length);
});

app.get("/msg/del/*", function(req, res) {
  var msgNumber = req.params[0];
  if (msgNumber > allMsgs.length) {
    res.json({ code: 0 });
  } else {
    allMsgs.splice(msgNumber, 1);
    res.json({ code: 1 });
  }
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");


var express = require('express');
var bodyParser = require('body-parser');
var _ = require("underscore");
var app = express();

//obiekty gry
var game = {
  maxMoves:0,
  maxColors:9,
  codeSize:5,
  secret:[]
};

//gra
var gra =  function(zadane,ruch){
  var czarne = _.map(zadane, function (num, index) {
      if (num === ruch[index]) {
          num = "czarne";
          ruch[index] = "czarne";
          return num;
      } else return num;
  });

  var czarnekey =  _.filter(czarne, function(num){
      return num === "czarne";
  }).length;

  var biale = _.map(czarne, function (num, index) {
      if(_.contains(czarne,ruch[index]) && ruch[index] !== "czarne"){
          return "biale";
      }else return num;
  });

  var bialekey= _.filter(biale,function(num){
      return num === "biale";
  }).length;

  return {
      czarnekey: czarnekey,
      bialekey: bialekey,
  };
};

app.use('/js',express.static('bower_components/jquery/dist'));
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/', function(req, res){
    res.send('Hello World');
});

//nowa gra
app.post('/app/newgame',function(request,response){
  console.dir(request.body);
  for(i=0; i <= game.codeSize; i++){
    game.secret[i] = Math.floor((game.maxColors + 1)*Math.random());
  }
  game.maxMoves = request.body.maxMoves;
  game.maxColors = request.body.maxColors;
  console.dir(game);
  response.end();
});


app.post('/api/move/',function(request,response){
  var resultjson = {
  };
  // co sprawdzamy?
  // 1.obiekt ma atrybut move
  if(request.body.move === undefined){
    resultjson.msg = "Brak move";
    response.json(resultjson);
  }
  // 2.wartosc gry jest tablica dlugosci games.codeSize
  if(request.body.move.length !== game.codeSize){
    resultjson.msg = ("Potrzebuje " + game.codeSize + " elementow");
    response.json(resultjson);
  }
  // 3.ze liczby sa z zakresu [0..games.maxColors]
  var pom = true;
  for(i=0; i <= game.codeSize; i++){
    if(request.body.move[i] <= 0 || request.body.move[i] > game.maxColors){
      pom = false;
      resultjson.msg = ("Liczba " + request.body.move[i] + " jest poza zakresem maxColors");
    }
  }
  if(pom === false){
    response.json(resultjson);
  }


 //poprawnosc wprowadzanych danych
  _.map(request.body.move,function(el){
    var element = NaN;
    element = parseInt(el,10);
    if(isNaN(element)){
      pom = false;
      return "Oczekiwałem liczby";
    }else{
      return el;
    }

    if(pom===true){
      var tab =_.map(request.body.move,function(el){
        console.log(el);
        return parseInt(el,10);
      });

      var gramy = mark(game.secret,tab);
      if(gramy.czarnekey === game.codeSize){
        response.end("Czarne"+gramy.czarnekey+"biale"+gramy.bialekey);
      }else{
        response.end("Czarne"+gramy.czarnekey+"biale"+gramy.bialekey);
      }
    }
    response.json(resultjson);
  });

});

app.listen(3000,function(){
  console.log("server na porcie 3000");
});

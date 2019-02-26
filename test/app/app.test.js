const request = require("supertest");
const app = require("../../app");
const Game = require("../../src/model/Game");
const Player = require("../../src/model/player");
const PowerPlantMarket = require("../../src/model/power_plant_cards");

const powerPlantsCards = {
  "3": {
    resource: {
      type: "Oil",
      quantity: 2
    },
    city: 1,
    inDeck: true
  },
  "4": {
    resource: {
      type: "Coal",
      quantity: 2
    },
    city: 1,
    inDeck: true
  },
  "5": {
    resource: {
      type: "Hybrid",
      quantity: 2
    },
    city: 1,
    inDeck: true
  },
  "6": {
    resource: {
      type: "Garbage",
      quantity: 1
    },
    city: 1,
    inDeck: true
  },
  "7": {
    resource: {
      type: "Oil",
      quantity: 3
    },
    city: 2,
    inDeck: true
  },
  "8": {
    resource: {
      type: "Coal",
      quantity: 3
    },
    city: 2,
    inDeck: true
  },
  "9": {
    resource: {
      type: "Oil",
      quantity: 1
    },
    city: 1,
    inDeck: true
  },
  "10": {
    resource: {
      type: "Coal",
      quantity: 2
    },
    city: 2,
    inDeck: true
  },
  "11": {
    resource: {
      type: "Uranium",
      quantity: 1
    },
    city: 2,
    inDeck: true
  },
  "12": {
    resource: {
      type: "Hybrid",
      quantity: 2
    },
    city: 2,
    inDeck: true
  },
  "13": {
    type: "Ecolgical",
    inputs: 0,
    output: 1,
    inDeck: true
  },
  "14": {
    resource: {
      type: "Garbage",
      quantity: 2
    },
    city: 2,
    inDeck: true
  },
  "15": {
    resource: {
      type: "Coal",
      quantity: 2
    },
    city: 3,
    inDeck: true
  }
};

describe("GET /", () => {
  it("should give the homepage with response code 200", done => {
    request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200, done);
  });

  it("should redirect to gameplay if valid cookie is set", done => {
    app.activeGames["3"] = new Game(2);
    app.cookies["123"] = "Ankon";
    request(app)
      .get("/")
      .set("Cookie", ["gameId=3;playerId=123"])
      .expect("Content-Type", /plain/)
      .expect(302, done);
  });

  it("should redirect to gameplay if valid cookie is set", done => {
    app.activeGames["3"] = new Game(0);
    app.cookies["123"] = "Ankon";
    request(app)
      .get("/")
      .set("Cookie", ["gameId=3;playerId=123"])
      .expect("Content-Type", /plain/)
      .expect(302, done);
  });
});

describe("POST /createGame", () => {
  it("should give the waiting page with response code 200", done => {
    request(app)
      .post("/createGame")
      .send({ body: "chandan" })
      .expect("Content-Type", /plain/)
      .expect(302, done);
  });
});

describe("POST /joinGame", () => {
  it("should redirect to the homepage if id is incorrect", done => {
    app.activeGames["2"] = new Game(2);
    request(app)
      .post("/joinGame")
      .send("username=chandan&gameId=1")
      .expect("Content-Type", /plain/)
      .expect(302, done);
  });

  it("should give the waiting page with response code 200 if the id is correct", done => {
    request(app)
      .post("/joinGame")
      .send("username=chandan&gameId=2")
      .expect("Content-Type", /plain/)
      .expect(302, done);
  });

  it("should show that the game has started if game is already active", done => {
    app.activeGames["2"] = new Game(2);
    app.activeGames["2"].start();
    request(app)
      .post("/joinGame")
      .send("username=chandan&gameId=2")
      .expect("Content-Type", /html/)
      .expect(200, done);
  });
});

describe("GET /createGame", () => {
  it("should give the waiting page with response code 200", done => {
    app.activeGames["2"] = new Game(1);
    request(app)
      .get("/createGame?gameId=2")
      .expect(200, done);
  });

  it("should give to the gameplay page if max player has joined", done => {
    app.activeGames["2"] = new Game(0);
    request(app)
      .get("/createGame?gameId=2")
      .expect(200, done);
  });
});

describe("GET /gameplay", () => {
  it("should show the gameplay page with response code 200", done => {
    app.activeGames["2"] = new Game(0);
    request(app)
      .get("/gameplay")
      .set("Cookie", ["gameId=2;playerId=12345"])
      .expect(200, done);
  });
});

describe("GET /powerPlantMarket", () => {
  it("should return the powerPlants with status code 200", done => {
    app.activeGames["11"] = new Game(2);
    app.activeGames["11"].powerPlantMarket = new PowerPlantMarket(
      powerPlantsCards
    );
    app.cookies["12345"] = "Ankon";
    request(app)
      .get("/powerPlantMarket")
      .set("Cookie", ["gameId=11;playerId=12345"])
      .expect("Content-Type", /html/)
      .expect(200, done);
  });
});

describe("GET /waitingPage", () => {
  it("should show the waiting page with response code 200", done => {
    app.activeGames["2"] = new Game(2);
    request(app)
      .get("/waitingPage")
      .set("Cookie", ["gameId=2;playerId=12345"])      
      .expect(200, done);
  });
});

describe("GET /invalidGameId", () => {
  it("should show the join page with error message", done => {
    request(app)
      .get("/invalidGameId")
      .expect(200, done);
  });
});

describe("GET /currentPlayer", () => {
  it("should return response code 200 if cookie is present", done => {
    app.activeGames["5"] = new Game(2);
    app.cookies["1234"] = "Ankon";
    request(app)
      .get("/currentPlayer")
      .set("Cookie", ["gameId=5;playerId=1234"])
      .expect(200, done);
  });
});

describe("GET /currentPlayer/update", () => {
  it("should return response code 200 if cookie is present", done => {
    app.activeGames["5"] = new Game(2);
    app.cookies["1234"] = "Ankon";
    request(app)
      .get("/currentPlayer/update")
      .set("Cookie", ["gameId=5;playerId=1234"])
      .expect(200, done);
  });
});

describe("POST /powerPlant/buy", () => {
  it("should add powerplant details to current player", done => {
    app.activeGames["10"] = new Game(3);
    app.cookies["1111"] = "Ankon";
    const player = new Player("red", "Ankon");
    app.activeGames["10"].powerPlantMarket = new PowerPlantMarket(
      powerPlantsCards
    );
    app.activeGames[10].addPlayer(player);
    request(app)
      .post("/powerPlant/buy")
      .send("price=10")
      .set("Cookie", ["gameId=10;playerId=2468"])
      .expect(200, done);
  });
});

describe("POST /resources/buy", function() {
  it("should return code 200 if resource data is registered succesfully", done => {
    const player1 = new Player("green", "naman");
    app.activeGames["5"] = new Game(2);
    app.activeGames["5"].addPlayer(player1);
    app.cookies["1234"] = "Ankon";
    request(app)
      .post("/resources/buy")
      .set("Cookie", ["gameId=5;playerId=1234"])
      .send("Coal=1&Uranium=1&Oil=1&Garbage=1")
      .expect(200, done);
  });

  it("should return code 200 if resource data is registered succesfully", done => {
    const player1 = new Player("blue", "deepika");
    app.activeGames["55"] = new Game(2);
    app.activeGames["55"].addPlayer(player1);
    app.cookies["555"] = "Leela";
    request(app)
      .post("/resources/buy")
      .set("Cookie", ["gameId=55;playerId=555"])
      .send("Coal=1&Uranium=1&Oil=1&Garbage=10&Cost=100")
      .expect(200, done);
  });
});

describe("POST /cities/build", () => {
  it("should  add the city details to the player who buys if player has enough money", done => {
    app.activeGames["99"] = new Game(3);
    app.cookies["999"] = "Ankon";
    const player = new Player("red", "Ankon");
    app.activeGames[99].addPlayer(player);
    request(app)
      .post("/cities/build")
      .send(`price=10&cityCount=2&cityNames=maimi_10`)
      .set("Cookie", ["gameId=99;playerId=999"])
      .expect(200, done);
  });

  it("should not  add the city details to the player who buys if player has not enough money", done => {
    app.activeGames["99"] = new Game(3);
    app.cookies["999"] = "Ankon";
    const player = new Player("red", "Ankon");
    app.activeGames[99].addPlayer(player);
    request(app)
      .post("/cities/build")
      .send(`price=60&cityCount=6&cityNames=maimi_10`)
      .set("Cookie", ["gameId=99;playerId=999"])
      .expect(200, done);
  });
});

describe("GET /players", () => {
  it("should return the details of the players with response code 200", done => {
    app.activeGames["99"] = new Game(3);
    app.cookies["999"] = "Ankon";
    const player = new Player("red", "Ankon");
    app.activeGames[99].addPlayer(player);
    request(app)
      .get("/players")
      .set("Cookie", ["gameId=99;playerId=999"])
      .expect(200, done);
  });
});

describe("GET /players/stats", function() {
  it("should give current player details ", done => {
    const player1 = new Player("green", "naman");
    app.activeGames["10"] = new Game(2);
    app.activeGames["10"].addPlayer(player1);
    app.cookies["12344"] = "Ankon";
    request(app)
      .get("/players/stats")
      .set("Cookie", ["gameId=10;playerId=12344"])
      .expect(200, done);
  });
});

describe("GET /resources", function() {
  it("should respond with 200", function(done) {
    request(app)
      .get("/resources")
      .set("Cookie", ["gameId=5;playerId=1234"])
      .expect(200, done);
  });
});

describe("GET /currentPowerPlants", function() {
  it('should respond with 200', function(done) {
    app.activeGames['51'] = new Game(2);
    app.activeGames['51'].powerPlantMarket = new PowerPlantMarket(
      powerPlantsCards
    );
    app.cookies['123456'] = 'Ankon';
    request(app)
      .get('/currentPowerPlants')
      .set('Cookie', ['gameId=51;playerId=123456'])
      .expect(200, done);
  });
});

describe("GET /logs", function () {
  it('should respond with 200', function (done) {
    app.activeGames['52'] = new Game(2);
    app.cookies['1234567'] = 'Ankon';
    request(app)
      .get('/logs')
      .set('Cookie', ['gameId=52;playerId=1234567'])
      .expect(200, done);
  });
});

describe("POST /cities/light", () => {

  it("should pay for selected lighted cities", done => {
    app.activeGames["990"] = new Game(4);
    app.cookies["991"] = "Ankon";
    const player = new Player("red", "Ankon");
    app.activeGames[990].addPlayer(player);
    request(app)
      .post("/cities/light")
      .send(`city=1`)
      .set("Cookie", ["gameId=990;playerId=991"])
      .expect(200, done);
  });

  it("should pay for selected lighted cities", done => {
    app.activeGames["990"] = new Game(4);
    app.cookies["991"] = "Ankon";
    const player = new Player("red", "Ankon");
    player.cities = 3;
    app.activeGames[990].addPlayer(player);
    request(app)
      .post("/cities/light")
      .send(`city=2`)
      .set("Cookie", ["gameId=990;playerId=991"])
      .expect(200, done);
  });

});

describe("GET /player/powerplants", function () {
  it('should respond with 200', function (done) {
    app.activeGames['5'] = new Game(2);
    app.cookies['111'] = 'Gaurav';
    const player = new Player("red", "Gaurav");
    app.activeGames[5].addPlayer(player);
    request(app)
      .get('/player/powerplants')
      .set('Cookie', ['gameId=5;playerId=111'])
      .expect(200, done);
  });
});

describe("GET /get/playerResources", function () {
  it('should respond with 200', function (done) {
    app.activeGames['4'] = new Game(2);
    app.cookies['110'] = 'Gaurav';
    const player = new Player("black", "Gaurav");
    app.activeGames[4].addPlayer(player);
    request(app)
      .get('/get/playerResources')
      .set('Cookie', ['gameId=4;playerId=110'])
      .expect(200, done);
  });
});
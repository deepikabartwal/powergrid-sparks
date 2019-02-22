const chai = require("chai");
const sinon = require("sinon");
const Game = require("../../src/model/Game");
const Player = require("../../src/model/player");

describe("Game", () => {
  let game;
  beforeEach(() => {
    game = new Game(6);
  });
  describe("addPlayer", () => {
    it("should return empty list if initially", () => {
      const expectedOutput = [];
      const actualOutput = game.players;
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });

    it("should add player to players list", () => {
      game.addPlayer("ankon");
      const expectedOutput = ["ankon"];
      const actualOutput = game.players;
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("hasStarted", () => {
    it("should return false initially", () => {
      const expectedOutput = false;
      const actualOutput = game.hasStarted();
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("start", () => {
    it("should start the game", () => {
      game.start();
      const expectedOutput = true;
      const actualOutput = game.active;
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("getPlayers", () => {
    it("should return empty array initially", () => {
      const expectedOutput = [];
      const actualOutput = game.getPlayers();
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("getCurrentPlayersCount", () => {
    it("should return 0 initially", () => {
      const expectedOutput = 0;
      const actualOutput = game.getCurrentPlayersCount();
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("getMaxPlayersCount", () => {
    it("should return 6 initially", () => {
      const expectedOutput = 6;
      const actualOutput = game.getMaxPlayersCount();
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("getPlayerColor", () => {
    it("It should return a color", () => {
      const actualOutput = game.getPlayerColor();
      const expectedOutput = "red";
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("decideOrder", () => {
    it("should decide the random order of players", () => {
      game.decideOrder(() => {});
      const actualOutput = game.isShuffled;
      const expectedOutput = true;
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });

    it("should give the shuffled order", () => {
      const shuffler = sinon.stub();
      shuffler.onFirstCall().returns(["chandan", "ankon", "gaurav"]);
      game.decideOrder(shuffler);
      const expectedOutput = ["chandan", "ankon", "gaurav"];
      const actualOutput = game.players;
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("getTurn", () => {
    it("should create a turn if the game doesnt have a turn", () => {
      const player1 = new Player("green", "leela");
      const player2 = new Player("blue", "ankon");
      const players = [player1, player2];
      const actualOutput = game.getTurn(players);
      const expectedOutput = { players, currentPlayerIndex: 0 };
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });

    it("should create a turn if the game doesnt have a turn", () => {
      const player1 = new Player("green", "leela");
      const player2 = new Player("blue", "ankon");
      const players = [player1, player2];
      game.getTurn(players);
      game.turn.updateCurrentPlayer();
      const actualOutput = game.getTurn(players);
      const expectedOutput = { players, currentPlayerIndex: 1 };
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });

  describe("getResourceMarket", () => {
    it("should create a resource market if the game doesn't have a resource market", () => {
      const actualOutput = game.getResourceMarket();
      const expectedOutput = {
        Coal: {
          "1": {
            "0": true,
            "1": true,
            "2": true
          },
          "2": {
            "0": true,
            "1": true,
            "2": true
          },
          "3": {
            "0": true,
            "1": true,
            "2": true
          },
          "4": {
            "0": true,
            "1": true,
            "2": true
          },
          "5": {
            "0": true,
            "1": true,
            "2": true
          },
          "6": {
            "0": true,
            "1": true,
            "2": true
          },
          "7": {
            "0": true,
            "1": true,
            "2": true
          },
          "8": {
            "0": true,
            "1": true,
            "2": true
          }
        },
        Garbage: {
          "1": {
            "0": false,
            "1": false,
            "2": false
          },
          "2": {
            "0": false,
            "1": false,
            "2": false
          },
          "3": {
            "0": false,
            "1": false,
            "2": false
          },
          "4": {
            "0": false,
            "1": false,
            "2": false
          },
          "5": {
            "0": false,
            "1": false,
            "2": false
          },
          "6": {
            "0": false,
            "1": false,
            "2": false
          },
          "7": {
            "0": true,
            "1": true,
            "2": true
          },
          "8": {
            "0": true,
            "1": true,
            "2": true
          }
        },
        Oil: {
          "1": {
            "0": false,
            "1": false,
            "2": false
          },
          "2": {
            "0": false,
            "1": false,
            "2": false
          },
          "3": {
            "0": true,
            "1": true,
            "2": true
          },
          "4": {
            "0": true,
            "1": true,
            "2": true
          },
          "5": {
            "0": true,
            "1": true,
            "2": true
          },
          "6": {
            "0": true,
            "1": true,
            "2": true
          },
          "7": {
            "0": true,
            "1": true,
            "2": true
          },
          "8": {
            "0": true,
            "1": true,
            "2": true
          }
        },
        Uranium: {
          "1": {
            "0": false
          },
          "2": {
            "0": false
          },
          "3": {
            "0": false
          },
          "4": {
            "0": false
          },
          "5": {
            "0": false
          },
          "6": {
            "0": false
          },
          "7": {
            "0": false
          },
          "8": {
            "0": false
          },
          "10": {
            "0": false
          },
          "12": {
            "0": false
          },
          "14": {
            "0": true
          },
          "16": {
            "0": true
          }
        }
      };
      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });

    it("shouldn't create a resource market if the game already have it", () => {
      game.getResourceMarket();
      const actualOutput = game.getResourceMarket();

      const expectedOutput = {
        Coal: {
          "1": {
            "0": true,
            "1": true,
            "2": true
          },
          "2": {
            "0": true,
            "1": true,
            "2": true
          },
          "3": {
            "0": true,
            "1": true,
            "2": true
          },
          "4": {
            "0": true,
            "1": true,
            "2": true
          },
          "5": {
            "0": true,
            "1": true,
            "2": true
          },
          "6": {
            "0": true,
            "1": true,
            "2": true
          },
          "7": {
            "0": true,
            "1": true,
            "2": true
          },
          "8": {
            "0": true,
            "1": true,
            "2": true
          }
        },
        Garbage: {
          "1": {
            "0": false,
            "1": false,
            "2": false
          },
          "2": {
            "0": false,
            "1": false,
            "2": false
          },
          "3": {
            "0": false,
            "1": false,
            "2": false
          },
          "4": {
            "0": false,
            "1": false,
            "2": false
          },
          "5": {
            "0": false,
            "1": false,
            "2": false
          },
          "6": {
            "0": false,
            "1": false,
            "2": false
          },
          "7": {
            "0": true,
            "1": true,
            "2": true
          },
          "8": {
            "0": true,
            "1": true,
            "2": true
          }
        },
        Oil: {
          "1": {
            "0": false,
            "1": false,
            "2": false
          },
          "2": {
            "0": false,
            "1": false,
            "2": false
          },
          "3": {
            "0": true,
            "1": true,
            "2": true
          },
          "4": {
            "0": true,
            "1": true,
            "2": true
          },
          "5": {
            "0": true,
            "1": true,
            "2": true
          },
          "6": {
            "0": true,
            "1": true,
            "2": true
          },
          "7": {
            "0": true,
            "1": true,
            "2": true
          },
          "8": {
            "0": true,
            "1": true,
            "2": true
          }
        },
        Uranium: {
          "1": {
            "0": false
          },
          "2": {
            "0": false
          },
          "3": {
            "0": false
          },
          "4": {
            "0": false
          },
          "5": {
            "0": false
          },
          "6": {
            "0": false
          },
          "7": {
            "0": false
          },
          "8": {
            "0": false
          },
          "10": {
            "0": false
          },
          "12": {
            "0": false
          },
          "14": {
            "0": true
          },
          "16": {
            "0": true
          }
        }
      };

      chai.expect(expectedOutput).to.be.deep.equal(actualOutput);
    });
  });
});

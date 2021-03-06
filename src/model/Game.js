const Turn = require("./turn");
const ResourceMarket = require("./resource_market");
const ActivityLog = require("./activityLog");
const PlayingOrder = require("./playing_order");
const { Auction } = require("./auction");
const Phase = require("./phase");

class Game {
  constructor(playerCount) {
    this.active = false;
    this.players = [];
    this.maxPlayerCount = playerCount;
    this.colors = [
      "gd55a11d1",
      "gffbf46",
      "g575761",
      "g765192b8",
      "g648381",
      "gcf9f1634"
    ];
    this.isShuffled = false;
    this.activityLog = new ActivityLog(Date);
    this.playerOrder = this.players;
    this.phase = new Phase();
    this.isAuctionStarted = false;
    this.currentPowerPlant;
    this.winner;
  }

  conductAuction(bidAmount, selectedPowerPlant) {
    if (this.auction == undefined) {
      const auctionPlayers = this.players.slice();
      this.auction = new Auction(auctionPlayers, this.powerPlantMarket);
      this.auction.selectPowerPlant(selectedPowerPlant, bidAmount);
      this.currentPowerPlant = selectedPowerPlant;
      this.isAuctionStarted = true;
      return;
    }

    if (this.auction.isBidOver) {
      this.auction.selectPowerPlant(selectedPowerPlant, bidAmount);
      this.currentPowerPlant = selectedPowerPlant;
      return;
    }

    const { isBidOver } = this.auction.continue(bidAmount);

    if (isBidOver) {
      this.sellPowerPlant(this.currentPowerPlant);
      this.updatePowerPlants();
    }
  }

  isAuctionOver() {
    if (this.auction == undefined) return false;
    if (this.auction.isAuctionOver()) {
      this.isAuctionStarted = false;
      this.auction = undefined;
      return true;
    }
    return false;
  }

  getAuctionAction() {
    return this.auction.getAction();
  }

  getPlayersOrder() {
    if (this.auction == undefined) {
      this.playerOrder = this.players.slice();
      return this.playerOrder;
    }

    if (!this.auction.isAuctionOver()) {
      this.playerOrder = this.auction.getOrder();
    }
    return this.playerOrder;
  }

  isBidOver() {
    if (this.auction == undefined) return false;
    return this.auction.isBidDone();
  }

  getCurrentBid() {
    if (this.auction == undefined) return 0;
    return this.auction.getCurrentBid();
  }

  getBidPlayers() {
    if (this.auction == undefined) {
      const playerIds = this.players.map(player => player.id);
      return playerIds;
    }
    return this.auction.getBidPlayers();
  }

  getAuctionPlayers() {
    if (this.auction == undefined) {
      const playerIds = this.players.map(player => player.id);
      return playerIds;
    }
    return this.auction.getPlayers();
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getResourceMarket() {
    if (this.resourceMarket == undefined) {
      this.resourceMarket = new ResourceMarket();
    }
    return this.resourceMarket;
  }

  getTurn(players) {
    if (this.turn == undefined) {
      this.turn = new Turn(players);
    }
    return this.turn;
  }

  resetTurn() {
    this.turn.resetTurn();
  }

  hasStarted() {
    return this.active;
  }

  start() {
    this.active = true;
  }

  getPlayers() {
    return this.players;
  }

  getPlayerColor() {
    return this.colors.shift();
  }

  decideOrder(shuffler) {
    !this.isShuffled && (this.players = shuffler(this.players));
    this.isShuffled = true;
  }

  getCurrentPlayersCount() {
    return this.players.length;
  }

  getMaxPlayersCount() {
    return this.maxPlayerCount;
  }

  initializePowerPlantMarket(market) {
    this.powerPlantMarket = market;
  }

  shuffleDeck(shuffler) {
    this.powerPlantMarket.shuffleDeck(shuffler);
  }

  getPowerPlantMarket() {
    return this.powerPlantMarket.getCurrentPowerPlants();
  }

  sellPowerPlant(price) {
    this.powerPlantMarket.sellPowerPlant(price);
  }

  updatePowerPlants() {
    this.powerPlantMarket.updateCurrentMarket();
  }

  addLog(log) {
    this.activityLog.addLog(log);
  }

  getLogs() {
    return this.activityLog.getLogs();
  }

  setPlayingOrder() {
    const playingOrder = new PlayingOrder(this.players);
    this.players = playingOrder.getOrder();
  }

  addSelectedPowerPlant(powerPlant) {
    this.powerPlantMarket.addSelectedPowerPlant(powerPlant);
  }

  rearrangePowerPlants() {
    this.powerPlantMarket.rearrange();
  }

  changePhaseTo(phase) {
    this.phase.changePhaseTo(phase);
  }

  currentPhase() {
    return this.phase.currentPhase();
  }

  setWinner(winner) {
    this.winner = winner;
  }

  getWinner() {
    return this.winner;
  }
}

module.exports = Game;

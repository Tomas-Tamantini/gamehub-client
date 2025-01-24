export var GameStatus;
(function (GameStatus) {
    GameStatus["START_GAME"] = "START_GAME";
    GameStatus["START_MATCH"] = "START_MATCH";
    GameStatus["DEAL_CARDS"] = "DEAL_CARDS";
    GameStatus["START_ROUND"] = "START_ROUND";
    GameStatus["START_TURN"] = "START_TURN";
    GameStatus["AWAIT_PLAYER_ACTION"] = "AWAIT_PLAYER_ACTION";
    GameStatus["END_TURN"] = "END_TURN";
    GameStatus["END_ROUND"] = "END_ROUND";
    GameStatus["END_MATCH"] = "END_MATCH";
    GameStatus["UPDATE_POINTS"] = "UPDATE_POINTS";
    GameStatus["END_GAME"] = "END_GAME";
})(GameStatus || (GameStatus = {}));

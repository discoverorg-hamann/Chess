'use strict';

var Piece = require('./Piece'),
    Grid = require('./Grid');

var Queen = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
};

Queen.prototype = Object.create(Piece.prototype);

Queen.prototype.moveStraight = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var piece = this,
        yToCheck,
        oldX = this.position.x,
        oldY = this.position.y,
        board = grid.grid;

    if ((oldX !== x && oldY !== y) || (oldX === x && oldY === y)) {
        return false;
    }

    if (oldX === x && oldY > y) {
        for (var i = oldY - 1; i >= y; i--) {
            if (board[x][i]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, x, i)) {
                    oldObj = board[x][i];
                    this.setGridStraight(grid, x, oldX, i, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGridStraight(grid, x, oldX, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldX === x && oldY < y) {
        for (var i = oldY + 1; i <= y; i++) {
            if (board[x][i]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, x, i)) {
                    var oldObj = board[x][i];
                    this.setGridStraight(grid, x, oldX, i, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGridStraight(grid, x, oldX, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldY === y && oldX > x) {
        for (var i = oldX - 1; i >= x; i--) {
            if (board[i][y]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, i, y)) {
                    var oldObj = board[i][y];
                    this.setGridStraight(grid, i, oldX, y, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGridStraight(grid, x, oldX, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldY === y && oldX < x) {
        for (var i = oldX + 1; i <= x; i++) {
            if (board[i][y]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, i, y)) {
                    var oldObj = board[i][y];
                    this.setGridStraight(grid, i, oldX, y, oldY);
                    grid.splicePiece(oldObj);
                    this.unTouched = false;
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGridStraight(grid, x, oldX, y, oldY);
        this.unTouched = false;
        return true;
    }
};

Queen.prototype.moveDiagonal = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var yToCheck,
        oldX = this.position.x,
        oldY = this.position.y,
        color = this.color;


    if (oldY === y || oldX === x) {
        return false;
    }

    if (oldX > x && oldY > y) {
        var xToCheck = oldX - x,
            yToCheck = oldY - y;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY - i]) {
                this.checkPiece.apply(this, [grid, oldX - 1, oldX, oldY - 1, oldY]);
                return true;
            }
        }
        this.checkPiece.apply(this, [grid, x, oldX, y, oldY]);
        return true;
    }

    if (oldX > x && oldY < y) {
        var xToCheck = oldX - x,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY + i]) {
                this.checkPiece.apply(this, [grid, oldX - 1, oldX, oldY + i, oldY]);
                return true;
            }
        }
        this.checkPiece.apply(this, [grid, x, oldX, y, oldY]);
        return true;
    }

    if (oldX < x && oldY > y) {
        var xToCheck = x - oldX,
            yToCheck = oldY - y;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX + i][oldY - i]) {
                this.checkPiece.apply(this, [grid, oldX + 1, oldX, oldY + i, oldY]);
                return true;
            }
        }
        this.checkPiece.apply(this, [grid, x, oldX, y, oldY]);
        return true;
    }

    if (oldX < x && oldY < y) {
        var xToCheck = x - oldX,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY - i]) {
                this.checkPiece.apply(this, [grid, oldX + 1, oldX, oldY + i, oldY]);
                return true;
            }
        }
        this.checkPiece.apply(this, [grid, x, oldX, y, oldY]);
        return true;
    }
    return false;
};

Queen.prototype.setGridStraight = function(grid, x, oldX, y, oldY) {

    if (!x || !y || !oldX || !oldY) {
        return false;
    }

    if ((oldX === x && oldY !== y) || (oldX !== x && oldY === y)) {
        this.setPosition(x, y);
        grid.setPiece(x, y, oldX, oldY, this);
        return true;
    }
    return false;
};

Queen.prototype.setGridDiagonal = function(grid, x, oldX, y, oldY) {

    if (!x || !y || !oldX || !oldY) {
        return false;
    }

    if (oldX !== x && oldY !== y) {
        this.setPosition(x, y);
        grid.setPiece(x, y, oldX, oldY, this);
        return true;
    }
    return false;
};

Queen.prototype.checkPiece = function(grid, numX, oldNumX, numY, oldNumY) {
    var oldObj;

    if (this.checkIfOppositeColor.apply(this, [grid.grid, numX, numY])) {
        oldObj = grid.grid[numX][numY];
        this.setGridDiagonal.apply(this, [grid, numX, oldNumX, numY, oldNumY]);
        grid.splicePiece(oldObj);
        return true;
    } else {
        return false;
    }
};

module.exports = Queen;
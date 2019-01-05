"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.equals = function (v) {
        return this.x === v.x && this.y === v.y;
    };
    Vec2.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vec2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vec2.prototype.plus = function (v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    };
    Vec2.prototype.minus = function (v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    };
    Vec2.prototype.times = function (x, y) {
        if (y === void 0) { y = x; }
        return new Vec2(this.x * x, this.y * y);
    };
    Vec2.prototype.mutableCopy = function () {
        return new MutableVec2(this.x, this.y);
    };
    return Vec2;
}());
exports.Vec2 = Vec2;
var MutableVec2 = /** @class */ (function () {
    function MutableVec2(x, y) {
        this.x = x;
        this.y = y;
    }
    MutableVec2.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    MutableVec2.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    MutableVec2.prototype.scale = function (x, y) {
        if (y === void 0) { y = x; }
        this.x *= x;
        this.y *= y;
        return this;
    };
    MutableVec2.prototype.scaleBy = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    };
    MutableVec2.prototype.frozenCopy = function () {
        return new Vec2(this.x, this.y);
    };
    return MutableVec2;
}());
exports.MutableVec2 = MutableVec2;
exports.ZeroZeroVec2 = new Vec2(0, 0);
exports.PosXVec2 = new Vec2(1, 0);
exports.NegXVec2 = new Vec2(-1, 0);
exports.PosYVec2 = new Vec2(0, 1);
exports.NegYVec2 = new Vec2(0, -1);
function boundsVec2(vecs) {
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;
    for (var _i = 0, vecs_1 = vecs; _i < vecs_1.length; _i++) {
        var v = vecs_1[_i];
        if (v.x < minX) {
            minX = v.x;
        }
        if (v.y < minY) {
            minY = v.y;
        }
        if (v.x > maxX) {
            maxX = v.x;
        }
        if (v.y > maxY) {
            maxY = v.y;
        }
    }
    return {
        min: new Vec2(minX, minY),
        max: new Vec2(maxX, maxY)
    };
}
exports.boundsVec2 = boundsVec2;

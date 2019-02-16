"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hex = /** @class */ (function () {
    function Hex(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s == undefined ? -q - r : s;
    }
    Hex.fromId = function (hexId) {
        var parts = hexId.split('_');
        return new Hex(parseInt(parts[0], 10), parseInt(parts[1], 10));
    };
    Hex.prototype.id = function () {
        return this.q + "_" + this.r;
    };
    Hex.prototype.equals = function (h) {
        return this.q === h.q && this.r === h.r && this.s === h.s;
    };
    Hex.prototype.length = function () {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    };
    Hex.prototype.distanceTo = function (h) {
        return (Math.abs(h.q - this.q) + Math.abs(h.r - this.r) + Math.abs(h.s - this.s)) / 2;
    };
    Hex.prototype.clone = function () {
        return new Hex(this.q, this.r, this.s);
    };
    Hex.prototype.plus = function (h) {
        return new Hex(this.q + h.q, this.r + h.r, this.s + h.s);
    };
    Hex.prototype.minus = function (h) {
        return new Hex(this.q - h.q, this.r - h.r, this.s - h.s);
    };
    Hex.prototype.times = function (n) {
        return new Hex(this.q * n, this.r * n, this.s * n);
    };
    Hex.prototype.mutableCopy = function () {
        return new MutableHex(this.q, this.r, this.s);
    };
    Hex.Origin = new Hex(0, 0);
    Hex.PosQ = new Hex(1, 0);
    Hex.PosR = new Hex(0, 1);
    Hex.PosQNegR = new Hex(1, -1);
    Hex.NegQ = new Hex(-1, 0);
    Hex.NegR = new Hex(0, -1);
    Hex.NegQPosR = new Hex(-1, 1);
    return Hex;
}());
exports.Hex = Hex;
var MutableHex = /** @class */ (function () {
    function MutableHex(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s == undefined ? -q - r : s;
    }
    MutableHex.prototype.add = function (h) {
        this.q += h.q;
        this.r += h.r;
        this.s += h.s;
        return this;
    };
    MutableHex.prototype.sub = function (h) {
        this.q -= h.q;
        this.r -= h.r;
        this.s -= h.s;
        return this;
    };
    MutableHex.prototype.scale = function (n) {
        this.q *= n;
        this.r *= n;
        this.s *= n;
        return this;
    };
    MutableHex.prototype.round = function () {
        var roundQ = Math.round(this.q);
        var roundR = Math.round(this.r);
        var roundS = Math.round(this.s);
        var qDiff = Math.abs(this.q - roundQ);
        var rDiff = Math.abs(this.r - roundR);
        var sDiff = Math.abs(this.s - roundS);
        if (qDiff > rDiff && qDiff > sDiff) {
            roundQ = -roundR - roundS;
        }
        else if (rDiff > sDiff) {
            roundR = -roundQ - roundS;
        }
        else {
            roundS = -roundQ - roundR;
        }
        this.q = roundQ;
        this.r = roundR;
        this.s = roundS;
        return this;
    };
    MutableHex.prototype.frozenCopy = function () {
        return new Hex(this.q, this.r, this.s);
    };
    return MutableHex;
}());
exports.MutableHex = MutableHex;

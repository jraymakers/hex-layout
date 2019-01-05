"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hex_1 = require("./Hex");
var Vec2_1 = require("./Vec2");
var sqrt3 = Math.sqrt(3);
var sqrt3_2 = sqrt3 / 2;
/*  __
 * / _\
 * \__/
 */
var XAlignedHex;
(function (XAlignedHex) {
    XAlignedHex.PosX = new Vec2_1.Vec2(1, 0);
    XAlignedHex.PosXPosY = new Vec2_1.Vec2(0.5, sqrt3_2);
    XAlignedHex.NegXPosY = new Vec2_1.Vec2(-0.5, sqrt3_2);
    XAlignedHex.NegX = new Vec2_1.Vec2(-1, 0);
    XAlignedHex.NegXNegY = new Vec2_1.Vec2(-0.5, -sqrt3_2);
    XAlignedHex.PosXNegY = new Vec2_1.Vec2(0.5, -sqrt3_2);
})(XAlignedHex = exports.XAlignedHex || (exports.XAlignedHex = {}));
/*   >.<
 * |     |
 * |  |  |
 *   >.<
 */
var YAlignedHex;
(function (YAlignedHex) {
    YAlignedHex.PosXPosY = new Vec2_1.Vec2(sqrt3_2, 0.5);
    YAlignedHex.PosY = new Vec2_1.Vec2(0, 1);
    YAlignedHex.NegXPosY = new Vec2_1.Vec2(-sqrt3_2, 0.5);
    YAlignedHex.NegXNegY = new Vec2_1.Vec2(-sqrt3_2, -0.5);
    YAlignedHex.NegY = new Vec2_1.Vec2(0, -1);
    YAlignedHex.PosXNegY = new Vec2_1.Vec2(sqrt3_2, -0.5);
})(YAlignedHex = exports.YAlignedHex || (exports.YAlignedHex = {}));
var Corner;
(function (Corner) {
    Corner[Corner["PosQPosR"] = 0] = "PosQPosR";
    Corner[Corner["NegQPos2R"] = 1] = "NegQPos2R";
    Corner[Corner["Neg2QPosR"] = 2] = "Neg2QPosR";
    Corner[Corner["NegQNegR"] = 3] = "NegQNegR";
    Corner[Corner["PosQNeg2R"] = 4] = "PosQNeg2R";
    Corner[Corner["Pos2QNegR"] = 5] = "Pos2QNegR";
})(Corner = exports.Corner || (exports.Corner = {}));
;
var EdgeCenter;
(function (EdgeCenter) {
    EdgeCenter[EdgeCenter["PosQ"] = 0] = "PosQ";
    EdgeCenter[EdgeCenter["PosR"] = 1] = "PosR";
    EdgeCenter[EdgeCenter["NegQPosR"] = 2] = "NegQPosR";
    EdgeCenter[EdgeCenter["NegQ"] = 3] = "NegQ";
    EdgeCenter[EdgeCenter["NegR"] = 4] = "NegR";
    EdgeCenter[EdgeCenter["PosQNegR"] = 5] = "PosQNegR";
})(EdgeCenter = exports.EdgeCenter || (exports.EdgeCenter = {}));
;
var HexLayout = /** @class */ (function () {
    function HexLayout(settings) {
        this.origin = settings.origin;
        this.qBasis = settings.qBasis;
        this.rBasis = settings.rBasis;
        this.scale = settings.scale;
        var det = this.qBasis.x * this.rBasis.y - this.qBasis.y * this.rBasis.x;
        if (det === 0) {
            throw new Error('Invalid basis vectors!  Matrix has no determinant.');
        }
        var detInv = 1 / det;
        this.qInverse = new Vec2_1.Vec2(this.rBasis.y * detInv, -this.rBasis.x * detInv);
        this.rInverse = new Vec2_1.Vec2(-this.qBasis.y * detInv, this.qBasis.x * detInv);
        var posQPosRCornerVec = this.qBasis.mutableCopy().add(this.rBasis).scale(1 / 3).scaleBy(this.scale).frozenCopy();
        var negQPos2RCornerVec = this.rBasis.mutableCopy().scale(2).sub(this.qBasis).scale(1 / 3).scaleBy(this.scale).frozenCopy();
        var neg2QPosRCornerVec = this.qBasis.mutableCopy().scale(-2).add(this.rBasis).scale(1 / 3).scaleBy(this.scale).frozenCopy();
        var negQNegRCornerVec = posQPosRCornerVec.times(-1);
        var posQNeg2RCornerVec = negQPos2RCornerVec.times(-1);
        var pos2QNegRCornerVec = neg2QPosRCornerVec.times(-1);
        this.cornerVecs = [
            posQPosRCornerVec,
            negQPos2RCornerVec,
            neg2QPosRCornerVec,
            negQNegRCornerVec,
            posQNeg2RCornerVec,
            pos2QNegRCornerVec,
        ];
        var posQEdgeCenterVec = this.qBasis.mutableCopy().scale(1 / 2).scaleBy(this.scale).frozenCopy();
        var posREdgeCenterVec = this.rBasis.mutableCopy().scale(1 / 2).scaleBy(this.scale).frozenCopy();
        var negQPosREdgeCenterVec = this.rBasis.mutableCopy().sub(this.qBasis).scale(1 / 2).scaleBy(this.scale).frozenCopy();
        var negQEdgeCenterVec = posQEdgeCenterVec.times(-1);
        var negREdgeCenterVec = posREdgeCenterVec.times(-1);
        var posQNegREdgeCenterVec = negQPosREdgeCenterVec.times(-1);
        this.edgeCenterVecs = [
            posQEdgeCenterVec,
            posREdgeCenterVec,
            negQPosREdgeCenterVec,
            negQEdgeCenterVec,
            negREdgeCenterVec,
            posQNegREdgeCenterVec,
        ];
    }
    HexLayout.prototype.cornerVec = function (corner) {
        return this.cornerVecs[corner];
    };
    HexLayout.prototype.edgeCenterVec = function (edgeCenter) {
        return this.edgeCenterVecs[edgeCenter];
    };
    HexLayout.prototype.centerOfHex = function (h) {
        return new Vec2_1.Vec2(this.origin.x + this.scale.x * (this.qBasis.x * h.q + this.rBasis.x * h.r), this.origin.y + this.scale.y * (this.qBasis.y * h.q + this.rBasis.y * h.r));
    };
    HexLayout.prototype.hexFromPoint = function (v) {
        var x = (v.x - this.origin.x) / this.scale.x;
        var y = (v.y - this.origin.y) / this.scale.y;
        return new Hex_1.MutableHex(x * this.qInverse.x + y * this.qInverse.y, x * this.rInverse.x + y * this.rInverse.y).round().frozenCopy();
    };
    HexLayout.prototype.cornersFromCenter = function (center) {
        return this.cornerVecs.map(function (v) { return center.plus(v); });
    };
    HexLayout.prototype.cornersOfHex = function (h) {
        var center = this.centerOfHex(h);
        return this.cornersFromCenter(center);
    };
    HexLayout.prototype.bounds = function (hexes) {
        var allCorners = [];
        for (var _i = 0, hexes_1 = hexes; _i < hexes_1.length; _i++) {
            var hex = hexes_1[_i];
            allCorners = allCorners.concat(this.cornersOfHex(hex));
        }
        return Vec2_1.boundsVec2(allCorners);
    };
    return HexLayout;
}());
exports.HexLayout = HexLayout;

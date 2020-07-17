"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//import { si, pantsu } from "C:\\Users\\Tomek\\AppData\\Local\\Microsoft\\TypeScript\\3.9\\node_modules\\@types\\nyaapi\\index"
var nyaapi_1 = require("nyaapi");
//const { si, pantsu } = require("nyaapi");
var dictionary_1 = require("./dictionary");
var AnimeChecker = /** @class */ (function () {
    function AnimeChecker() {
        this.currentAnimeList = new dictionary_1.Dictionary();
        this.lastEpisodeNumber = new Map();
        this.currentAnimeList.Add('HorribleSubs', [
            'Re Zero kara Hajimeru Isekai Seikatsu 1080',
            'Black Clover 1080',
            'The God of High School 1080',
            'Sword Art Online - Alicization - War of Underworld 1080',
            'Enen no Shouboutai S2 1080',
            'Yahari Ore no Seishun Love Come wa Machigatteiru Kan 1080',
            'Kanojo Okarishimasu 1080'
        ]);
    }
    AnimeChecker.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    AnimeChecker.prototype.getEpisodeNumber = function (name) {
        if (name.includes('[HorribleSubs]'))
            return name.substr(name.length - 15, 3).trim();
        return '';
    };
    AnimeChecker.prototype.search = function (submiter, animeTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var result, epNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nyaapi_1.si.searchByUser(submiter, animeTitle, 1)];
                    case 1:
                        result = _a.sent();
                        epNumber = this.getEpisodeNumber(result.shift().name);
                        this.lastEpisodeNumber.set(animeTitle, epNumber);
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    // search(submiter: string, animeTitle: string): void {
    //     si.searchByUser(submiter, animeTitle, 1).then(result => {
    //         let epNumber = this.getEpisodeNumber(((result as []).shift() as NyaaResponse).name)
    //         this.lastEpisodeNumber.set(animeTitle, epNumber)
    //     },
    //         error => console.error(error));
    // }
    AnimeChecker.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, submiter, _b, _c, animeTitle;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.lastEpisodeNumber = new Map();
                        _i = 0, _a = this.currentAnimeList.Keys();
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        submiter = _a[_i];
                        _b = 0, _c = this.currentAnimeList.Item(submiter);
                        _d.label = 2;
                    case 2:
                        if (!(_b < _c.length)) return [3 /*break*/, 5];
                        animeTitle = _c[_b];
                        return [4 /*yield*/, this.search(submiter, animeTitle)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        console.log(app.lastEpisodeNumber);
                        return [2 /*return*/];
                }
            });
        });
    };
    return AnimeChecker;
}());
var app = new AnimeChecker();
app.main();

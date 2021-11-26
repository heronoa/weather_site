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
var _this = this;
var c = function (e) { return document.querySelector(e); };
var cs = function (e) { return document.querySelectorAll(e); };
c('.busca').addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var input, url, results, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                input = c('#searchInput').value;
                if (!(input !== '')) return [3 /*break*/, 3];
                //Loading
                showWarning('Loading...');
                url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(encodeURI(input), "&appid=e343fb683adb68e3711bc7412564068e&units=metric&lang=pt_br");
                return [4 /*yield*/, fetch(url)];
            case 1:
                results = _a.sent();
                return [4 /*yield*/, results.json()];
            case 2:
                json = _a.sent();
                if (json.cod === 200) {
                    showInfo({
                        name: json.name,
                        country: json.sys.country,
                        temperature: json.main.temp,
                        tempIcon: json.weather[0].icon,
                        windSpeed: json.wind.speed,
                        windAngle: json.wind.deg
                    });
                }
                else {
                    clearInfo();
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
function showInfo(json) {
    clearInfo();
    showWarning("");
    // Fill the info from the API to my results
    c('.titulo').innerHTML = "".concat(json.name, ", ").concat(json.country);
    c('.tempInfo').innerHTML = "".concat(json.temperature, " <sup>\u00BAC</sup>");
    c('.ventoInfo').innerHTML = "".concat(json.windSpeed, " <span>km/h</span>");
    c('.temp img').setAttribute = "\"http://openweathermap.org/img/wn/".concat(json.tempIcon, "@2x.png\"");
    c('.ventoPonto').style.transform = "rotate(".concat(json.windAngle - 90, "deg)");
    //Display Result
    c('.resultado').style.display = "block";
}
function clearInfo() {
    c('.resultado').style.display = "none";
}
function showWarning(msg) {
    clearInfo();
    c('.aviso').innerHTML = msg;
}

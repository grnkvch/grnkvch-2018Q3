/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/SessionParser.js":
/*!*********************************!*\
  !*** ./public/SessionParser.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SessionParser; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar SessionParser =\n/*#__PURE__*/\nfunction () {\n  function SessionParser() {\n    _classCallCheck(this, SessionParser);\n\n    this.results = null;\n  }\n\n  _createClass(SessionParser, [{\n    key: \"parse\",\n    value: function parse(sessionData, activeSessionIndex, userData) {\n      var resultsArr = [];\n      var participantsKeys = Object.keys(sessionData[activeSessionIndex].participants);\n      resultsArr[0] = {\n        rounds: []\n      };\n      sessionData[activeSessionIndex].puzzles.forEach(function (item) {\n        resultsArr[0].rounds.push(item.name);\n      });\n      participantsKeys.forEach(function (key) {\n        var userResult = {};\n        userResult.userId = key;\n        userResult.name = userData[key];\n        userResult.rounds = [];\n        var totalTime = 0;\n        sessionData[activeSessionIndex].rounds.forEach(function (item, i) {\n          var time = 0;\n\n          if (item.solutions[key]) {\n            if (item.solutions[key].correct === 'Correct') time = parseInt(item.solutions[key].time.$numberLong);else {\n              time = parseInt(sessionData[activeSessionIndex].puzzles[parseInt(item.puzzleIndex.$numberLong)].options.timeLimit.$numberLong);\n            }\n            totalTime += time;\n            userResult.rounds[i] = time;\n          } else userResult.rounds[i] = ' - ';\n        });\n        userResult.totalTime = totalTime;\n        resultsArr.push(userResult);\n      });\n      this.results = resultsArr.slice();\n      return this.results;\n    }\n  }, {\n    key: \"renderPrep\",\n    value: function renderPrep() {\n      var _this = this;\n\n      var tableMatrix = [[]];\n      this.results.forEach(function (item, i) {\n        if (i === 0) {\n          tableMatrix[0].push('Name');\n\n          _this.results[0].rounds.forEach(function (roundItem) {\n            tableMatrix[0].push(roundItem);\n          });\n\n          tableMatrix[0].push('Total time');\n          tableMatrix[0].push('Comparison');\n        } else {\n          tableMatrix.push([]);\n          tableMatrix[i].push(item.name);\n\n          _this.results[i].rounds.forEach(function (roundItem) {\n            tableMatrix[i].push(roundItem);\n          });\n\n          tableMatrix[i].push(item.totalTime);\n          tableMatrix[i].push(\"<input type=\\\"checkbox\\\">\");\n        }\n      });\n      return tableMatrix;\n    }\n  }]);\n\n  return SessionParser;\n}();\n\n\n\n//# sourceURL=webpack:///./public/SessionParser.js?");

/***/ }),

/***/ "./public/TableRenderer.js":
/*!*********************************!*\
  !*** ./public/TableRenderer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TableRenderer; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar TableRenderer =\n/*#__PURE__*/\nfunction () {\n  function TableRenderer() {\n    _classCallCheck(this, TableRenderer);\n  }\n\n  _createClass(TableRenderer, [{\n    key: \"render\",\n    value: function render(tableMatrix) {\n      var table = null;\n\n      if (document.querySelector('.result-table')) {\n        table = document.querySelector('.result-table');\n        table.innerHTML = '';\n      } else {\n        table = document.createElement('table');\n        table.classList.add('result-table');\n        document.body.appendChild(table);\n      }\n\n      tableMatrix.forEach(function (element) {\n        var tableRow = document.createElement('tr');\n        element.forEach(function (item) {\n          tableRow.innerHTML += \"<td>\".concat(item, \"</td>\");\n          table.appendChild(tableRow);\n        });\n      });\n    }\n  }]);\n\n  return TableRenderer;\n}();\n\n\n\n//# sourceURL=webpack:///./public/TableRenderer.js?");

/***/ }),

/***/ "./public/UserParser.js":
/*!******************************!*\
  !*** ./public/UserParser.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UserParcer; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar UserParcer =\n/*#__PURE__*/\nfunction () {\n  function UserParcer() {\n    _classCallCheck(this, UserParcer);\n  }\n\n  _createClass(UserParcer, [{\n    key: \"parse\",\n    value: function parse(userData) {\n      var userParcedData = {};\n      userData.forEach(function (item) {\n        userParcedData[item.uid] = item.displayName;\n      });\n      return userParcedData;\n    }\n  }]);\n\n  return UserParcer;\n}();\n\n\n\n//# sourceURL=webpack:///./public/UserParser.js?");

/***/ }),

/***/ "./public/app.js":
/*!***********************!*\
  !*** ./public/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UserParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserParser */ \"./public/UserParser.js\");\n/* harmony import */ var _TableRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableRenderer */ \"./public/TableRenderer.js\");\n/* harmony import */ var _SessionParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SessionParser */ \"./public/SessionParser.js\");\n\n\n\nvar userParser = new _UserParser__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar tableRenderer = new _TableRenderer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar sessionParser = new _SessionParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nvar div = document.createElement('div');\ndiv.className = \"session-container\";\ndataSesion.forEach(function (item, i) {\n  div.innerHTML += \"\\n    <label class=\\\"session-container__session-items\\\" for=\\\"sessionN\".concat(i, \"\\\">\\n    <input type=\\\"radio\\\" id=\\\"sessionN\").concat(i, \"\\\" name=\\\"session\\\" value=\\\"\").concat(i, \"\\\">\\n    \").concat(item.alias, \"\\n    </label>\");\n});\nvar activeSessionIndex = 0;\ndiv.firstElementChild.firstElementChild.checked = true;\ndocument.body.appendChild(div);\nvar userNames = userParser.parse(dataUsers);\nsessionParser.parse(dataSesion, activeSessionIndex, userNames);\nvar tableToRender = sessionParser.renderPrep();\ntableRenderer.render(tableToRender);\nconsole.log(sessionParser.parse(dataSesion, 33, userNames));\nconsole.log(sessionParser.renderPrep());\nconsole.log(userParser.parse(dataUsers));\nconsole.log(dataSesion);\nconsole.log(dataSesion[33]);\ndocument.querySelector(\".session-container\").addEventListener(\"click\", function (event) {\n  var target = event.target;\n\n  while (target != event.currentTarget) {\n    if (target.tagName == \"LABEL\") {\n      target.firstElementChild.checked = true;\n\n      if (target.firstElementChild.value != activeSessionIndex) {\n        activeSessionIndex = target.firstElementChild.value;\n        sessionParser.parse(dataSesion, activeSessionIndex, userNames);\n        tableToRender = sessionParser.renderPrep();\n        tableRenderer.render(tableToRender);\n      }\n    }\n\n    target = target.parentNode;\n  }\n});\n\n//# sourceURL=webpack:///./public/app.js?");

/***/ })

/******/ });
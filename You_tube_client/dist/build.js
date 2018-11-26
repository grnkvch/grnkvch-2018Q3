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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/KeybordControl.js":
/*!**********************************!*\
  !*** ./public/KeybordControl.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return KeybordControl; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint-disable linebreak-style */\n\n/* eslint-disable no-undef */\nvar KeybordControl =\n/*#__PURE__*/\nfunction () {\n  function KeybordControl(controlledObject, optionObj) {\n    var _this = this;\n\n    _classCallCheck(this, KeybordControl);\n\n    this.controlledObject = controlledObject;\n    this.optionObj = optionObj;\n    document.addEventListener('keyup', function (event) {\n      return _this.keybordControl(event);\n    });\n  }\n\n  _createClass(KeybordControl, [{\n    key: \"keybordControl\",\n    value: function keybordControl(event) {\n      var key = event.keyCode;\n      if (this.optionObj[key]) this.optionObj[key].apply(this.controlledObject);\n    }\n  }]);\n\n  return KeybordControl;\n}();\n\n\n\n//# sourceURL=webpack:///./public/KeybordControl.js?");

/***/ }),

/***/ "./public/SearchLine.js":
/*!******************************!*\
  !*** ./public/SearchLine.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SearchLine; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint-disable linebreak-style */\n\n/* eslint-disable no-undef */\nvar SearchLine =\n/*#__PURE__*/\nfunction () {\n  function SearchLine() {\n    _classCallCheck(this, SearchLine);\n\n    this.inputElement = null;\n    this.searchForm = null;\n  }\n\n  _createClass(SearchLine, [{\n    key: \"render\",\n    value: function render(selector) {\n      var header = document.createElement('header');\n      header.innerHTML = \"<form class=\\\"search-form\\\">\\n    <input class =\\\"search-form__input\\\" autofocus placeholder=\\\"Search\\\">\\n    <button class =\\\"search-form__button\\\">RUN</button>\\n    </form>\";\n      this.searchForm = header.querySelector('.search-form');\n      this.inputElement = header.querySelector('.search-form__input');\n      document.querySelector(selector).appendChild(header);\n    }\n  }, {\n    key: \"getValue\",\n    value: function getValue() {\n      return this.inputElement.value;\n    }\n  }]);\n\n  return SearchLine;\n}();\n\n\n\n//# sourceURL=webpack:///./public/SearchLine.js?");

/***/ }),

/***/ "./public/Slider.js":
/*!**************************!*\
  !*** ./public/Slider.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Slider; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint-disable linebreak-style */\n\n/* eslint-disable no-plusplus */\n\n/* eslint-disable prefer-destructuring */\n\n/* eslint-disable no-undef */\nvar Slider =\n/*#__PURE__*/\nfunction () {\n  function Slider(outerSearchMethod) {\n    _classCallCheck(this, Slider);\n\n    this.searchMethod = outerSearchMethod;\n    this.collection = [];\n    this.mainSection = document.createElement('main');\n    this.mainSection.classList.add('main-content');\n    this.mainSection.innerHTML = \"<section class=\\\"slide-bar\\\">\\n                                  <div class=\\\"slide-bar__slide-wrapper\\\">\\n\\n                                  </div>\\n                                  </section>\\n                                  <nav class=\\\"pagination\\\">\\n                                    <i class=\\\"pagination__arrow-left pagination__icon icon\\\" ></i>\\n                                    <div class=\\\"pagination__dot-container\\\">\\n                                      <div class=\\\"pagination__dot-wrapper\\\">\\n\\n                                      </div>\\n                                    </div>\\n                                    <i class=\\\"pagination__arrow-right pagination__icon icon\\\"></i>\\n                                  </nav>\";\n    this.slideBar = this.mainSection.querySelector('.slide-bar__slide-wrapper');\n    this.pageBar = this.mainSection.querySelector('.pagination__dot-wrapper');\n    this.slidesPerPageCount = null;\n    this.pageCount = null;\n    this.currentSlide = null;\n    this.currentPage = null;\n    this.pageBarLeftLim = null;\n    this.pageBarRightLim = null;\n    this.onLoading = null;\n  }\n\n  _createClass(Slider, [{\n    key: \"getCollection\",\n    value: function getCollection(data) {\n      var length = data.length;\n\n      for (var i = 0; i < length; i++) {\n        var newItem = this.addItem(data[i]);\n        this.slideBar.appendChild(newItem);\n        this.collection.push(newItem);\n      }\n\n      if (!this.currentSlide) {\n        document.querySelector('body').appendChild(this.mainSection);\n        this.currentSlide = 1;\n        this.pagination();\n      }\n\n      this.pageCount = Math.ceil(this.collection.length / this.slidesPerPageCount);\n    }\n  }, {\n    key: \"getslideSPerPageCount\",\n    value: function getslideSPerPageCount() {\n      var slideBarWidth = this.slideBar.clientWidth;\n\n      switch (slideBarWidth) {\n        case 960:\n          return 4;\n\n        case 710:\n          return 3;\n\n        case 460:\n          return 2;\n\n        default:\n          return 1;\n      }\n    }\n  }, {\n    key: \"pagination\",\n    value: function pagination(onResize) {\n      if (this.slidesPerPageCount === this.getslideSPerPageCount() && onResize) return;\n      this.slidesPerPageCount = this.getslideSPerPageCount();\n      this.pageBar.innerHTML = '';\n      this.pageCount = Math.ceil(this.collection.length / this.slidesPerPageCount);\n      this.addPageDots(1, this.pageCount);\n\n      if (!this.currentPage && this.currentSlide != null) {\n        this.pageBar.querySelector(':first-child').classList.toggle('active');\n        this.currentPage = 1;\n        this.pageBarLeftLim = 0;\n        this.pageBarRightLim = this.mainSection.querySelector('.pagination__dot-container').clientWidth - 40;\n      } else {\n        this.currentPage = Math.floor((this.currentSlide - 1) / this.slidesPerPageCount) + 1;\n        this.pageBar.querySelectorAll('.pagination__dot')[this.currentPage - 1].classList.toggle('active');\n        this.currentSlide = (this.currentPage - 1) * this.slidesPerPageCount + 1;\n        var currentPos = (this.currentSlide - 1) * 250;\n        this.slideBar.style.transform = \"translateX(-\".concat(currentPos, \"px)\");\n        this.setActivePagePos(onResize);\n      }\n    }\n  }, {\n    key: \"setActivePagePos\",\n    value: function setActivePagePos(onResize) {\n      var pageBarWidth = this.mainSection.querySelector('.pagination__dot-container').clientWidth;\n      var currentPagePos = (this.currentPage - 1) * 40;\n      var midPos = pageBarWidth / 2 - 20;\n\n      if (currentPagePos > this.pageBarRightLim || currentPagePos < this.pageBarLeftLim || onResize) {\n        this.pageBar.style.transform = \"translateX(-\".concat(currentPagePos - midPos, \"px)\");\n        this.pageBarRightLim = currentPagePos + midPos;\n        this.pageBarLeftLim = currentPagePos - midPos;\n      }\n\n      if (currentPagePos < midPos - 20) {\n        this.pageBar.style.transform = 'translateX(0px)';\n        this.pageBarLeftLim = 0;\n        this.pageBarRightLim = pageBarWidth - 40;\n      }\n    }\n  }, {\n    key: \"addPageDots\",\n    value: function addPageDots(start, end) {\n      for (var i = start; i <= end; i++) {\n        var newDot = document.createElement('i');\n        newDot.classList.add('pagination__dot');\n        newDot.innerText = i;\n        this.pageBar.appendChild(newDot);\n      }\n    }\n  }, {\n    key: \"pageRight\",\n    value: function pageRight() {\n      if (this.onLoading) return;\n\n      if (this.currentPage < Math.ceil(this.collection.length / this.slidesPerPageCount)) {\n        this.switchPage(1);\n      }\n\n      if (this.pageCount - this.currentPage < 2 * this.slidesPerPageCount) this.preload();\n    }\n  }, {\n    key: \"pageLeft\",\n    value: function pageLeft() {\n      if (this.currentSlide > 1) {\n        this.switchPage(-1);\n      }\n    }\n  }, {\n    key: \"switchPage\",\n    value: function switchPage(direction) {\n      var currentPos = (this.currentSlide - 1) * 250;\n      this.slideBar.style.transform = \"translateX(-\".concat(currentPos + direction * 250 * this.slidesPerPageCount, \"px)\");\n      this.currentSlide += this.slidesPerPageCount * direction;\n      this.pageBar.querySelectorAll('.pagination__dot')[this.currentPage - 1].classList.toggle('active');\n      this.currentPage += direction;\n      this.pageBar.querySelectorAll('.pagination__dot')[this.currentPage - 1].classList.toggle('active');\n      this.setActivePagePos();\n    }\n  }, {\n    key: \"setPage\",\n    value: function setPage(index) {\n      this.currentSlide = this.slidesPerPageCount > 1 ? index * this.slidesPerPageCount + 1 : index * this.slidesPerPageCount + 1;\n      this.pagination();\n      if (this.pageCount - this.currentPage < 2 * this.slidesPerPageCount) this.preload();\n    } // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: \"addItem\",\n    value: function addItem(content) {\n      var slide = document.createElement('figure');\n      slide.classList.add('slide');\n      slide.innerHTML = \"\\n                      <a class=\\\"slide__title\\\" href=\\\"\".concat(content.url, \"\\\" target=\\\"_blank\\\">\").concat(content.title, \"</a>\\n                      <div class=\\\"slide__img-wrapper\\\"><img class=\\\"slide__preview\\\" src=\\\"\").concat(content.thumbnailUrl, \"\\\" alt=\\\"\\\"></div>\\n                      <span class=\\\"slide__author slide__details\\\"><i class=\\\"icon\\\"></i>\").concat(content.author, \"</span>\\n                      <span class=\\\"slide__publication-date slide__details\\\"><i class=\\\"icon\\\"></i>\").concat(content.publishedAt.toLocaleDateString('ru-RU'), \"</span>\\n                      <span class=\\\"slide__view-rate slide__details\\\"><i class=\\\"icon\\\"></i>\").concat(content.viewCount, \"</span>\\n                      <span class=\\\"slide__description slide__details\\\"><i class=\\\"icon\\\"></i>\").concat(content.description, \"</span>\\n                      \");\n      return slide;\n    }\n  }, {\n    key: \"clickHandler\",\n    value: function clickHandler(clickEvent) {\n      var target = clickEvent.target;\n      if (target.classList[0] === 'pagination__arrow-right') this.pageRight();\n      if (target.classList[0] === 'pagination__arrow-left') this.pageLeft(); // eslint-disable-next-line radix\n\n      if (target.classList[0] === 'pagination__dot') this.setPage(parseInt(target.innerText) - 1);\n    }\n  }, {\n    key: \"free\",\n    value: function free() {\n      this.collection = [];\n      this.currentSlide = null;\n      this.currentPage = null;\n      this.slidesPerPageCount = null;\n      this.pageCount = null;\n      this.pageBarLeftLim = null;\n      this.pageBarRightLim = null;\n      this.mainSection.querySelector('.slide-bar__slide-wrapper').innerHTML = '';\n      this.mainSection.querySelector('.pagination__dot-wrapper').innerHTML = '';\n      this.mainSection.querySelector('.pagination__dot-wrapper').style = '';\n    }\n  }, {\n    key: \"preload\",\n    value: function preload() {\n      var _this = this;\n\n      this.onLoading = true;\n      var oldPageCount = this.pageCount;\n      this.searchMethod.search.apply(this.searchMethod).then(function (searchResultList) {\n        _this.getCollection(searchResultList);\n\n        _this.addPageDots(oldPageCount + 1, _this.pageCount);\n\n        _this.onLoading = null;\n      });\n    }\n  }]);\n\n  return Slider;\n}();\n\n\n\n//# sourceURL=webpack:///./public/Slider.js?");

/***/ }),

/***/ "./public/Swiper.js":
/*!**************************!*\
  !*** ./public/Swiper.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Swiper; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint-disable linebreak-style */\nvar Swiper =\n/*#__PURE__*/\nfunction () {\n  function Swiper(controlledElement, onLeftMethod, onRightMethod, touchMoveElement) {\n    _classCallCheck(this, Swiper);\n\n    this.touchstartX = 0;\n    this.touchstartY = 0;\n    this.touchendX = 0;\n    this.touchendY = 0;\n    this.controlledElement = controlledElement;\n    this.onLeftMethod = onLeftMethod;\n    this.onRightMethod = onRightMethod;\n    this.touchMoveElement = touchMoveElement;\n    this.touch = null;\n  }\n\n  _createClass(Swiper, [{\n    key: \"addSwipeListeners\",\n    value: function addSwipeListeners(touchArea) {\n      var _this = this;\n\n      touchArea.addEventListener('mousedown', function (event) {\n        _this.swipeStart(event);\n      }, false);\n      touchArea.addEventListener('mouseup', function (event) {\n        _this.swipeEnd(event);\n      }, false);\n      touchArea.addEventListener('touchstart', function (event) {\n        _this.swipeStart(event);\n      }, false);\n      touchArea.addEventListener('touchend', function (event) {\n        _this.swipeEnd(event);\n      }, false);\n      touchArea.addEventListener('touchmove', function (event) {\n        _this.moveElement(event);\n      }, false);\n      touchArea.addEventListener('mousemove', function (event) {\n        _this.moveElement(event);\n      }, false);\n    }\n  }, {\n    key: \"swipeStart\",\n    value: function swipeStart(event) {\n      this.touch = true;\n      this.touchstartX = event.screenX ? event.screenX : event.changedTouches[0].screenX;\n    }\n  }, {\n    key: \"swipeEnd\",\n    value: function swipeEnd(event) {\n      this.touchendX = event.screenX ? event.screenX : event.changedTouches[0].screenX;\n      this.touch = false;\n      this.touchMoveElement.style.cssText = '';\n      this.swipeHandle();\n    }\n  }, {\n    key: \"moveElement\",\n    value: function moveElement(event) {\n      if (this.touch) {\n        var currentX = event.screenX ? event.screenX : event.changedTouches[0].screenX;\n        this.touchMoveElement.style.transition = 'all 0s';\n        this.touchMoveElement.style.marginLeft = \"\".concat(currentX - this.touchstartX, \"px\");\n      }\n    }\n  }, {\n    key: \"swipeHandle\",\n    value: function swipeHandle() {\n      if (this.touchendX > this.touchstartX) {\n        this.onLeftMethod.apply(this.controlledElement);\n      }\n\n      if (this.touchendX < this.touchstartX) {\n        this.onRightMethod.apply(this.controlledElement);\n      }\n    }\n  }]);\n\n  return Swiper;\n}();\n\n\n\n//# sourceURL=webpack:///./public/Swiper.js?");

/***/ }),

/***/ "./public/YouTubeRequest.js":
/*!**********************************!*\
  !*** ./public/YouTubeRequest.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return YouTubeRequest; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint-disable linebreak-style */\n\n/* eslint-disable no-plusplus */\n\n/* eslint-disable prefer-destructuring */\n\n/* eslint-disable no-undef */\nvar YouTubeRequest =\n/*#__PURE__*/\nfunction () {\n  function YouTubeRequest() {\n    _classCallCheck(this, YouTubeRequest);\n\n    this.resultCollection = null;\n    this.nextPageToken = null;\n  }\n\n  _createClass(YouTubeRequest, [{\n    key: \"search\",\n    value: function search(request) {\n      var _this = this;\n\n      var requestUrl = null;\n\n      if (!request && this.nextPageToken) {\n        requestUrl = \"https://www.googleapis.com/youtube/v3/search?key=AIzaSyAC4vO7bJ2xG4KXEXSX6fRF4Oer5rk6Clc&type=video&part=snippet&maxResults=20&q=\".concat(request, \"&pageToken=\").concat(this.nextPageToken);\n      } else requestUrl = \"https://www.googleapis.com/youtube/v3/search?key=AIzaSyAC4vO7bJ2xG4KXEXSX6fRF4Oer5rk6Clc&type=video&part=snippet&maxResults=20&q=\".concat(request);\n\n      return fetch(requestUrl).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        _this.nextPageToken = data.nextPageToken;\n        var idList = data.items.map(function (item) {\n          return item.id.videoId;\n        }).join();\n        return fetch(\"https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=\".concat(idList, \"&key=AIzaSyAC4vO7bJ2xG4KXEXSX6fRF4Oer5rk6Clc\"));\n      }).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        return _this.parseResult(data);\n      });\n    }\n  }, {\n    key: \"parseResult\",\n    value: function parseResult(data) {\n      var resultsList = [];\n      var length = data.items.length;\n\n      for (var i = 0; i < length; i++) {\n        var searchResult = data.items[i];\n        var item = {};\n        item.viewCount = data.items[i].statistics.viewCount;\n        item.title = searchResult.snippet.title;\n        item.author = searchResult.snippet.channelTitle;\n        item.thumbnailUrl = searchResult.snippet.thumbnails.medium.url;\n        item.publishedAt = new Date(Date.parse(searchResult.snippet.publishedAt));\n        item.description = searchResult.snippet.description;\n        item.url = \"https://www.youtube.com/watch?v=\".concat(searchResult.id);\n        resultsList.push(item);\n      }\n\n      if (this.resultCollection) this.resultCollection.concat(resultsList);else this.resultCollection = resultsList.slice();\n      return this.resultCollection;\n    }\n  }, {\n    key: \"free\",\n    value: function free() {\n      this.resultCollection = null;\n      this.nextPageToken = null;\n    }\n  }]);\n\n  return YouTubeRequest;\n}();\n\n\n\n//# sourceURL=webpack:///./public/YouTubeRequest.js?");

/***/ }),

/***/ "./public/main.js":
/*!************************!*\
  !*** ./public/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SearchLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchLine */ \"./public/SearchLine.js\");\n/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider */ \"./public/Slider.js\");\n/* harmony import */ var _YouTubeRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./YouTubeRequest */ \"./public/YouTubeRequest.js\");\n/* harmony import */ var _Swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Swiper */ \"./public/Swiper.js\");\n/* harmony import */ var _KeybordControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./KeybordControl */ \"./public/KeybordControl.js\");\n/* eslint-disable linebreak-style */\n\n/* eslint-disable no-undef */\n\n\n\n\n\nvar request = new _YouTubeRequest__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nvar searchLine = new _SearchLine__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar slider = new _Slider__WEBPACK_IMPORTED_MODULE_1__[\"default\"](request);\nvar swipe = new _Swiper__WEBPACK_IMPORTED_MODULE_3__[\"default\"](slider, slider.pageLeft, slider.pageRight, slider.slideBar);\nswipe.addSwipeListeners(window); // eslint-disable-next-line no-unused-vars\n\nvar keybordControl = new _KeybordControl__WEBPACK_IMPORTED_MODULE_4__[\"default\"](slider, {\n  37: slider.pageLeft,\n  39: slider.pageRight\n});\nsearchLine.render('body');\nsearchLine.searchForm.addEventListener('submit', function (event) {\n  event.preventDefault();\n  request.free();\n  slider.free();\n  request.search(searchLine.getValue()).then(function (searchResultList) {\n    return slider.getCollection(searchResultList);\n  });\n});\nwindow.addEventListener('resize', function () {\n  var timer;\n  if (timer) clearTimeout(timer);\n  timer = setTimeout(function () {\n    return slider.pagination(true);\n  }, 60);\n});\ndocument.addEventListener('click', function (clickEvent) {\n  return slider.clickHandler(clickEvent);\n});\n\n//# sourceURL=webpack:///./public/main.js?");

/***/ })

/******/ });
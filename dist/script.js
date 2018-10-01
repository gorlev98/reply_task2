'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requestSize = 21;
var firstStep = -80;
var types = ['leftGif', 'centerGif', 'rightGif'];

var incapsulation = function incapsulation() {
  _classCallCheck(this, incapsulation);

  var work = function () {
    function work() {
      _classCallCheck(this, work);

      var Display = function () {
        function Display() {
          _classCallCheck(this, Display);

          var gifDisplay = function () {
            function gifDisplay() {
              _classCallCheck(this, gifDisplay);

              this.StringNumber = [0, 0];
              this.previousText = ["NONE", "NONE"];
              this.time = [0, 0];
            }

            _createClass(gifDisplay, [{
              key: 'sendRequest',
              value: function sendRequest(word, object, focus) {
                var promice = new Promise(function (resolve, reject) {
                  var oReq = new XMLHttpRequest();

                  function cleanUp() {
                    oReq.removeEventListener('load', handler);
                  }

                  function handler() {
                    var array = JSON.parse(this.responseText);
                    resolve();
                    object.drawBlocks(array.data, isFirstTime, object, focus);
                    cleanUp();
                  }

                  var isFirstTime = true;
                  if (object.previousText[focus] == word) {
                    isFirstTime = false; //we have this word again
                    object.time[focus]++;
                  } else {
                    object.time[focus] = 0;
                    object.previousText[focus] = word;
                    document.getElementById("prevWord").innerText = "Chosed word: " + object.previousText[focus];
                  }
                  var offset = requestSize * object.time[focus];
                  var focusMass = ['gifs', 'stickers'];
                  oReq.addEventListener('load', handler);
                  oReq.open('GET', 'https://api.giphy.com/v1/' + focusMass[focus] + '/search?api_key=iRSirL1Rerm0MFVnLAU493QHGhMbBYEu&q=' + word + '&limit=' + requestSize + '&offset=' + offset + '&rating=G&lang=en');
                  oReq.send();
                });
              }
            }, {
              key: 'drawBlocks',
              value: function drawBlocks(array, isFirstTime, object, type) {
                function addGif(type, id, isSaves) {
                  function addToStorage() {
                    var go = true; // проверка наличия этого элемента в localStorage путём прохода по всему хранилищу
                    for (var i = 0; i < localStorage.length; i++) {
                      if (localStorage.getItem(i.toString()) == this.id) {
                        go = false;
                        i = localStorage.length;
                      }
                    }
                    if (go) {
                      //если не нашли
                      localStorage.setItem(localStorage.length, this.id);
                      workEx.display.myDisplay.drawElement(this);
                      alert("Object added to saves");
                    }
                    document.getElementById("input").focus(); //озвращаем фокус на инпут
                  }

                  var gif = document.createElement("img");
                  if (id < array.length) {
                    if (!isSaves) {
                      gif.src = array[id].images.downsized_large.url;
                    } else {
                      gif.src = array[id].elem.data.images.downsized_large.url;
                    }
                    gif.className = types[type];
                    gif.id = array[id].id;
                    gif.addEventListener('dblclick', addToStorage);
                    gifBlock.appendChild(gif);
                  }
                }
                var block = void 0;
                var isSaves = false;
                var typesArray = ["gifBlock", "stickerBlock", "myBlock"];
                console.log("type=" + type);
                console.log(typesArray[type]);
                block = document.getElementById(typesArray[type]);
                if (type == 2) {
                  isSaves = true;
                }

                if (isFirstTime) {
                  if (block) {
                    while (block.firstElementChild) {
                      block.removeChild(block.firstElementChild);
                    }
                    if (type == 2) {
                      object.gifStringNumber = 0;
                    } else {
                      object.StringNumber[type] = 0;
                    }
                  }
                }
                for (var i = 0; i < array.length / 3; i++) {
                  var gifBlock = document.createElement("div"); //здесь var, иначе в addGif не видно куда класть
                  gifBlock.className = 'threeGifBlock';
                  var step = void 0;
                  if (type == 2) {
                    step = firstStep + object.gifStringNumber * (500 + 50);
                    object.gifStringNumber++;
                  } //500 - size, 50 - space
                  else {
                      step = firstStep + object.StringNumber[type] * (500 + 50);
                      object.StringNumber[type]++;
                    }
                  gifBlock.style.top = step + "px";
                  block.appendChild(gifBlock);

                  addGif(0, i * 3, isSaves);
                  addGif(1, i * 3 + 1, isSaves);
                  addGif(2, i * 3 + 2, isSaves);
                }
                isSendRequest = false; //позволяем скроллу ещё раз вызывать ф-цию, если нужно
              }
            }]);

            return gifDisplay;
          }();

          var myDisplay = function () {
            function myDisplay() {
              _classCallCheck(this, myDisplay);

              this.gifStringNumber = 0;
              this.previousText = "NONE";
            }

            _createClass(myDisplay, [{
              key: 'drawAllElements',
              value: function drawAllElements() {
                var promises = [];

                var _loop = function _loop(i) {
                  promises[i] = new Promise(function (resolve, reject) {
                    var oReq = new XMLHttpRequest();

                    function cleanUp() {
                      oReq.removeEventListener('load', handler);
                    }

                    function handler() {
                      var elem = JSON.parse(this.responseText);
                      resolve({ elem: elem });
                      cleanUp();
                    }

                    var id = localStorage.getItem(i.toString());
                    oReq.addEventListener('load', handler);
                    oReq.open('GET', 'https://api.giphy.com/v1/gifs/' + id + '?api_key=iRSirL1Rerm0MFVnLAU493QHGhMbBYEu');
                    oReq.send();
                  });
                };

                for (var i = 0; i < localStorage.length; i++) {
                  _loop(i);
                }
                Promise.all(promises).then(function (r) {
                  workEx.display.gifDisplay.drawBlocks(r, true, workEx.display.myDisplay, 2);
                });
              }
            }, {
              key: 'drawElement',
              value: function drawElement(img) {
                isVisible();
                this.drawAllElements();
                //я крайне извиняюсь за эту функцию
                //я понимаю, что так делать нельзя - перерисовывать всё ради добавления одного объекта
                //даже несмотря на ограниченность LS, их может быть много, и я понимаю это
                //но прошу извинить меня)
              }
            }]);

            return myDisplay;
          }();

          this.gifDisplay = new gifDisplay();
          this.myDisplay = new myDisplay();
          this.focus = 0; //куда смотрим
          this.myDisplay.drawAllElements();
        }

        _createClass(Display, [{
          key: 'draw',
          value: function draw(text) {
            if (this.focus == 0 || this.focus == 1) {
              this.gifDisplay.sendRequest(text, this.gifDisplay, this.focus);
            }
          }
        }]);

        return Display;
      }();

      this.display = new Display();
    }

    _createClass(work, [{
      key: 'buttonClick',
      value: function buttonClick() {
        var text = document.getElementById("input").value;
        workEx.display.draw(text);
      }
    }, {
      key: 'typeButtonClick',
      value: function typeButtonClick(number) {
        function removeColor() {
          document.getElementById("toGifButton").style.backgroundColor = "white";
          document.getElementById("toStickersButton").style.backgroundColor = "white";
          document.getElementById("toMySavesButton").style.backgroundColor = "white";
        }

        function changeVisibility(obj) {
          function hideAll() {
            document.getElementById("gifBlock").style.visibility = "hidden";
            document.getElementById("stickerBlock").style.visibility = "hidden";
            document.getElementById("myBlock").style.visibility = "hidden";
          }

          var visibMass = ["gifBlock", "stickerBlock", "myBlock"];
          hideAll();

          document.getElementById(visibMass[obj.display.focus]).style = "visible";
          if (obj.display.focus < 2) {
            document.getElementById("prevWord").innerText = "Chosed word: " + obj.display.gifDisplay.previousText[obj.display.focus];
            document.getElementById("prevWord").style.visibility = "visible";
          } else {
            document.getElementById("prevWord").style.visibility = "hidden";
          }
        }

        var idMass = ["toGifButton", "toStickersButton", "toMySavesButton"];
        removeColor();
        var text = document.getElementById(idMass[number]).innerText;
        document.getElementById(idMass[number]).style.backgroundColor = "red";
        workEx.display.focus = number;
        changeVisibility(workEx);
      }
    }, {
      key: 'scrolled',
      value: function scrolled() {
        var gifDisplay = this.display.gifDisplay;
        var focus = this.display.focus;
        gifDisplay.sendRequest(gifDisplay.previousText[focus], gifDisplay, focus);
      }
    }]);

    return work;
  }();

  var workEx = new work();
  var isSendRequest = false;
  window.onscroll = function () {
    var scrolled = window.pageYOffset;
    var temp = document.body.scrollHeight - 1000;
    if (temp < scrolled && !isSendRequest) {
      isSendRequest = true;
      workEx.scrolled();
      temp = document.body.scrollHeight - 1000;
    }
  };
  this.buttonClick = workEx.buttonClick;
  this.typeButtonClick = workEx.typeButtonClick;
};

var mashine = new incapsulation();
function isVisible() {
  if (localStorage.length == 0) {
    document.getElementById("toMySavesButton").style.visibility = "hidden";
  } else {
    document.getElementById("toMySavesButton").style.visibility = "visible";
  }
}
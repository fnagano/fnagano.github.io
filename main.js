(function main() {

  var Plot = {
    id: 'plot',
    imgId: 'hover-image',
    domain: 'https://plot.ly'
  };

  Plot.iframe = document.getElementById(Plot.id);
  Plot.graphContentWindow = Plot.iframe.contentWindow;

  Plot.hoverImg = document.getElementById(Plot.imgId);

  Plot.init = function init() {
    var pinger = setInterval(function() {
      Plot.post({
        task: 'ping'
      });
    }, 500);

    function messageListener(e) {
      var message = e.data;

      if (message.pong) {
        console.log('Initial pong, frame is ready to receive');
        clearInterval(pinger);

        Plot.post({
          'task': 'listen',
          'events': ['hover']
        });
      } else if (message.type === 'hover') {
        Plot.onHover(message);
      }
    }

    window.removeEventListener('message', messageListener);
    window.addEventListener('message', messageListener);
  };

  Plot.post = function post(o) {
    Plot.graphContentWindow.postMessage(o, Plot.domain);
  };

  var artistToUrl = {
    'Teste': 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQvuWvQaTgoMa90ShPRW6Zvnnau3BWlgRANS0piyecQg7aNdAuK9w',
    'Peça 2': 'https://img.lojasrenner.com.br/item/545242966/medium/1.jpg',
    'Peça 3': 'https://img.lojasrenner.com.br/item/545578304/medium/1.jpg',
    'Peça 4': 'https://img.lojasrenner.com.br/item/545714214/medium/1.jpg',
    'Peça 5': 'https://img.lojasrenner.com.br/item/545361252/medium/1.jpg',
    'Peça 6': 'https://img.lojasrenner.com.br/item/544053709/medium/1.jpg'
      };

  var blankImg = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

  Plot.onHover = function(message) {
    var artist = message.points[0].x
      .toLowerCase()
      .replace(/ /g, '-');

    var imgSrc = blankImg;

    if (artistToUrl[artist] !== undefined) imgSrc = artistToUrl[artist];

    Plot.hoverImg.src = imgSrc;
  };

  Plot.init();

})();

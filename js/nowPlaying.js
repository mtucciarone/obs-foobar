let xhr = new XMLHttpRequest();
let currPath;
let artPath;
let playState = 0;
let showOnNextPoll = 0;
let hideOnNextPoll = 0;
let foobarRunning = 0;
let progressLength;
let fadeLength = 1;
let jsonFile = "foobar_nowplaying.json";

const init = () => {
  xhr.overrideMimeType("application/json");

  this.window.setInterval(() => {
    pollHandler();
  }, 1000);

  progressLength = $("#progress").width();
};



const showOrHideWidget = (jsonObject) => {
  if (hideOnNextPoll) {
    TweenMax.to($("#widget"), fadeLength, { opacity: 0 });
    foobarRunning = 0;
    hideOnNextPoll = 0;
    return;
  }
  if (showOnNextPoll) {
    TweenMax.to($("#widget"), fadeLength, { opacity: 1 });
    foobarRunning = 1;
    showOnNextPoll = 0;
    return;
  }

  // foobar2000 has exited
  if (!jsonObject.nowplaying) {
    hideOnNextPoll = 1;
  }
  if (jsonObject.nowplaying) {
    showOnNextPoll = 1;
  }

  if (foobarRunning) {
    updateWidget(jsonObject);
  }
};

const pollHandler = () => {
  xhr.open("GET", `${jsonFile}`, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const jsonObject = JSON.parse(xhr.responseText);
      showOrHideWidget(jsonObject);
    }
  };
};

const updateWidget = (jsonObject) => {
  if (!jsonObject.nowplaying) {
    return;
  }

  if (!jsonObject.nowplaying.title) {
    $("#widget").hide();
  } else {
    $("#widget").show();
  }

  if (jsonObject.nowplaying.playing == 1) {
    let artiststring = `by: ${jsonObject.nowplaying.artist}`;

    if (jsonObject.nowplaying.artist != jsonObject.nowplaying.albumartist) {
      artiststring +=
        " <span>(" + jsonObject.nowplaying.albumartist + ")</span>";
    }

    if ($("#artist").html() != $("<div/>").html(artiststring).html()) {
      TweenMax.to($("#artist"), 0.5, {
        opacity: 0,
        onComplete: () => {
          $("#artist").html(artiststring);
          TweenMax.to($("#artist"), 0, { scrollTo: { x: 0 } });
          TweenMax.to($("#artist"), 4, {
            scrollTo: { x: "max" },
            ease: Linear.easeNone,
            repeat: -1,
            repeatDelay: 1,
            yoyo: true,
          });
        },
      });
      TweenMax.to($("#artist"), 0.5, { opacity: 1, delay: 0.5 });
    }

    if (
      $("#album").html() != $("<div/>").html(jsonObject.nowplaying.album).html()
    ) {
      TweenMax.to($("#album"), 0.5, {
        opacity: 0,
        onComplete: () => {
          $("#album").html(jsonObject.nowplaying.album);
          TweenMax.to($("#album"), 0, { scrollTo: { x: 0 } });
          TweenMax.to($("#album"), 4, {
            scrollTo: { x: "max" },
            ease: Linear.easeNone,
            repeat: -1,
            repeatDelay: 1,
            yoyo: true,
          });
        },
      });
      TweenMax.to($("#album"), 0.5, { opacity: 1, delay: 0.5 });
    }

    if (
      $("#title").html() != $("<div/>").html(jsonObject.nowplaying.title).html()
    ) {
      TweenMax.to($("#title"), 0.5, {
        opacity: 0,
        onComplete: () => {
          $("#title").html(jsonObject.nowplaying.title);
          TweenMax.to($("#title"), 0, { scrollTo: { x: 0 } });
          TweenMax.to($("#title"), 4, {
            scrollTo: { x: "max" },
            ease: Linear.easeNone,
            repeat: -1,
            repeatDelay: 1,
            yoyo: true,
          });
        },
      });
      TweenMax.to($("#title"), 0.5, { opacity: 1, delay: 0.5 });
    }
  }

  if (
    playState == 1 &&
    jsonObject.nowplaying.paused == 1 &&
    jsonObject.nowplaying.playing == 1
  ) {
    playState = 0;
    playChange();
    fadeIn = 1;
  } else if (playState == 1 && jsonObject.nowplaying.playing == 0) {
    playState = 0;
    playChange();
  } else if (
    playState == 0 &&
    jsonObject.nowplaying.paused == 0 &&
    jsonObject.nowplaying.playing == 1
  ) {
    playState = 1;
    playChange();
    fadeState = 1;
  }

  let elMins = Math.floor(jsonObject.nowplaying.elapsed / 60);
  let elSecs = jsonObject.nowplaying.elapsed - elMins * 60;

  if (elSecs < 10) {
    elSecs = "0" + elSecs;
  }

  let leMins = Math.floor(jsonObject.nowplaying.length / 60);
  let leSecs = jsonObject.nowplaying.length - leMins * 60;

  if (leSecs < 10) {
    leSecs = "0" + leSecs;
  }

  $("#elapsed").html(
    "<span>" + elMins + ":" + elSecs + "</span>/" + leMins + ":" + leSecs
  );

  let progressWidth = Math.ceil(
    progressLength *
      (jsonObject.nowplaying.elapsed / jsonObject.nowplaying.length)
  );

  $("#progress").css("width", progressWidth);
};

const playChange = () => {
  let playImg;

  if (playState == 1) {
    playImg = "images/play.png";
  } else {
    playImg = "images/pause.png";
  }

  TweenMax.to($("#playpaused"), 0.5, {
    opacity: 0,
    onComplete: () => {
      $("#playpaused").html("<img src='" + playImg + "'>");
    },
  });
  TweenMax.to($("#playpaused"), 0.5, { opacity: 1, delay: 0.5 });
};

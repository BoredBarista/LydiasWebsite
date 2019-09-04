// Audio Propertys
var audio = document.getElementById("my-Audio");
var trackName = document.getElementById("track-name");
var audioBtn = document.getElementById("P-Btn");
var  seekBar = document.getElementById("seek-bar");

// Bools
var isPlaying = false;
// Fast Forword & Rewind.
var fastForword = false;
var rewind = false;

// Audio File Buttons.
var fwBtn = document.getElementById("FW-Btn");
var cBtn = document.getElementById("C-Btn");
var naBtn = document.getElementById("NA-Btn");

// Audio Control buttons.
var pBtn = document.getElementById("P-Btn");
var rsBtn = document.getElementById("RS-Btn");
var ffBtn = document.getElementById("FF-Btn");
var rwBtn = document.getElementById("RW-Btn");

// Audio Play() Functions.
$(fwBtn).click( function() {
  audio.src = "AudioFiles/Fresh World.wav";
  trackName.innerHTML = "Fresh World";
  audio.play();
});

$(cBtn).click(function() {
  audio.src = "AudioFiles/Catastrophics M.wav";
  trackName.innerHTML = "Catastrophics";
  audio.play();
});

$(naBtn).click( function() {
  audio.src = "AudioFiles/Natural Addict M.wav";
  trackName.innerHTML = "Natrual Addict";
  audio.play();
});
// END Audio play() Functions.

// Audio Pause() Function.
$(pBtn).click( function() {
  if (isPlaying) {
    audio.pause();
  }
  if (!isPlaying) {
    audio.play();
  }
});

// Audio Fast Forword & Rewind Functions.
$(rsBtn).click( function() {
  audio.currentTime = 0;
});

$(ffBtn).mousedown( function() {
  fastForword = true;
});

$(ffBtn).mouseup( function() {
  fastForword = false;
});

$(rwBtn).mousedown( function() {
  rewind = true;
});

$(rwBtn).mouseup( function() {
  rewind = false;
});
// END Audio Fast Forword & Rewind Functions.

// Audio On Playing Function.
$(audio).on('timeupdate', function() {
   UpdateSeekBarFill();
   updateCountDownTime();
   updateTimeDuration();

   if (fastForword) {
     audio.currentTime += 0.01;
   }
   if (rewind) {
     audio.currentTime -= 0.01;
   }
});

function UpdateSeekBarFill()
{
  if (audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime);
   }
   seekBar.style.width = value + "%";
}

function updateTimeDuration()
{
    var timeDuration = document.getElementById("audio-duration");
    var seconds = parseInt(audio.currentTime % 60);
    var minutes = parseInt((audio.currentTime / 60) % 60);
    if (seconds < 10) {
      timeDuration.innerHTML = minutes + ":0" + seconds;
    } else {
      timeDuration.innerHTML = minutes + ":" + seconds;
    }
}

function updateCountDownTime()
{
    var timeleft = document.getElementById('audio-time'),
         duration = parseInt( audio.duration ),
         currentTime = parseInt( audio.currentTime ),
         timeLeft = duration - currentTime,
         s, m;

     s = timeLeft % 60;
     m = Math.floor( timeLeft / 60 ) % 60;
     s = s < 10 ? "0"+s : s;
     m = m < 10 ? "0"+m : m;
     timeleft.innerHTML = m+":"+s;
}

audio.onplaying = function() {
  isPlaying = true;
  audioBtn.src = "Images/pause.png";
};

audio.onpause = function() {
  isPlaying = false;
  audioBtn.src = "Images/play.png";
};

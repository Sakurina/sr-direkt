/*** STREAM URLS ***/
URLS = {
  p1: "http://mobil-live.sr.se/mobilradio/kanaler/p1-aac-96/playlist.m3u8",
  p2: "http://mobil-live.sr.se/mobilradio/kanaler/p2-aac-96/playlist.m3u8",
  p3: "http://mobil-live.sr.se/mobilradio/kanaler/p3-aac-96/playlist.m3u8",
  p4: function(k) { return "http://mobil-live.sr.se/mobilradio/kanaler/p4"+k+"-aac-96/playlist.m3u8" }
}

/*** P4 LOCAL CHANNELS ***/
LOKAL_KANALER = {
  "blekinge": "Blekinge",
  "dalarna": "Dalarna",
  "gotland": "Gotland",
  "gavleborg": "Gävleborg",
  "goteborg": "Göteborg",
  "halland": "Halland",
  "jamtland": "Jämtland",
  "jonkoping": "Jönköping",
  "kalmar": "Kalmar",
  "kristianstad": "Kristianstad",
  "kronoberg": "Kronoberg",
  "malmohus": "Malmöhus",
  "norrbotten": "Norrbotten",
  "sjuharad": "Sjuhärad",
  "skaraborg": "Skaraborg",
  "stockholm": "Stockholm",
  "sormland": "Sörmland",
  "uppland": "Uppland",
  "varmland": "Värmland",
  "vast": "Väst",
  "vasterbotten": "Västerbotten",
  "vasternorrland": "Västernorrland",
  "vastmanland": "Västmanland",
  "orebro": "Örebro",
  "ostergotland": "Östergötland"
};

/*** SWEDISH CLOCK ***/
function formatTimeFragment(f) {
  if (f.toString().length == 1)
    return "0"+f.toString();
  return f;
}

function formatTime(h, m) {
  return formatTimeFragment(h)+":"+formatTimeFragment(m);
}

function currentSwedishTime() {
  var utcOffset = 1; // Sweden is CET <=> GMT/UTC+1
  var dt = new Date();
  var h = dt.getUTCHours() + 1;
  if (h == 24) h = 0;
  var m = dt.getUTCMinutes();
  return formatTime(h, m);
}

/*** HELPERS ***/
function resetKanalerState() {
  $('#settings').hide();
  $('#kanaler').show();
  $('.lyssna').removeClass('lyssna');
  $('#links').html("<a href='#/settings'>Settings</a>");
}

function prepareAudioPlayer(url) {
  $('#ap').html("<audio src='"+url+"' controls='controls'></audio>");
}

function savedLocalStation() {
  var k = store.get('local_station');
  if (k === undefined)
    k = "stockholm";
  return k;
}

function populateLocalStationMenu() {
  var lk_html = "";
  for (var k in LOKAL_KANALER) {
    lk_html += "<option value='"+k+"'>"+LOKAL_KANALER[k]+"</option>";
  }
  $('#local_station').html(lk_html);
  $('#local_station').get(0).value = savedLocalStation();
}

/*** ROUTES ***/
route('#/_').bind(function() {
  resetKanalerState();
  $('#ap').html('&nbsp;');
});

route('#/p1').bind(function() {
  resetKanalerState();
  $('#p1').addClass('lyssna');
  prepareAudioPlayer(URLS.p1);
});

route('#/p2').bind(function() {
  resetKanalerState();
  $('#p2').addClass('lyssna');
  prepareAudioPlayer(URLS.p2);
});

route('#/p3').bind(function() {
  resetKanalerState();
  $('#p3').addClass('lyssna');
  prepareAudioPlayer(URLS.p3);
});

route('#/p4').bind(function() {
  resetKanalerState();
  $('#p4').addClass('lyssna');
  prepareAudioPlayer(URLS.p4(savedLocalStation()));
});

route('#/settings').bind(function() {
  $('#kanaler').hide();
  $('#settings').show();
  $('#links').html("<a href='#/_'>Back</a>");
});

/*** HANDLE LOCAL P4 PREFERENCE ***/
function p4change() {
  store.set('local_station', $('#local_station').get(0).value);
}

function updateNowPlaying() {
  $.getJSON('just_nu.php', function(jn) {
    var stations = ["p1", "p2", "p3", "p4"];
    for (var i in stations) {
      var s = stations[i];
      $('#'+s+' .just_nu').html(jn[s]["now"]);
      $('#'+s+' .nasta_program').html(jn[s]["next"]);
    }
  });
}

/*** DISPATCH ROUTES ***/
var Dispatcher = {};
Dispatcher._hashchange_last = '';
Dispatcher._onhashchange = function() {
  if (Dispatcher._hashchange_last != location.hash) {
    Dispatcher._hashchange_last = location.hash;
    store.set('last_state', location.hash);
    route(location.hash).run();
  }
}
setInterval(function() { Dispatcher._onhashchange(); }, 50);

$(document).ready(function() {
  populateLocalStationMenu();
  /*** RESTORE HISTORY ***/
  if (store.get('last_state') != undefined) {
    location.hash = store.get('last_state');
  } else if (location.hash == "") {
    location.hash = "#/_";
  }
  /*** UNINTRUSIVE JS; TAP EVENTS ***/
  $('#p1').tap(function() { location.hash = '#/p1'; });
  $('#p2').tap(function() { location.hash = '#/p2'; });
  $('#p3').tap(function() { location.hash = '#/p3'; });
  $('#p4').tap(function() { location.hash = '#/p4'; });
  window.scrollTo(0,1);
  updateNowPlaying();
  setInterval(updateNowPlaying, 60000); 
});

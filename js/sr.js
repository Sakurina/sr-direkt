/*** STREAM URLS ***/
URLS = {
  p1: "http://mobil-live.sr.se/mobilradio/kanaler/p1-aac-96/playlist.m3u8",
  p2: "http://mobil-live.sr.se/mobilradio/kanaler/p2-aac-96/playlist.m3u8",
  p3: "http://mobil-live.sr.se/mobilradio/kanaler/p3-aac-96/playlist.m3u8",
  p4: function(k) {
    return "http://mobil-live.sr.se/mobilradio/kanaler/p4"+k+"-aac-96/playlist.m3u8"
  }
}

/*** NOW PLAYING API URLS ***/
JUST_NU_URLS = {
  p1: "http://sverigesradio.se/api/rightnowinfo/rightnowinfo.aspx?unit=132",
  p2: "http://sverigesradio.se/api/rightnowinfo/rightnowinfo.aspx?unit=163",
  p3: "http://sverigesradio.se/api/rightnowinfo/rightnowinfo.aspx?unit=164",
  p4: "http://sverigesradio.se/api/rightnowinfo/rightnowinfo.aspx?unit=701"
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

/*** ROUTES ***/
route('#/_').bind(function() {
  $('#settings').hide();
  $('#kanaler').show();
  $('#ap').html('&nbsp;');
  $('.lyssna').removeClass('lyssna');
  $('#links').html("<a href='#/settings'>Settings</a>");
});

route('#/p1').bind(function() {
  $('.lyssna').removeClass('lyssna');
  $('#p1').addClass('lyssna');
  $('#ap').html("<audio src='"+URLS.p1+"' controls='controls'></audio>");
});

route('#/p2').bind(function() {
  $('.lyssna').removeClass('lyssna');
  $('#p2').addClass('lyssna');
  $('#ap').html("<audio src='"+URLS.p2+"' controls='controls'></audio>");
});

route('#/p3').bind(function() {
  $('.lyssna').removeClass('lyssna');
  $('#p3').addClass('lyssna');
  $('#ap').html("<audio src='"+URLS.p3+"' controls='controls'></audio>");
});

route('#/p4').bind(function() {
  $('.lyssna').removeClass('lyssna');
  $('#p4').addClass('lyssna');
  var k = store.get('local_station');
  if (k === undefined) {
    k = "stockholm";
  }
  $('#ap').html("<audio src='"+URLS.p4(k)+"' controls='controls'></audio>");
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
  /*** POPULATE LOCAL STATION MENU ***/
  var lk_html = "";
  for (var k in LOKAL_KANALER) {
    lk_html += "<option value='"+k+"'>"+LOKAL_KANALER[k]+"</option>";
  }
  $('#local_station').html(lk_html);
  $('#local_station').get(0).value = store.get('local_station');
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
});

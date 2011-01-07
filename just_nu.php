<?php
  function api_url($unit) {
    return "http://sverigesradio.se/api/rightnowinfo/rightnowinfo.aspx?unit=".$unit;
  }

  function current_show($xmldoc) {
    $xp = $xmldoc->xpath('/RightNowInfo/Channel/ProgramTitle');
    $node = $xp[0];
    return (string)($node);
  }

  function next_show($xmldoc) {
    $xp = $xmldoc->xpath('/RightNowInfo/Channel/NextProgramTitle');
    $node = $xp[0];
    return (string)($node);
  }

  function dict_for_station($xmldoc) {
    return array(
      "now" => current_show($xmldoc),
      "next" => next_show($xmldoc)
    );
  }

  function p4_unit_for($city) {
    switch ($city) {
      case 'blekinge': return 213;
      case 'dalarna': return 223;
      case 'gotland': return 205;
      case 'gavleborg': return 210;
      case 'goteborg': return 212;
      case 'halland': return 220;
      case 'jamtland': return 200;
      case 'jonkoping': return 203;
      case 'kalmar': return 201;
      case 'kristianstad': return 211;
      case 'kronoberg': return 214;
      case 'malmohus': return 207;
      case 'norrbotten': return 209;
      case 'sjuharad': return 206;
      case 'skaraborg': return 208;
      case 'stockholm': return 701;
      case 'sormland': return 202;
      case 'uppland': return 218;
      case 'varmland': return 204;
      case 'vast': return 219;
      case 'vasterbotten': return 215;
      case 'vasternorrland': return 216;
      case 'vastmanland': return 217;
      case 'orebro': return 221;
      case 'ostergotland': return 222;
    }
    return 701;
  }

  $p1 = simplexml_load_file(api_url(132));
  $p2 = simplexml_load_file(api_url(163));
  $p3 = simplexml_load_file(api_url(164));
  $p4 = simplexml_load_file(api_url(p4_unit_for('stockholm')));

  echo json_encode(array(
    "p1" => dict_for_station($p1),
    "p2" => dict_for_station($p2),
    "p3" => dict_for_station($p3),
    "p4" => dict_for_station($p4)
  ));
?>

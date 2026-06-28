/**
 * TELVERGENCE visit collector — Google Apps Script Web App.
 * Receives beacons from telv-track.js, appends them to a Google Sheet,
 * serves them back as JSON for watch.html, and (optionally) fires SMS alerts.
 *
 * Setup: see analytics/SETUP.md  (deploy as Web App, "Anyone" can access).
 */

var SHEET_NAME = 'visits';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sh = sheet_();
    sh.appendRow([
      new Date(),                // server time
      data.ts || '',             // client time
      data.type || '',
      data.email || '',
      data.vid || '',
      data.recipient || '',
      data.page || '',
      data.section || data.to || data.href || data.snippet || '',
      data.secs || '',
      data.depth || data.maxScroll || '',
      data.ref || '',
      data.ua || '',
      data.tz || '',
      data.scr || '',
      data.url || ''
    ]);
    maybeAlert_(data);
  } catch (err) { /* swallow — never break the beacon */ }
  return ContentService.createTextOutput('ok');
}

function doGet(e) {
  var sh = sheet_();
  var n = sh.getLastRow();
  if (n < 2) return json_([]);
  var limit = 600;
  var start = Math.max(2, n - limit + 1);
  var rows = sh.getRange(start, 1, n - start + 1, 15).getValues();
  var out = rows.map(function (r) {
    return {
      ts: r[1] || (r[0] && r[0].toISOString && r[0].toISOString()) || '',
      type: r[2], email: r[3], vid: r[4], recipient: r[5], page: r[6],
      section: r[7], snippet: r[7], to: r[7], href: r[7],
      secs: r[8], depth: r[9], maxScroll: r[9], ref: r[10], ua: r[11], tz: r[12], scr: r[13], url: r[14]
    };
  });
  return json_(out);
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['server_ts', 'client_ts', 'type', 'email', 'vid', 'recipient',
      'page', 'detail', 'secs', 'depth', 'ref', 'ua', 'tz', 'screen', 'url']);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional real-time SMS. Add these Script Properties to enable:
 *   TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM (e.g. +1...), ALERT_TO (your cell, +16892421041)
 * Only high-signal events (a new identified viewer or a copy) trigger a text.
 */
function maybeAlert_(d) {
  var p = PropertiesService.getScriptProperties();
  var sid = p.getProperty('TWILIO_SID'), tok = p.getProperty('TWILIO_TOKEN'),
      from = p.getProperty('TWILIO_FROM'), to = p.getProperty('ALERT_TO');
  if (!sid || !tok || !from || !to) return;             // SMS not configured yet
  if (d.type !== 'identify' && d.type !== 'copy') return;
  var msg = d.type === 'identify'
    ? 'TELVERGENCE: ' + (d.email || 'someone') + ' opened ' + (d.page || '') + ' (link: ' + (d.recipient || 'direct') + ')'
    : 'TELVERGENCE: COPY on ' + (d.page || '') + ' by ' + (d.email || d.vid || '?');
  try {
    UrlFetchApp.fetch('https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json', {
      method: 'post',
      headers: { Authorization: 'Basic ' + Utilities.base64Encode(sid + ':' + tok) },
      payload: { To: to, From: from, Body: msg.slice(0, 300) },
      muteHttpExceptions: true
    });
  } catch (err) {}
}

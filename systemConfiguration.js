var socketUrl = 'https://socket.quadworld.in/';
// var socketUrl = 'http://localhost:3075/';
var localUrl = 'http://localhost:3070/';
var opmsUrl = 'https://opms.quadworld.in/';
var pelUrl = 'https://pel.quadworld.in/',
  login = pelUrl + "auth/login",
  getMachines = pelUrl + "client/location/plant/division/line/machines",
  getLocations = pelUrl + "client/locations",
  getOperators = opmsUrl + 'operator/all',
  downtimeStats = pelUrl + 'stats',
  getIntervalsNew = pelUrl + "shifts/getIntervals",
  getAllOperatorLogs = opmsUrl + 'operator-logs/all',
  downtimeTypes = pelUrl + "downtime-types",
  halfHourlyProduction = pelUrl + 'computed-production/hourly-report',
  getdowntime_logs = pelUrl + 'downtime-logs',
  getPlants = pelUrl + "client/location/plants";

var token = localStorage.getItem('usertoken'),
  fullname = localStorage.getItem('fullname'),
  userId = localStorage.getItem('userId'),
  designation = localStorage.getItem('designation'),
  clientId = localStorage.getItem('clientId'),
  clientLogo = localStorage.getItem('clientLogo'),
  adminStatus = localStorage.getItem('adminStatus') === "true",
  superAdminStatus = localStorage.getItem('superAdmin') === "true",
  userImg = localStorage.getItem("userImg");
var socketUrl = 'https://socket.quadworld.in/';
var socket = io.connect(socketUrl, { resource: 'socket/socket.io', 'force new connection': true });

function callAPI(url, requestData, token, method, callback) {
  $.ajax({
    url: url,
    data: JSON.stringify(requestData),
    headers: {
      "Authorization": "bearer " + token
    },
    type: method,
    dataType: 'json',
    contentType: 'application/json',
    success: callback,
    error: function (response, status, error) {
      if (response && response.responseJSON && response.responseJSON.response) {
        $('#loginMessage').html(response.responseJSON.response.message).addClass('unauthorizedUser').removeClass('hideAlert')
        setTimeout(() => {
          $('#loginMessage').removeClass('alert-danger').addClass('d-none')
        }, 4500)
      }
      else if (response && response.responseJSON) {
        $('#loginMessage').html("The username and password that you entered did not match our records. Please double-check and try again.").addClass('unauthorizedUser').removeClass('hideAlert')
        setTimeout(() => {
          $('#loginMessage').addClass('hideAlert')
        }, 4500)
      }
      else if (response && response.responseText) {
        $('#loginMessage').html(response.responseJSON.message).addClass('unauthorizedUser').removeClass('hideAlert')
        setTimeout(() => {
          $('#loginMessage').removeClass('alert-danger').addClass('d-none')
        }, 4500)
      }
      else if (response && response.statusText) {
        $('#loginMessage').html(response.statusText).addClass('unauthorizedUser').removeClass('hideAlert')
        setTimeout(() => {
          $('#loginMessage').removeClass('alert-danger').addClass('d-none')
        }, 4500)
      }
    }
  });
}

async function getCallAPI(url, token, type, data = null) {
  // return $.ajax({
  //     url: url,
  //     headers: {
  //         "Authorization": "bearer " + token
  //     },
  //     type: type,
  //     dataType: 'json',
  //     contentType: 'application/json',
  // });

  if (type == "POST" || type == "PUT") {
    return await $.ajax({
      type, url, data: JSON.stringify(data), headers: { "Authorization": "Bearer " + token },
      dataType: 'json', contentType: 'application/json',
      success: async result => {
        // console.log(`${url} result`, result)
        return result
      },
      error: (error) => {
        console.log('apiUrlCall error', error)
        if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') {
          logout();
        }
        if (error && error.responseJSON) console.log(error.responseJSON)
        else if (error && error.responseText) console.log(error.responseText)
        else console.log({ error })
        console.error('error', error)
      }
    });
  } else {
    return await $.ajax({
      type, url, data, headers: { "Authorization": "Bearer " + token },
      dataType: 'json', contentType: 'application/json',
      success: async result => {
        // console.log(`${url} result`, result)
        return result
      },
      error: (error) => {
        console.log(`error56`, error)
        if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') {
          logout();
        }
        if (error && error.responseJSON) console.log(error.responseJSON)
        else if (error && error.responseText) console.log(error.responseText)
        else console.log({ error })
        throw error
      }
    });
  }
}

function ist() {
  var addHr = moment().add(0, 'hours');
  var addMin = moment(addHr).add(0, 'minutes');
  var dt = moment(addMin, 'YYYY-MM-DD HH:mm:ss').toDate();
  var dateTime = moment(dt).format('YYYY-MM-DD HH:mm:ss').split(' ');
  var response = {
    'dateTime': dt,
    'date': dateTime[0],
    'time': dateTime[1]
  };
  return response;
}

function logout() {
  localStorage.clear()
  window.location.href = 'login.html';
}

async function dummyData(resolve, reject, from, to, countArray) {
  var saveData;
  var send = 0;
  var halfHour = (1000 * 60 * 30);
  var dateTime = moment(from).utc().format('HH:mm:ss');
  if (from < to) {
    countArray[dateTime] = 0;
    from = new Date(from.valueOf() + halfHour);
    this.dummyData(resolve, reject, from, to, countArray);
  } else {
    saveData = countArray;
    send = 1;
  }
  if (send == 1) {
    resolve(saveData);
  }
}

async function subDttype(subDType, doEmit) {
  optionTypeValue = subDType;
  $('#subDowntimeTypes').empty();
  $(".subdt").removeClass('btn-info').addClass('btn-outline-info');
  console.log("subDType", subDType);
  if (subDType) { $('#' + subDType.split(" ").join("-")).removeClass('btn-outline-info').addClass('btn-info'); }
  if (dtOptions[subDType] && dtOptions[subDType].length != 0) {
    for (let i = 0; i < dtOptions[subDType].length; i++) {
      $("#subDowntimeTypes").append(`<button id="sub${dtOptions[subDType][i].split(" ").join("-")}" class="btn btn-outline-info px-1 subtt all" style="margin:6px"
      onClick="subDtt('${dtOptions[subDType][i]}',${true})">${dtOptions[subDType][i]}</button>`);
    }
  }
  subOptionD = {
    "machineId": mID,
    "initialPulseId": initialPulseId,
    "subType": {
      "dataId": "",
      "name": subDType,
      "startDateTime": IST().toISOString()
    }
  }
  if (doEmit) {
    console.log('JH', subOptionD)
    socket.emit('selectDowntimeOption', { ...subOptionD, ...{ "machineId": mID } });
  }
}
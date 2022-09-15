window.onload = function () {

  setTimeout("preventBack()", 0);
  window.onunload = function () { null };
};

function preventBack() {
  window.history.forward();

}


async function authenticateUser() {
  event.preventDefault()
  var loginCreds = { 'username': $('#username').val(), 'password': $('#password').val(), 'remember': $('#remember').prop('checked') }
  // console.log('POP', loginCreds);
  var token = "";



  $.ajax({
    url: login,
    data: JSON.stringify(loginCreds),
    type: "POST",
    dataType: 'json',
    contentType: 'application/json',
    success: async function (response) {

      localStorage.setItem('usertoken', response.token)
      localStorage.setItem('clientId', response.clientId)
      // localStorage.setItem('clientLogo', response._clientId.logo)
      localStorage.setItem('fullname', response.fullname)
      localStorage.setItem('userId', response["_id"])
      localStorage.setItem('designation', response.designation)
      localStorage.setItem('plants', response.plantId)
      localStorage.setItem('divisions', response.divisions)
      localStorage.setItem('adminStatus', response.admin)
      localStorage.setItem('userImg', response.image)
      localStorage.setItem('superAdmin', response.superadmin)
      window.location.href = 'home.html'

    },
    error: function (error) {
      console.log('login error', error);
      if (error && error.responseJSON && error.responseJSON.response) {
        $('#loginMessage').html(error.responseJSON.response.message).addClass('alert-danger').removeClass('d-none')
        setTimeout(() => {
          $('#loginMessage').removeClass('alert-danger').addClass('d-none')
        }, 4500)
        console.log(error.responseJSON.response)
      } else if (error && error.responseJSON) {
        $('#loginMessage').html(error.responseJSON.message).addClass('alert-danger').removeClass('d-none')
        setTimeout(() => {
          $('#loginMessage').removeClass('alert-danger').addClass('d-none')
        }, 4500)
        console.log(error.responseJSON)
      } else if (error && error.responseText) {
        $('#loginMessage').html(error.responseJSON.message).addClass('alert-danger').removeClass('d-none')
        setTimeout(() => {
          $('#loginMessage').removeClass('alert-danger').addClass('d-none')
        }, 4500)
        console.log(error.responseText)
      } else if (error && error.statusText) {
        $('#loginMessage').html(error.statusText).addClass('alert-danger').removeClass('d-none')
        setTimeout(() => {
          $('#loginMessage').removeClass('alert-danger').addClass('d-none')
        }, 4500)
        console.log(error.statusText)
      } else {
        console.log({ error })
      }
    }
  })




  // await callAPI(login, loginCreds, token, "POST", function (response) {
  //   console.log('response', response)

  //   //   // console.log(response)
  //   //   // localStorage.setItem('name',response.fullName)
  //   //   // localStorage.setItem('usertoken',response.token)
  //   //   // localStorage.setItem('usertoken',response.token)
  // })
}




// var mID = "";
// var ghp;
// var currentShift = "";
// var currentDate = "";
// var statsUrl = "";
// var operatorData = [];
// var shiftsObject = {};
// var currentTime = {};
// var dtOptions = {};
// var selectedDowntime = "";
// var optionTypeValue = "";
// var subOptionTypeValue = "";
// var initialPulseId = "";
// var downtimeOptionId = "";
// var startTime = "";
// var subOptionObject = {};
// var subOptionD = {};
// var operators = [];
// var selOperatorId = "none";
// var press = false;
// $(document).ready(async function () {
//   var btn = document.getElementById('flip_content');
//   var btn1 = document.getElementById('flip_content1');
//   var btn2 = document.getElementById('flip_content2');
//   var content = document.getElementById('f1_card');
//   // $("#selectOperator").select2();
//   // $("#selectOperator").select2({
//   //   placeholder: "Select a State",
//   //   allowClear: true
//   // });
//   btn1.onclick = function () {
//     content.classList.toggle('flip');
//   }
//   btn.onclick = function () {
//     content.classList.toggle('flip');
//   }
//   btn2.onclick = function () {
//     content.classList.toggle('flip');
//   }
//   await init();
//   await $('#clock').empty();
//   await AnalogClock("clock", new AnalogClockOption(120, "#eee", "#333"));//using option class to customize
//   //base on object use, returns an clock object, can do some further style controll by the returned object.
//   var opt = new AnalogClockOption(); opt.width = 100;
//   await myFunctionS();
//   socket.on('selectDowntime', data => {
//     console.log('selectDowntime', data.machineId)
//     if (data.machineId == mID) {
//       hideButton(data.downTimeTypes[0], false);
//     }
//   });
//   socket.on('cancelDowntime', data => {
//     if (data.machineId == mID) {
//       console.log('cancelDowntime', data.machineId)
//       backToDTbuttons(false);
//     }
//   });
//   socket.on('selectDowntimeOption', data => {
//     if (data.machineId == mID) {
//       console.log('Swami', data)
//       subDttype(data.subType.name, false);
//     }
//     // let idx = window.machines.findIndex(p => p.id == data.machineId)
//     // if (idx > -1) {
//     //   console.log('socket.on', $(`#downtimeOptionHtm${idx} button[rel='${data.subType.name}']`))
//     //   selectDowntimeOption($(`#downtimeOptionHtm${idx} button[rel='${data.subType.name}']`), false)
//     //   window.machines[idx].downtimeOption = data
//     // }
//   })
//   socket.on('selectDowntimeSubOption', data => {
//     console.log('selectDowntimeSubOption', data);
//     if (data.machineId == mID) {
//       subDtt(data.subOption.names[0], false);
//     }
//     // let idx = window.machines.findIndex(p => p.id == data.machineId)
//     // if (idx > -1) {
//     //   // console.log('socket.on selectDowntimeSubOption', data)
//     //   let subOption = data.subOption.names[data.subOption.names.length - 1]
//     //   selectDowntimeSubOption($(`#downtimeSubOptionsHtm${idx} button[rel='${subOption}']`), false)
//     //   window.machines[idx].downtimeSubOption = data
//     // }
//   });
//   // && press == false
//   socket.on('initialData', async (initialData) => {
//     console.log('SwamiIT', initialData, startTime, press, initialData["machineId"]);
//     if ("machineId" in initialData && initialData["machineId"] && mID == initialData["machineId"]) {
//       await clearInterval(ghp);

//       if (!initialData.subType && !initialData.subOption) {
//         startTime = initialData.startDateTime;
//         // await clearInterval(ghp);
//         await hideButton(initialData.name, false);
//         startCounter(startTime);
//       } else if (initialData.subType) {
//         // await clearInterval(ghp);

//         startTime = initialData.subType.startDateTime;
//         await subDttype(initialData.subType.name, false);
//         await startCounter(startTime);

//       } else if (initialData.subOption) {
//         // await clearInterval(ghp);

//         startTime = initialData.subOption.startDateTime;
//         await subDtt(initialData.subOption.names[0], false);
//         await startCounter(startTime);

//       }
//     }
//   });
//   socket.on('activityData', (activityData) => {
//     if (activityData.machineId == mID) {
//       clearInterval(ghp);
//       optionTypeValue = "";
//       subOptionTypeValue = "";
//       selectedDowntime = "";
//       startTime = "";
//       localStorage.setItem("machineStartD", "");
//       // console.log('ms', localStorage.getItem("machineStartD"))
//       $(`#timer`).text("00:00:00");
//       $('#subDowntime').empty();
//       $('#subDowntimeTypes').empty();
//       $("#dtWatch").hide();
//       $("#dtButtons").show();
//     }
//   })

// });
// async function init() {
//   mID = await querySt('id');
//   currentTime = await ist();
//   currentShift = localStorage.getItem("CurrentShift");
//   currentDate = localStorage.getItem("currentDate");
//   operatorData = JSON.parse(localStorage.getItem("opData"));
//   statsUrl = localStorage.getItem("statsUrl");
//   shiftsObject = JSON.parse(localStorage.getItem("shiftsObject"));
//   console.log('shiftsObjectSW', shiftsObject);
//   var machineUrl = getMachines + '?clientId=' + clientId + '&id=' + mID;
//   var machineData = await getCallAPI(machineUrl, token, 'GET');
//   operators = await getCallAPI(getOperators + '?clientId=' + clientId + '&plantId=' + localStorage.getItem("opPlantId"), token, 'GET');
//   console.log('operators', operators);

//   if (operators && operators.length != 0) {
//     $('#selectOperator').empty();
//     for (let g = 0; g < operators.length; g++) {
//       if (g == 0) {
//         $('#selectOperator').append(`<option value="none">No Operator</option>`);
//       }
//       $('#selectOperator').append(`<option value=${operators[g].id}>${operators[g].fullName}</option>`);
//     }
//   }
//   if (machineData && machineData[0] && machineData[0].image) {
//     var machineImg = machineData[0].image.replace("uploads/", "image/");
//     machineImg = pelUrl + machineImg
//     document.getElementById("machineImage").src = machineImg;
//   }
//   document.getElementById("machineName").textContent = machineData && machineData[0] && machineData[0].name ? machineData[0].name : " ";
//   var lineOb = JSON.parse(localStorage.getItem('LineD'));
//   document.getElementById("lineName").textContent = machineData && machineData[0] && machineData[0].lineId && lineOb[machineData[0].lineId] ? lineOb[machineData[0].lineId]['name'] : " ";
//   // getAllOperatorLogs
//   await socket.on(localStorage.getItem("opPlantId"), function (data) {
//     // console.log("SwamiData", data)
//     if (data['machineId'] == mID) {
//       if ('count' in data) {
//         if ('stationNo' in data && 'cycleTime' in data) {
//           $(`#ct-${data['stationNo']}`).text(data['cycleTime']);
//         }
//       }
//       if ('stationCount' in data) {
//         for (let b = 0; b < data['stationCount'].length; b++) {
//           $(`#st-${data['stationCount'][b]['number']}`).text(data['stationCount'][b]['value']);
//         }
//       }
//       if ('status' in data) {
//         if (data['status'] == 'Active' || data['status'] == 'active') {
//           document.getElementById("status").style.color = "#007F00";
//           $('#status').text(data['status']);
//         } else {
//           document.getElementById("status").style.color = "#FF0101";
//           $('#status').text(data['status']);

//         }
//       }

//     }
//   });
//   var operatorUrl = getAllOperatorLogs + "?shift=" + currentShift + "&activeMachines=" + mID + "&date=" + currentDate + "&clientId=" + clientId;
//   var opData = await getCallAPI(operatorUrl, token, 'GET');
//   console.log('SwamiopName', opData, operators);

//   if (opData.length != 0) {
//     // opData[0].operatorId;
//     var opName = operatorData.filter(obj => obj.id == opData[0].operatorId);
//     var desigOprId = '';
//     selOperatorId = opName[0].id;
//     document.getElementById('selectOperator').value = selOperatorId;
//     console.log("opName", opName);
//     if (opName && opName[0] && opName[0].fullName) {
//       if (opName[0].aadharNumber) {
//         desigOprId = ' (XXXX-XXXX-' + ((opName[0].aadharNumber).toString()).slice(-4) + ')'
//         if (opName[0].designation) desigOprId = ', ' + opName[0].designation + ' (XXXX-XXXX-' + ((opName[0].aadharNumber).toString()).slice(-4) + ')'
//       } else {
//         desigOprId = ''
//         if (opName[0].designation) desigOprId = ', ' + opName[0].designation
//       }
//       $('#operatorName').text(opName[0].fullName + desigOprId);
//       $("#operatorNameModal").text(opName[0].fullName + desigOprId)
//       $("#operatorIdModal").text(opName[0].id);
//       opName[0].type ? $("#operatorType").text(opName[0].type) : $("#operatorType").text('Operator')

//     } else {
//       $('#operatorName').text("");
//     }
//     if (opName && opName[0] && opName[0].image) {
//       var opImg = opName[0].image.replace("uploads/", "image/");
//       opImg = opmsUrl + opImg;
//       // console.log('JK', opImg);
//       document.getElementById("operatorImage").src = opImg;
//     }
//   } else {
//     selOperatorId = 'none';
//     document.getElementById('selectOperator').value = "none";
//     $('#select2-selectOperator-container').text('Select Operator')
//     //   // $('#operatorName').text('No Operator Selected');
//     $("#operatorNameModal").text('No Operator Selected')
//     $('#operatorId').text('');
//     $("#operatorIdModal").text('')
//     $("#operatorType").text('')
//     $("#joining").text('')
//     $("#contact").text('')
//     $("#avgPerformance").text('')
//     $("#efficiency").text('')
//   }

//   // if (opData.length != 0) {
//   //   if (opData[0].aadharNumber) {
//   //     var desigOprId = ' (XXXX-XXXX-' + ((opData[0].aadharNumber).toString()).slice(-4) + ')'
//   //     if (opData[0].designation) desigOprId = ', ' + opData[0].designation + ' (XXXX-XXXX-' + ((opData[0].aadharNumber).toString()).slice(-4) + ')'
//   //   } else {
//   //     var desigOprId = ''
//   //     if (opData[0].designation) desigOprId = ', ' + opData[0].designation
//   //   }
//   //   selOperatorId = opData[0].id;
//   //   $('#select2-selectOperator-container').text(opData[0].fullName + desigOprId)
//   //   // $('#operatorName').text(operator.fullName + desigOprId)
//   //   $("#operatorNameModal").text(opData[0].fullName + desigOprId)
//   //   $('#operatorId').text(opData[0].id);
//   //   $("#operatorIdModal").text(opData[0].id)
//   //   opData[0].type ? $("#operatorType").text(opData[0].type) : $("#operatorType").text('Operator')
//   //   opData[0].experience ? $("#joining").text(moment(opData[0].experience[opData[0].experience.length - 1]["startEmployment"]).format('DD-MM-YYYY')) : true;
//   //   opData[0].contact ? $("#contact").text(opData[0].contact) : $("#contact").text('')
//   //   $("#avgPerformance").text(opData[0].avgPerformance)
//   //   $("#efficiency").text(opData[0].efficiency)
//   // } else {
//   //   $('#select2-selectOperator-container').text('Select Operator')
//   //   // $('#operatorName').text('No Operator Selected');
//   //   $("#operatorNameModal").text('No Operator Selected')
//   //   $('#operatorId').text('');
//   //   $("#operatorIdModal").text('')
//   //   $("#operatorType").text('')
//   //   $("#joining").text('')
//   //   $("#contact").text('')
//   //   $("#avgPerformance").text('')
//   //   $("#efficiency").text('')
//   // }



//   await operatorEff();
//   await hourlyData();
//   console.log("operatorUrl", operatorUrl, opData);
// }
// function querySt(ji) {
//   hu = window.location.search.substring(1);
//   gy = hu.split("&");
//   for (i = 0; i < gy.length; i++) {
//     ft = gy[i].split("=");
//     if (ft[0] == ji) {
//       return ft[1];
//     }
//   }
// }
// async function operatorEff() {
//   var statURL = statsUrl + '&machineId=' + mID;
//   var downtimeD = JSON.parse(localStorage.getItem("downtimeD"));
//   console.log('downtimeD', downtimeD);
//   var statsD = await getCallAPI(statURL, token, 'GET');
//   if (statsD && statsD.length != 0) {

//     var shiftobj = statsD[0].stats[currentShift];
//     var totaldeduction = 0;
//     var totaladd = 0;
//     var LAStop = 0;

//     Object.keys(shiftobj.activity).map((data) => {
//       if (downtimeD[localStorage.getItem("opPlantId")]["downtimeDeductions"].includes(data)) {
//         totaldeduction += shiftobj.activity[data];
//       } else {
//         if (data != 'Late Start' && data != 'Early Stop') {
//           totaladd += shiftobj.activity[data];
//         } else {
//           LAStop += shiftobj.activity[data];
//         }
//       }
//     });
//     var cal1 = shiftobj.runtime + shiftobj.loading + shiftobj.unloading + totaladd;
//     var cal2 = (shiftobj.total - shiftobj.breaks) - totaldeduction;
//     var oE = (cal1 / cal2) * 100;
//     console.log("Swamishiftobj", shiftobj);
//     $("#eff").text(isFinite(oE) && oE ? oE.toFixed(2) + " %" : 0 + "%");
//     var idelT = shiftobj && shiftobj.idleTime ? shiftobj.idleTime.toFixed(2) : 0;
//     // $('#idleTime').text(idelT);
//   }

// }
// async function hourlyData() {
//   // var from, to; //to current-time
//   // from = await setTime(shiftsObject[currentShift + '-startDate'], shiftsObject[currentShift + '-startDateTime']);
//   // to = await setTime(currentDate, currentTime.time);
//   var from, to;
//   from = await setTime(shiftsObject[currentShift + '-startDate'], shiftsObject[currentShift + '-startDateTime']);
//   to = await setTime(shiftsObject[currentShift + '-endDate'], shiftsObject[currentShift + '-endDateTime']);
//   var countArray = {};
//   var halfHourly123 = await new Promise((r, j) => {
//     dummyData(r, j, from, to, countArray)
//   }).then((result) => {
//     return result;
//   });
//   $('#countit').empty();
//   $('#tbody').empty();
//   console.log('LPL', halfHourly123);
//   var halfHourlyArray = Object.keys(halfHourly123);
//   var tableHead = '<tr id="timeid"><th class="rowgroup"  ></th>';
//   var tableHead1 = '<tr id="timeid1"><th class="rowgroup"  ></th>';
//   var Target_row_total = '<tr id="count-tt"><th style="padding: 20px;font-size: 15px;">PLAN</th>';
//   var Actual_row_total = '<tr id="count-tp"><th style="padding: 20px;font-size: 15px;">ACTUAL</th></th>';
//   for (let k = 0; k < halfHourlyArray.length / 2; k++) {
//     if (halfHourlyArray[k + k + 2] == undefined) {
//       console.log("hal1", halfHourlyArray[k + k].slice(0, -3));

//       tableHead += `<th class="text-nowrap" style="padding: 5px">${await tConvertFirst(halfHourlyArray[k + k].slice(0, -3))}</th></tr>`
//       tableHead1 += `<th class="text-nowrap" style="padding: 5px">${await tConvert(shiftsObject[currentShift + '-endDateTime'].slice(0, -3))}</th ></tr >`
//       // tableHead += `<th class="text-nowrap">${await tConvertFirst(halfHourlyArray[k + k].slice(0, -3))}</th></tr>`

//       Target_row_total += `<td style="padding: 20px;text-align: start;"><b><span id="total-target-${k}">0</span></b></td></tr>`;
//       Actual_row_total += `<td style="padding: 20px;text-align: start;"><b><span id="total-actual-${k}">0</span></b></td></tr>`;
//       $('#countit').append(tableHead);
//       $('#countit').append(tableHead1);

//       $('#tbody').append(Target_row_total);
//       $('#tbody').append(Actual_row_total);

//     } else {
//       console.log("hal", halfHourlyArray[k + k].slice(0, -3));
//       tableHead += `<th class="text-nowrap" style="padding: 5px">${await tConvertFirst(halfHourlyArray[k + k].slice(0, -3))}</th>`;
//       tableHead1 += `<th class="text-nowrap"style="padding: 5px" >${await tConvert(halfHourlyArray[k + k + 2].slice(0, -3))}</th>`;
//       Target_row_total += `<td style="padding: 20px;text-align: start;"><b><span id="total-target-${k}">0</span></b></td>`;
//       Actual_row_total += `<td style="padding: 20px;text-align: start;"><b><span id="total-actual-${k}">0</span></b></td>`;
//     }
//   }
//   var hourlyUrl = halfHourlyProduction + "?clientId=" + clientId + "&plantId=" + localStorage.getItem("opPlantId") + "&machineId=" + mID + "&date=" + currentDate;
//   var response = await getCallAPI(hourlyUrl, token, 'GET');

//   var from, to; //to current-time
//   from = await setTime(shiftsObject[currentShift + '-startDate'], shiftsObject[currentShift + '-startDateTime']);
//   to = await setTime(currentTime.date, currentTime.time);
//   var countArray = {};
//   var halfHourly = await new Promise((r, j) => {
//     dummyData(r, j, from, to, countArray)
//   }).then((result) => {
//     return result;
//   });
//   var halfHourlyArray = Object.keys(halfHourly123);

//   // console.log('hourlyResponce', response, halfHourly);
//   var totalProd = 0;

//   for (let s = 0; s < response.length; s++) {
//     var halfHourlyArrayData = response[s].halfHourly;
//     var halfHourlyTargetArrayData = response[s].halfHourlyTargets;
//     var totaltargetH = 0;
//     var totalactualH = 0;
//     if (halfHourlyTargetArrayData != undefined && halfHourlyArrayData != undefined && Object.keys(halfHourlyTargetArrayData).length != 0 && Object.keys(halfHourlyArrayData).length != 0) {
//       for (let r = 0; r < halfHourlyArray.length / 2; r++) {
//         if (halfHourlyArray[r + r + 1] == undefined) {
//           totalactualH += halfHourlyArrayData[halfHourlyArray[r + r]];
//           var targetVal = 0;
//           if (halfHourlyTargetArrayData[halfHourlyArray[r + r]].target != undefined || halfHourlyTargetArrayData[halfHourlyArray[r + r]].target != null) {
//             targetVal = halfHourlyTargetArrayData[halfHourlyArray[r + r]].target;
//           }
//           totaltargetH += targetVal;
//           totalProd += halfHourlyArrayData[halfHourlyArray[r + r]];
//           $('#total-actual-' + r).text(halfHourlyArrayData[halfHourlyArray[r + r]]);
//           $('#total-target-' + r).text(targetVal);
//           $('#totalProduction').text(totalProd);

//         } else if (halfHourlyArray[r + r + 2] == undefined) {   //full-day
//           totalactualH += halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]];
//           var targetVal1 = 0;
//           var targetVal2 = 0;
//           if (halfHourlyTargetArrayData[halfHourlyArray[r + r]].target != undefined || halfHourlyTargetArrayData[halfHourlyArray[r + r]].target != null) {
//             targetVal1 = halfHourlyTargetArrayData[halfHourlyArray[r + r]].target;
//           }
//           if (halfHourlyTargetArrayData[halfHourlyArray[r + r + 1]].target != undefined || halfHourlyTargetArrayData[halfHourlyArray[r + r + 1]].target != null) {
//             targetVal2 = halfHourlyTargetArrayData[halfHourlyArray[r + r + 1]].target;
//           }
//           totaltargetH += targetVal1 + targetVal2;
//           totalProd += (halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]);
//           $('#total-actual-' + r).text(halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]);
//           $('#total-target-' + r).text(targetVal1 + targetVal2);
//           $('#totalProduction').text(totalProd);
//         }
//         else {
//           var targetVal1 = 0;
//           var targetVal2 = 0;
//           if (halfHourlyTargetArrayData[halfHourlyArray[r + r]].target != undefined || halfHourlyTargetArrayData[halfHourlyArray[r + r]].target != null) {
//             targetVal1 = halfHourlyTargetArrayData[halfHourlyArray[r + r]].target;
//           }
//           if (halfHourlyTargetArrayData[halfHourlyArray[r + r + 1]].target != undefined || halfHourlyTargetArrayData[halfHourlyArray[r + r + 1]].target != null) {
//             targetVal2 = halfHourlyTargetArrayData[halfHourlyArray[r + r + 1]].target;
//           }
//           totalactualH += (halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]);
//           totaltargetH += (targetVal1 + targetVal2);
//           totalProd += (halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]);
//           $('#total-actual-' + r).text((halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]));
//           $('#total-target-' + r).text((targetVal1 + targetVal2));
//         }
//       }
//     } else if (halfHourlyTargetArrayData == undefined || halfHourlyTargetArrayData == null) {
//       for (let r = 0; r < halfHourlyArray.length / 2; r++) {
//         if (halfHourlyArray[r + r + 1] == undefined) {
//           totalactualH += halfHourlyArrayData[halfHourlyArray[r + r]];
//           var targetVal = 0;
//           totaltargetH += targetVal;
//           totalProd += halfHourlyArrayData[halfHourlyArray[r + r]];
//           $('#total-actual-' + r).text(halfHourlyArrayData[halfHourlyArray[r + r]]);
//           $('#total-target-' + r).text(targetVal);
//           $('#totalProduction').text(totalProd);

//         } else if (halfHourlyArray[r + r + 2] == undefined) {   //full-day
//           totalactualH += halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]];
//           var targetVal1 = 0;
//           var targetVal2 = 0;
//           totaltargetH += targetVal1 + targetVal2;
//           totalProd += halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]];
//           $('#total-actual-' + r).text(halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]);
//           $('#total-target-' + r).text(targetVal1 + targetVal2);
//           $('#totalProduction').text(totalProd);
//         }
//         else {
//           var targetVal1 = 0;
//           var targetVal2 = 0;
//           totalactualH += (halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]);
//           totaltargetH += (targetVal1 + targetVal2);
//           totalProd += (halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]])
//           $('#total-actual-' + r).text((halfHourlyArrayData[halfHourlyArray[r + r]] + halfHourlyArrayData[halfHourlyArray[r + r + 1]]));
//           $('#total-target-' + r).text((targetVal1 + targetVal2));
//         }
//       }
//     }
//   }
//   await downtimeType();
// }
// async function setTime(d, t) {
//   var dateTime = d + 'T' + t + '.000Z';
//   var response = moment(dateTime).toDate();
//   return response;
// }
// async function tConvert(time) {
//   // Check correct time format and split into components
//   time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

//   if (time.length > 1) { // If time format correct
//     time = time.slice(1);  // Remove full string match value
//     // console.log('time0', time);
//     time[3] = null; // Set AM/PM
//     time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
//     time[0] = +time[0] % 12 || 12; // Adjust hours
//     // time[1] = null;
//     // time[2] = null;
//     time[1] = +time[2] == "0" ? null : ":";
//     time[2] = +time[2] == "0" ? null : +time[2];
//   }
//   return time.join(''); // return adjusted time or original string
// }
// async function tConvertFirst(time) {
//   // Check correct time format and split into components
//   time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
//   if (time.length > 1) { // If time format correct
//     time = time.slice(1);  // Remove full string match value
//     time[3] = null; // Set AM/PM
//     time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
//     time[0] = +time[0] % 12 || 12; // Adjust hours
//     time[1] = +time[2] == "0" ? null : ":";
//     time[2] = +time[2] == "0" ? null : +time[2];
//   }
//   return time.join(''); // return adjusted time or original string
// }
// async function downtimeType() {
//   var downtimeTypesUrl = downtimeTypes + "?clientId=" + clientId + "&plantId=" + localStorage.getItem("opPlantId") + "&divisionId=" + localStorage.getItem("opDivisionId");
//   var downtimeData = await getCallAPI(downtimeTypesUrl, token, 'GET');
//   console.log("downtimeData", downtimeData);
//   if (downtimeData && "types" in downtimeData && downtimeData.types && downtimeData.types.length != 0) {
//     for (let g = 0; g < downtimeData.types.length; g++) {
//       if (g != 0) {
//         dtOptions[downtimeData.types[g]['option']] = downtimeData.types[g].options;
//       }
//       if (g == 0) {
//         var dtData = downtimeData.types[0]["options"];
//         $('#downtimeButtons').empty();
//         for (let d = 0; d < dtData.length; d++) {
//           $('#downtimeButtons').append(`<div class="col-md-3" style="height: auto;float: left;margin-top: 15px;" onClick="hideButton('${dtData[d]}',${true})">
//         <div class="gr" style="height: 100%;width: 90%;margin-left: 5%;border-radius: 8px;">
//           <h5 style="padding: 10px;font-size:17px;">${dtData[d]}</h5>
//         </div>
//       </div>`);
//         }
//       }
//     }
//   }
// }
// async function submitD(time) {
//   press = true;

//   var cTime = "";
//   if (time != "") {
//     cTime = time;
//   } else {
//     cTime = IST().toISOString();
//   }
//   localStorage.setItem("machineStartD", cTime);
//   $('.all').prop('disabled', true);
//   // if (localStorage.getItem("machineStartD") != null || localStorage.getItem("machineStartD") != "") {
//   //   // console.log('ms1', localStorage.getItem("machineStartD"))
//   //   ghp = setInterval(() => msToHMS(cTime), 1000);
//   // }
//   var dataConfirm = {
//     "dataId": "0",
//     "downTimeTypes": [$('#dtReason').text()],
//     "machineId": mID,
//     "name": $('#dtReason').text(),
//     "startDateTime": cTime,
//     "type": "activity"
//   }

//   console.log("SQ", dataConfirm);
//   if (optionTypeValue != "" || subOptionTypeValue != "") {
//     await submitDowntime("", dataConfirm, submitDowntimeOption);
//   } else {
//     await submitDowntime("", dataConfirm);
//   }
//   $('#confirm').hide()
//   $('#back').hide()
//   $('#downtimeConfirm').show()
// }
// async function completeD() {
//   event.stopPropagation()
//   clearInterval(ghp)
//   localStorage.setItem("machineStartD", "");
//   // console.log('ms', localStorage.getItem("machineStartD"))
//   $(`#timer`).text("00:00:00");
//   $('#subDowntime').empty();
//   $('#subDowntimeTypes').empty();
//   $("#dtWatch").hide();
//   $("#dtButtons").show();
// }
// async function hideButton(dtType, doEmit) {
//   // console.log('dtType', dtType, dtOptions, dtOptions[dtType]);
//   $('#subDowntime').empty();
//   $('#subDowntimeTypes').empty();
//   $("#dtButtons").hide();
//   $("#dtWatch").show();
//   $('#dtReason').text(dtType);
//   $('#subDowntime').empty();
//   $('#confirm').show()
//   $('#back').show()
//   $('#downtimeConfirm').hide()
//   selectedDowntime = dtType;
//   if (dtOptions[dtType] && dtOptions[dtType].length != 0) {
//     for (let i = 0; i < dtOptions[dtType].length; i++) {
//       $("#subDowntime").append(`<button id="${dtOptions[dtType][i].split(" ").join("-")}" class="btn btn-outline-info px-1 subdt all" style="margin:6px" onClick="subDttype('${dtOptions[dtType][i]}',${true})"
//  >${dtOptions[dtType][i]}</button>`);
//     }
//   } else {
//     $('#subDowntimeTypes').html('<div style="color:#040709">.</div>');
//     $('#subDowntime').html('<div style="color:#040709">.</div>');
//   }

//   if (doEmit) {
//     var emitData = {
//       "dataId": 0,
//       "downTimeTypes": [dtType],
//       "machineId": mID,
//       "name": dtType,
//       "startDateTime": IST().toISOString(),
//       "type": "activity"
//     }
//     socket.emit('selectDowntime', emitData)
//   }

// }
// async function subDttype(subDType, doEmit) {
//   optionTypeValue = subDType;
//   $('#subDowntimeTypes').empty();
//   $(".subdt").removeClass('btn-info').addClass('btn-outline-info');
//   console.log("subDType", subDType);
//   if (subDType) { $('#' + subDType.split(" ").join("-")).removeClass('btn-outline-info').addClass('btn-info'); }
//   if (dtOptions[subDType] && dtOptions[subDType].length != 0) {
//     for (let i = 0; i < dtOptions[subDType].length; i++) {
//       $("#subDowntimeTypes").append(`<button id="sub${dtOptions[subDType][i].split(" ").join("-")}" class="btn btn-outline-info px-1 subtt all" style="margin:6px"
//       onClick="subDtt('${dtOptions[subDType][i]}',${true})">${dtOptions[subDType][i]}</button>`);
//     }
//   }
//   subOptionD = {
//     "machineId": mID,
//     "initialPulseId": initialPulseId,
//     "subType": {
//       "dataId": "",
//       "name": subDType,
//       "startDateTime": IST().toISOString()
//     }
//   }
//   if (doEmit) {
//     console.log('JH', subOptionD)
//     socket.emit('selectDowntimeOption', { ...subOptionD, ...{ "machineId": mID } });
//   }
// }
// async function subDtt(subDType, doEmit) {
//   subOptionTypeValue = subDType;
//   $(".subtt").removeClass('btn-info').addClass('btn-outline-info');
//   $('#sub' + subDType.split(" ").join("-")).removeClass('btn-outline-info').addClass('btn-info');
//   subOptionObject = {
//     "initialPulseId": initialPulseId,
//     "subOption": {
//       "optionId": downtimeOptionId,
//       "names": [subDType],
//       "startDateTime": IST().toISOString()
//     }
//   }
//   if (doEmit) {

//     console.log('JH', subOptionObject)
//     socket.emit('selectDowntimeSubOption', { ...subOptionObject, ...{ "machineId": mID } });
//   }
// }
// async function backToDTbuttons(doEmit) {
//   $("#dtWatch").hide();
//   $("#dtButtons").show();
//   optionTypeValue = "";
//   subOptionTypeValue = "";
//   selectedDowntime = "";
//   startTime = "";
//   subOptionObject = {};
//   subOptionD = {};
//   if (doEmit) {
//     console.log("doEmit", mID);
//     socket.emit('cancelDowntime', { "machineId": mID })
//   }
// }
// const msToHMS = (ms) => {
//   // console.log('ms', ms, `machines[${idx}]`, window.machines[idx])//, window.machines[idx].timer)
//   // ms = window.machines[idx].downtimeData.startDateTime
//   var ms = new Date(ms);
//   var current = IST();
//   var diff = current - ms;
//   function pad(n, z) {
//     z = z || 2;
//     return ('00' + n).slice(-z);
//   }
//   var mis = diff % 1000;
//   diff = (diff - mis) / 1000;
//   var secs = diff % 60;
//   diff = (diff - secs) / 60;
//   var mins = diff % 60;
//   var hrs = (diff - mins) / 60;
//   // console.log("timer", pad(hrs) + ':' + pad(mins) + ':' + pad(secs), ms)
//   // $(`#timer${idx}`).text(pad(hrs) + ':' + pad(mins) + ':' + pad(secs));
//   $(`#timer`).html(pad(hrs) + ':' + pad(mins) + ':' + pad(secs))
// }
// const msToHMSNew = (intervals) => {
//   intervals.forEach(function (startDateTime, idx) {
//     // console.log('%d: %s', idx, startDateTime, window.machines[idx]);
//     if (window.machines[idx] && !window.machines[idx].timer) window.machines[idx].timer = setInterval(() => msToHMS(startDateTime, idx), 1000);
//   })
// }
// const IST = () => {
//   var dateUTC = new Date();
//   var dateUTC = dateUTC.getTime();
//   var dateIST = new Date(dateUTC);
//   dateIST.setHours(dateIST.getHours() + 5);
//   dateIST.setMinutes(dateIST.getMinutes() + 30);
//   return dateIST;
// }
// const submitDowntime = async (idx, initialData, callback) => {

//   console.log("SQQ", initialData);
//   var ipResult = await getCallAPI(pelUrl + 'initial-pulse', token, 'POST', initialData);
//   if (ipResult && ipResult.initialPulse) initialPulseId = ipResult.initialPulse._id;
//   if (callback) {
//     if ("initialPulseId" in subOptionD) {
//       subOptionD["initialPulseId"] = initialPulseId;
//       subOptionD.subType.dataId = initialPulseId;

//     }
//     console.log("subOptionObject", subOptionD, initialData.startDateTime);

//     subOptionD.subType.startDateTime = initialData.startDateTime
//     // window.machines[idx].downtimeOption.initialPulseId = $(`#initialPulseId${idx}`).val()
//     // window.machines[idx].downtimeOption.subType.dataId = $(`#initialPulseId${idx}`).val()
//     callback("", subOptionD, submitDowntimeSubOption)
//   } else {
//     if (localStorage.getItem("machineStartD") != null || localStorage.getItem("machineStartD") != "") {
//       // console.log('ms1', localStorage.getItem("machineStartD"))
//       startTime = initialData.startDateTime;
//       ghp = setInterval(() => msToHMS(initialData.startDateTime), 1000);
//     }
//     // completeDowntime(initialData.name, true, initialData.startDateTime, "", mID);

//   }
// }
// const submitDowntimeOption = async (idx, downtimeOption, callback) => {
//   console.log('downtimeOption2', downtimeOption)
//   //   await reviewToken()
//   $.ajax({
//     url: pelUrl + 'initial-pulse',
//     data: JSON.stringify(downtimeOption),
//     type: "PUT",
//     headers: { "Authorization": "Bearer " + token },
//     dataType: 'json',
//     contentType: 'application/json',
//     success: function (data) {
//       downtimeOptionId = data.subTypes[data.subTypes.length - 1]._id
//       // $(`#downtimeOptionId${idx}`).val(data.subTypes[data.subTypes.length - 1]._id)
//       if (callback && subOptionTypeValue != "") {
//         // window.machines[idx].downtimeSubOption.initialPulseId = $(`#initialPulseId${idx}`).val()
//         subOptionObject.initialPulseId = initialPulseId;
//         subOptionObject.subOption.optionId = downtimeOptionId;
//         subOptionObject.subOption.startDateTime = downtimeOption.subType.startDateTime;
//         console.log('downtimeOption3', subOptionObject)

//         // window.machines[idx].downtimeSubOption.subOption.optionId = $(`#downtimeOptionId${idx}`).val()
//         submitDowntimeSubOption(idx, subOptionObject)
//       } else {
//         // console.log("HJ", downtimeOption.subType.startDateTime, IST().toISOString());
//         startTime = downtimeOption.subType.startDateTime;
//         ghp = setInterval(() => msToHMS(downtimeOption.subType.startDateTime), 1000);
//         // $(`#downtimeConfirm${idx}`).hide()
//         // $(`#downtimeCancel${idx}`).hide()
//         // $(`#downtimeOptionHtm${idx} button`).attr('disabled', '')
//         // $(`#downtimeOptionHtm${idx} button.active`).removeClass('btn-outline-info').addClass('btn-info')
//         // $(`#downtimeSubOptionsHtm${idx} button`).attr('disabled', '')
//         // $(`#downtimeSubOptionsHtm${idx} button.active`).removeClass('btn-outline-info').addClass('btn-info')
//         // $(`.completeDtButton${idx}`).removeClass('hidden')
//         // var initialData = window.machines[idx].downtimeData
//         // $(`.completeDtButton${idx}`).attr('onclick', `completeDowntime('${initialData.name}',true,'${initialData.startDateTime}',${idx})`)
//       }
//     },
//     error: error => {
//       console.log('put initial-pulse update error1', error)
//       if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
//       if (error && error.responseJSON) console.log(error.responseJSON)
//       else if (error && error.responseText) console.log(error.responseText)
//       else console.log({ error })
//     }
//   })
// }
// const submitDowntimeSubOption = async (idx, downtimeSubOption) => {
//   console.log('downtimeSubOption', downtimeSubOption)
//   //   await reviewToken()
//   $.ajax({
//     url: pelUrl + 'initial-pulse',
//     data: JSON.stringify(downtimeSubOption),
//     type: "PUT",
//     headers: { "Authorization": "Bearer " + token },
//     dataType: 'json',
//     contentType: 'application/json',
//     success: function (data) {
//       // console.log('put initial-pulse update subOption', data)
//       // $('#declareSubOptionsMessage').addClass('alert-success').removeClass('hidden')
//       // $('#declareSubOptionsMessage span:first').text('Downtime sub options submitted successfully')
//       // setTimeout(() => { $('#declareSubOptionsMessage').addClass('hidden') }, 3500)
//       // if (window.machines[idx] && !window.machines[idx].timer) window.machines[idx].timer = setInterval(() => msToHMS(window.machines[idx].downtimeData.startDateTime, idx), 1000);
//       startTime = downtimeSubOption.subOption.startDateTime;
//       ghp = setInterval(() => msToHMS(downtimeSubOption.subOption.startDateTime), 1000);
//       // $(`#downtimeConfirm${idx}`).hide()
//       // $(`#downtimeCancel${idx}`).hide()
//       // $(`#downtimeOptionHtm${idx} button`).attr('disabled', '')
//       // $(`#downtimeOptionHtm${idx} button.active`).removeClass('btn-outline-info').addClass('btn-info')
//       // $(`#downtimeSubOptionsHtm${idx} button`).attr('disabled', '')
//       // $(`#downtimeSubOptionsHtm${idx} button.active`).removeClass('btn-outline-info').addClass('btn-info')
//       // $(`.completeDtButton${idx}`).removeClass('hidden')
//       // var initialData = window.machines[idx].downtimeData
//       // $(`.completeDtButton${idx}`).attr('onclick', `completeDowntime('${initialData.name}',true,'${initialData.startDateTime}',${idx})`)

//     },
//     error: error => {
//       console.log('put initial-pulse update error')
//       if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
//       if (error && error.responseJSON) console.log(error.responseJSON)
//       else if (error && error.responseText) console.log(error.responseText)
//       else console.log({ error })
//     }
//   })
// }
// async function completeDowntime() {
//   event.stopPropagation()
//   var currentDateTime = IST();
//   var downtimeOption = "";
//   if (optionTypeValue != "") {
//     downtimeOption = optionTypeValue;
//   }
//   if (subOptionTypeValue != "") {
//     downtimeOption = subOptionTypeValue;
//   }

//   var activityData = {
//     dataId: "1",
//     type: 'activity',
//     name: selectedDowntime,
//     option: downtimeOption,
//     downTimeTypes: [selectedDowntime],
//     machineId: mID,
//     startDateTime: startTime,
//     endDateTime: currentDateTime.toISOString()
//   };
//   console.log('SwamiactivityData', activityData);
//   // if (submitActivityData) {
//   $.ajax({
//     url: pelUrl + 'activities', //callThisApi,
//     data: JSON.stringify(activityData),
//     type: "POST",
//     headers: { "Authorization": "Bearer " + token },
//     dataType: 'json',
//     contentType: 'application/json',
//     success: function (data) {
//       clearInterval(ghp)
//       localStorage.setItem("machineStartD", "");
//       // console.log('ms', localStorage.getItem("machineStartD"))
//       $(`#timer`).text("00:00:00");
//       $('#subDowntime').empty();
//       $('#subDowntimeTypes').empty();
//       $("#dtWatch").hide();
//       $("#dtButtons").show();
//     },
//     error: function (error) {
//       console.log('activities error', error)
//       if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') {
//         window.location.href = './login.html';
//       }
//       if (error && error.responseJSON) console.log(error.responseJSON)
//       else if (error && error.responseText) console.log(error.responseText)
//       else console.log({ error })
//     }
//   });
//   // } else {
//   //   console.log(idx, window.machines[idx], window.machines[idx].timer)
//   //   clearDowntime(idx)
//   // }
// }
// function logout() {
//   // delete localStorage.aisplopdata
//   localStorage.setItem("Pages", "1");
//   location.href = 'login.html'
// }
// async function myFunctionS() {
//   var machineUrl = getMachines + '?clientId=' + clientId + '&id=' + mID;
//   var machineData = await getCallAPI(machineUrl, token, 'GET');

//   var dtD = {};
//   var dtOpt = {};
//   var dtSubOpt = {};
//   if (machineData && machineData[0] && machineData[0].downtimeData && machineData[0].downtimeData.length != 0) {
//     dtD = machineData[0].downtimeData[machineData[0].downtimeData.length - 1];
//   }
//   if (machineData && machineData[0] && machineData[0].downtimeOptions && machineData[0].downtimeOptions.length != 0) {
//     dtOpt = machineData[0].downtimeOptions[machineData[0].downtimeOptions.length - 1];
//   }
//   if (machineData && machineData[0] && machineData[0].downtimeSubOptions && machineData[0].downtimeSubOptions.length != 0) {
//     dtSubOpt = machineData[0].downtimeSubOptions[machineData[0].downtimeSubOptions.length - 1];
//   }

//   var downTimeId, downTimeType, startDateTime
//   if (dtD) {
//     downTimeId = dtD._id
//     downTimeType = dtD.name
//     startDateTime = dtD.startDateTime
//   } else {
//     downTimeId = undefined
//     downTimeType = undefined
//     startDateTime = undefined
//   }

//   // console.log('GFD', downTimeTypes, downTimeType, $(`#dtReasons${idx} button[dt-type='${downTimeType}']`));
//   // console.log('GFD1', startDateTime, downTimeId, downtimeOption, downtimeSubOption);
//   console.log('SwamiK', dtD, dtOpt, dtSubOpt);

//   if (dtD && dtD.name) {
//     await hideButton(dtD.name, false);
//   }
//   if (dtOpt && dtOpt.name) {
//     await subDttype(dtOpt.name, false);
//   }
//   if (dtSubOpt && dtSubOpt.names && dtSubOpt.names[0]) {
//     await subDtt(dtSubOpt.names[0], false);
//   }
//   if (startDateTime) {
//     startTime = startDateTime;
//     await startCounter(startDateTime)
//   }
//   // if (downTimeType) {
//   //   let confirmed = true
//   //   if (downTimeTypes && downTimeTypes.length) {
//   //     // selectDowntime($(`#dtReasons${idx} button[dt-type='${downTimeTypes[0]}']`), false, confirmed, startDateTime, downTimeId, downtimeOption, downtimeSubOption)
//   //   }

//   //   // selectDowntime($(`#dtReasons${idx} button[dt-type='${downTimeType}']`), false, confirmed, startDateTime, downTimeId, downtimeOption, downtimeSubOption)
//   // }


// }
// async function startCounter(startDateTime) {
//   $('#confirm').hide();
//   $('#back').hide();
//   $('#downtimeConfirm').show();
//   clearInterval(ghp)
//   ghp = setInterval(() => msToHMS(startDateTime), 1000);
//   $('.all').prop('disabled', true);
//   // d-inline btn btn-outline-info px-1
//   // btn btn-outline-info px-1 subtt all
//   // d-inline btn btn-outline-info px-1

// }
// async function showOperatorModal() {
//   $("#operatorModal").modal('show')
// }
// async function updateOperatorTable(ths) {
//   selOperatorId = "none"
//   console.log('$(ths).val()', "1" + $(ths).val());
//   var operator = operators.find(o => o.id == $(ths).val())
//   // console.log('ths', operator);
//   if (operator) {
//     if (operator.aadharNumber) {
//       var desigOprId = ' (XXXX-XXXX-' + ((operator.aadharNumber).toString()).slice(-4) + ')'
//       if (operator.designation) desigOprId = ', ' + operator.designation + ' (XXXX-XXXX-' + ((operator.aadharNumber).toString()).slice(-4) + ')'
//     } else {
//       var desigOprId = ''
//       if (operator.designation) desigOprId = ', ' + operator.designation
//     }
//     selOperatorId = operator.id;
//     $('#select2-selectOperator-container').text(operator.fullName + desigOprId)
//     // $('#operatorName').text(operator.fullName + desigOprId)
//     $("#operatorNameModal").text(operator.fullName + desigOprId)
//     $('#operatorId').text(operator.id);
//     $("#operatorIdModal").text(operator.id)
//     operator.type ? $("#operatorType").text(operator.type) : $("#operatorType").text('Operator')
//     // $("#joining").text(moment(operator.experience[operator.experience.length - 1]["startEmployment"]).format('DD-MM-YYYY'))
//     operator.contact ? $("#contact").text(operator.contact) : $("#contact").text('')
//     $("#avgPerformance").text(operator.avgPerformance)
//     $("#efficiency").text(operator.efficiency)
//   } else {
//     $('#select2-selectOperator-container').text('Select Operator')
//     // $('#operatorName').text('No Operator Selected');
//     $("#operatorNameModal").text('No Operator Selected')
//     $('#operatorId').text('');
//     $("#operatorIdModal").text('')
//     $("#operatorType").text('')
//     $("#joining").text('')
//     $("#contact").text('')
//     $("#avgPerformance").text('')
//     $("#efficiency").text('')
//   }
// }
// async function acceptOperator() {
//   if (selOperatorId && selOperatorId != "") {
//     let now = new Date()
//     now.setSeconds(0); now.setMilliseconds(0);
//     let isoDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
//     let currentDate = isoDateTime.toISOString().substr(0, 11) + '00:00:00.000Z'
//     var operatorData = {
//       "operatorId": selOperatorId,
//       "machineId": mID,
//       "clientId": clientId,
//       "plantId": localStorage.getItem("opPlantId"),
//       "date": currentDate,
//       "dateTime": isoDateTime,
//       "shift": currentShift
//     }

//     $.ajax({
//       url: opmsUrl + 'operator-logs',
//       data: JSON.stringify(operatorData),
//       headers: { "Authorization": "Bearer " + token },
//       type: "POST",
//       dataType: 'json',
//       contentType: 'application/json',
//       success: (data) => {
//         // console.log('machines/update', data)
//         // let idx = $(ths).attr('rel')
//         // $(`.operator-div${idx}`).attr('rel', data.operatorId)

//         if (selOperatorId == 'none') {
//           $(`#operatorName`).text('No Operator Selected');
//           $(`#operatorImage`).attr('src', 'default.gif');
//           selOperatorId = "none";
//         } else {
//           var operator = operators.find(o => o.id == data.operatorId)
//           console.log('operatorData1', operator, operatorData, data);

//           // console.log('operator', operator)
//           if (operator) {
//             $(`#operatorImage`).attr('src', operator.image ? opmsUrl + operator.image.replace('uploads', 'image') : apiUrl + 'image/users/default-profile-image.jpg');

//             if (operator.aadharNumber) {
//               var desigOprId = ' (XXXX-XXXX-' + ((operator.aadharNumber).toString()).slice(-4) + ')'
//               if (operator.designation) desigOprId = ', ' + operator.designation + ' (XXXX-XXXX-' + ((operator.aadharNumber).toString()).slice(-4) + ')'
//             } else {
//               var desigOprId = ''
//               if (operator.designation) desigOprId = ', ' + operator.designation
//             }
//             selOperatorId = operator.id;
//             $(`#operatorName`).text(operator.fullName + desigOprId);
//             // window.machines[idx].operatorId = operator.id

//             // window.machines[idx]._operatorId = operator
//           } else {
//             $(`#operatorName`).text('No Operator Selected');
//             selOperatorId = "none";
//             // window.machines[idx].operatorId = null
//             // window.machines[idx]._operatorId = null
//           }
//         }
//         $("#operatorModal").modal('toggle');
//       },
//       error: (error) => {
//         console.log(error)
//         if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
//       }
//     })
//   } else {
//     // $("#operatorModal").modal('close');
//     $("#operatorModal").modal('toggle');

//   }
// }
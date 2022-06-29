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
  console.log('POP', loginCreds);
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
      localStorage.setItem('clientLogo', response._clientId.logo)
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
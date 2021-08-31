var defaultTab = document.getElementById("defaultOpen");

$(document).ready(function () {
  $("#submit").click(function () {
    if (checkForm())
      send();
    else
      alert('Le formulaire est invalide');
  })
})

function checkForm() {
  var regexEmail = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
  var validEmail = regexEmail.test($("#email").val());
  var password = $("#password").val();
  var validCgu = $("#cgu").is(":checked");

  if (validEmail && validCgu && password.length > 0)
    return true;
  else
    return false;
}

function send() {
  $('#submit').html('Inscription...');

  $.ajax({
    url: "https://demo.soan-solutions.io/test_front/inscription",
    type: "post",
    data: { 
      email: $("#email").val(),
      password: $("#password").val(),
    },
    success: function() {
      $('#submit').html('Succès !');
      $("#submit").prop("disabled", false);
      location.replace("pages/invoices.html");
    },
    error: function() {
      $('#submit').html('Une erreur est survenue.');
      $("#submit").prop("disabled", false);
    }
  });
  $("#submit").prop("disabled", true);
}


function openTab(evt, tab) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tab).style.display = "block";
  if(evt.currentTarget !== undefined){
    evt.currentTarget.className += " active";
  }
}

if (defaultTab) {
  document.getElementById("defaultOpen").click();
}

function payBill() {
  $("#billActive").css({ display: "none" });
  $("#nothingToPay").css({ display: "flex" });
  $("#defaultOpen").css({ display: "none" });
  $("#paidBill").css({ display: "block" });
  document.getElementById("tab2").click();
}

function fetchClientInfos() {
  var name, phone, email

  $.ajax({
    url: 'https://demo.soan-solutions.io/test_front/company/CIKLEA/infos',
    type: "GET",
    dataType: 'json',
    success: function (data) {
        name = data.company.name
        phone = data.company.phoneNumber
        email = data.company.email

        $("#clientName").html(name)
        $("#clientPhone").html(phone)
        $("#clientEmail").html(email)
    }
});
}
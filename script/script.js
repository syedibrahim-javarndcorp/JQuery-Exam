let userData;

$(document).ready(function () {
  // Get the User data from json login details
  $.ajax({
    url: "../data.json",
    dataType: "json",
    type: "get",
    data: {},
    success: function (data) {
      userData = data;
    },
    error: function () {
      alert("Login Failed");
    },
  });
});

// Submit Button
$("#add-btn").click(function () {
  if ($("#email").val() === "") {
    //login validation
    $(".err-email").css("opacity", "1");
    return false;
  } else {
    $(".err-email").css("opacity", "0");
  }
  if ($("#password").val() === "") {
    $(".err-password").css("opacity", "1");
    return false;
  } else {
    $(".err-password").css("opacity", "0");
  }
  //   if login success
  $.map(userData, function (e) {
    if (
      e.email === $("#email").val() &&
      e.password === $("#password").val() &&
      e.status === "active"
    ) {
      sessionStorage.setItem("fname", e.firstname);
      sessionStorage.setItem("lname", e.lastname);
      sessionStorage.setItem("email", e.email);
      sessionStorage.setItem("mobile", e.mobile);
      sessionStorage.setItem("loginName", e.loginName);
      sessionStorage.setItem("city", e.city);
      window.location = "login.html"; // logged in to index.html
    }
  });
});

//Logging out function

$(".logoutb").click(function () {
  if (sessionStorage.length > 0) {
    sessionStorage.clear();
    window.location = "index.html";
  }
});

// restting the input
function resetInput() {
  $("#fname").val("");
  $("#lname").val("");
  $("#emailId").val("");
  $("#mobile").val("");
  $("#city").val("");
}

// search module
$("#search").on("keyup", function () {
  let value = $(this).val().toLowerCase();
  $("#table-body tr").filter(function () {
    let value2 = $(this).toggle($(this).text().toLowerCase());
    value2.indexOf(value) > -1;
  });
});

// New Contact adding
let index = 1;
$("#contact-btn").on("click", function (e) {
    e.preventDefault();
    let fname = $("#fname").val();
    let lname = $("#lname").val();
    let emailId = $("#emailId").val();
    let mobNo = $("#mobile").val();
    let cityname = $("#city").val();
    
    let newArr = [];

    let newObj = {
        firstname : fname,
        lastname : lname,
        emailId : emailId,
        mobile : mobNo,
        city : cityname
    };

    if(fname===""){
        $(".err-fname").css("opacity","1")
        return false
    }
    else{
        $(".err-fname").css("opacity","0")
    }
    if(lname===""){
        $(".err-lname").css("opacity","1")
        return false
    }
    else{
        $(".err-lname").css("opacity","0")
    }
    if(emailId=== ""){
        $(".err-email").css("opacity","1")
        return false
    }else {
        $(".err-email").css("opacity","0")
    }
    if(mobNo === ""){
        $(".err-mobile").css("opacity","1")
        return false
    }
    else{
        $(".err-mobile").css("opacity","0")
    }
    if(cityname === ""){
        $(".err-city").css("opacity","1")
    }else{
        $(".err-city").css("opacity","0")

    }

    newArr.push(newObj)

})

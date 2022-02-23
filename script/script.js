function contacterror() {
  
  alert("User must login for displaying contacts!!");
 
}
function searcherror() {
  
  alert("User must login to search for contacts!!");
 
}

let userData;

$(document).ready(function () {
  //Get user data from Json for Login
  $.ajax({
    url: "../data.json",
    dataType: "json",
    type: "get",
    data: {},
    success: function (data) {
      userData = data;
    },
    error: function () {
      alert("Failed login");
    },
  });

  // Modal button submit
  $("#add-btn").click(function () {
    //login validation
    if ($("#email").val() == "") {
      $(".err-email").css("opacity", "1");
      return false;
    } else {
      $(".err-email").css("opacity", "0");
    }

    if ($("#password").val() == "") {
      $(".err-password").css("opacity", "1");
      return false;
    } else {
      $(".err-password").css("opacity", "0");
    }

    $.map(userData, function (Obj) {
      //if email, password match and status should be active
      if (
        Obj.email === $("#email").val() &&
        Obj.password === $("#password").val() &&
        Obj.status === "active"
      ) {
        sessionStorage.setItem("name", Obj.firstname);
        sessionStorage.setItem("lname", Obj.lastname);
        sessionStorage.setItem("email", Obj.email);
        sessionStorage.setItem("mobile", Obj.mobile);
        sessionStorage.setItem("loginName", Obj.loginName);
        sessionStorage.setItem("role", Obj.role);
        // Redirecting to loggedin index page
        window.location = "login.html";
      }
    });
  });

  // Logout function
  $(".logoutb").click(function () {
    if (sessionStorage.length > 0) {
      sessionStorage.clear();
      window.location = "index.html";
    }
  });

  // Reset function
  function resetInputs() {
    $("#fname").val("");
    $("#lname").val("");
    $("#emailId").val("");
    $("#mobno").val("");
    $("#city").val("");
  }

  //Search function
  $("#search").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#table-body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Adding new contacts
  let index = 1;
  $("#contact-btn").click(function (e) {
    e.preventDefault();
    let fName = $("#fname").val();
    let lName = $("#lname").val();
    let emailId = $("#emailId").val();
    let mobNumber = $("#mobno").val();
    let cityname = $("#city").val();

    let newArr = [];

    let newObj = {
      firstName: fName,
      lastName: lName,
      eMailId: emailId,
      mobileNo: mobNumber,
      cityName: cityname,
    };

    //new contact form validation
    if (fName === "") {
      $(".err-fname").css("opacity", "1");
      return false;
    } else {
      $(".err-fname").css("opacity", "0");
    }
    if (lName === "") {
      $(".err-lname").css("opacity", "1");
      return false;
    } else {
      $(".err-lname").css("opacity", "0");
    }
    if (emailId === "") {
      $(".err-email").css("opacity", "1");
      return false;
    } else {
      $(".err-email").css("opacity", "0");
    }
    if (mobNumber === "") {
      $(".err-mobno").css("opacity", "1");
      return false;
    } else {
      $(".err-mobno").css("opacity", "0");
    }
    if (cityname === "") {
      $(".err-city").css("opacity", "1");
      return false;
    } else {
      $(".err-city").css("opacity", "0");
    }

    newArr.push(newObj);
    createTable(newObj);
    // creating tables
    function createTable(data) {
      resetInputs();
      let table = document.getElementById("table-body");
      let row = "";

      for (var i = 0; i <= newArr.length; i++) {
        row = `<tr id=${index}_index style="background-color: #f0f0f0; border: 1px solid #cccccc">
        <td >${index}</td>
        <td id=${index}firstName>${newArr[i]["firstName"]}</td>
        <td id=${index}lastName>${newArr[i]["lastName"]}</td>
        <td id=${index}mobileNo>${newArr[i]["mobileNo"]}</td>
        <td id=${index}eMailId>${newArr[i]["eMailId"]}</td>
        <td id=${index}cityName>${newArr[i]["cityName"]}</td>
        <td id=${index}_icon><i class="fa fa-edit" onClick="edit(${index});"></i> | &nbsp;&nbsp;<i class="fa fa-window-close fa-lg" onClick="del(${index});"></i></td>
        </tr>`;

        table.innerHTML += row;
        index += 1;
      }
    }
  });
});

// Edit directly in field
function edit(index) {
  if (sessionStorage.getItem("role") === "admin") {
    let x = document.getElementById(index + "_index");
    if (x.contentEditable == "true") {
      x.contentEditable = "false";
    } else {
      x.contentEditable = "true";
    }
  } else {
    alert("User has no Edit access!!");
  }
}

// Delete button
function del(index) {
  if (sessionStorage.getItem("role") === "admin") {
    document.getElementById(index + "_index").style.display = "none";
  } else {
    alert("User has no Delete access!!");
  }
}

//Before/After Login headings
let firstname = sessionStorage.getItem("name");
$(window).on("load", function () {
  if ("name" in sessionStorage) {
    $("#home-heading").html("Welcome" + " " + firstname + "!!!");
  } else {
    $("#home-heading").html("Please login to get access");
  }
});

// $(document).ready(function() {

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyC6IgT34v6Lo0kfCHB4bt2CGf7ZM1elnWY",
    authDomain: "employee-data-management-b1a8d.firebaseapp.com",
    databaseURL: "https://employee-data-management-b1a8d.firebaseio.com",
    projectId: "employee-data-management-b1a8d",
    storageBucket: "employee-data-management-b1a8d.appspot.com",
    messagingSenderId: "689318625433"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $('#addUser').on('click', function(event) {
        event.preventDefault();

        var empName = $('#employeeName').val().trim();
        var empRole = $('#employeeRole').val().trim();
        var empStart = moment($("#employeeStartDate").val().trim(), "MM/DD/YY").format("X");
        var empRate = $('#rate').val().trim();

        var newEmp = {
            name: empName, 
            role: empRole,
            start: empStart,
            rate: empRate,
            dateAdded: Firebase.ServerValue.TIMESTAMP
        };

        database.ref().push(newEmp);

          console.log(newEmp.name);
          console.log(newEmp.role);
          console.log(newEmp.start);
          console.log(newEmp.rate);

          console.log("New Employee Sucessfully Added!");

            // Clears all of the text-boxes
          $("#employeeName").val("");
          $("employeeRole").val("");
          $("#employeeStartDate").val("");
          $("#rate").val("");
        });

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        // console.log(childSnapshot.val());

        var empName = childSnapshot.val().name;
        var empRole = childSnapshot.val().role;
        var empStart = childSnapshot.val().start;       
        var empRate = childSnapshot.val().rate;
        
        var dateAdded = moment(new Date(childSnapshot.val().dateAdded));

        // Convert the start date back to a human time from UNIX
        var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

        var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");

        var empBilled = empMonths * empRate;
        // console.log(empBilled);

        // full list of items to the well
        $("#employeeTable > tbody").append("<tr><td> " + empName + " </td><td> " + empRole + " </td><td> " + empStartPretty + "</td><td>" + empMonths + "</td><td>$" + empRate + " </td><td>" + empBilled + "</td></tr>")


        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code)
    });





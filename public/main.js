


/************PROCESS DATA TO/FROM Client****************************/


var socket = io(); //load socket.io-client and connect to the host that serves the page

window.addEventListener("load", function(){ //when page loads
  if( isMobile.any() ) {
//    alert('Mobile');
    document.addEventListener("touchstart", ReportTouchStart, false);
    document.addEventListener("touchend", ReportTouchEnd, false);
    document.addEventListener("touchmove", TouchMove, false);
  } else {
//    alert('Desktop');
    document.addEventListener("mouseup", ReportMouseUp, false);
    document.addEventListener("mousedown", ReportMouseDown, false);
  }

});


//Update Furman feedback when server changes LED state
socket.on('Furman1', function (data) {
//  console.log('Furman1 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('Furman1').checked = data;
//  console.log('Furman1: '+data.toString());
});


//Update Furman feedback when server changes LED state
socket.on('Furman2', function (data) {
//  console.log('Furman2 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('Furman2').checked = data;
//  console.log('Furman2: '+data.toString());
});



//Update Furman feedback when server changes LED state
socket.on('Furman3', function (data) {
//  console.log('Furman3 function called');
 // console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('Furman3').checked = data;
// console.log('Furman3: '+data.toString());
});



//Update Furman feedback when server changes LED state
socket.on('Furman4', function (data) {
//  console.log('Furman4 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('Furman4').checked = data;
//  console.log('Furman4: '+data.toString());
});


function ReportTouchStart(e) {
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) {
  // Now we know that x is defined, we are good to go.
    if (x === "Furman1") {
 //     console.log("Furman1 toggle");
      socket.emit("Furman1T");  // send Furman button toggle to node.js server
    } else if (x === "Furman2") {
 //     console.log("Furman2 toggle");
      socket.emit("Furman2T");  // send Furman button toggle to node.js server
    } else if (x === "Furman3") {
//      console.log("Furman3 toggle");
      socket.emit("Furman3T");  // send Furman button toggle to node.js server
    } else if (x === "Furman4") {
  //    console.log("Furman4 toggle");
      socket.emit("Furman4T");  // send Furman button toggle to node.js server
    }
  }

  if (e.target.id === "Furman1M") {
    socket.emit("Furman1", 1);
    document.getElementById('Furman1').checked = 1;
  } else if (e.target.id === "Furman2M") {
 //   console.log("Furman2 pressed");
    socket.emit("Furman2", 1);
    document.getElementById('Furman2').checked = 1;
  } else if (e.target.id === "Furman3M") {
  //  console.log("Furman3 pressed");
    socket.emit("Furman3", 1);
    document.getElementById('Furman3').checked = 1;
  } else if (e.target.id === "Furman4M") {
//    console.log("Furman4 pressed");
    socket.emit("Furman4", 1);
    document.getElementById('Furman4M').checked = 1;
  }
}

function ReportTouchEnd(e) {
  if (e.target.id === "Furman1M") {
    socket.emit("Furman1", 0);
    document.getElementById('Furman1').checked = 0;
  } else if (e.target.id === "Furman2M") {
    socket.emit("Furman2", 0);
    document.getElementById('Furman2').checked = 0;
  } else if (e.target.id === "Furman3M") {
    socket.emit("Furman3", 0);
    document.getElementById('Furman3').checked = 0;
  } else if (e.target.id === "Furman4M") {
    socket.emit("Furman4", 0);
    document.getElementById('Furman4').checked = 0;
  }
}

function ReportMouseDown(e) {

  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) {
  // Now we know that x is defined, we are good to go.
    if (x === "Furman1") {
 //     console.log("Furman1 toggle");
      socket.emit("Furman1T");  // send Furman button toggle to node.js server
    } else if (x === "Furman2") {
//     console.log("Furman2 toggle");
      socket.emit("Furman2T");  // send Furman button toggle to node.js server
    } else if (x === "Furman3") {
 //     console.log("Furman3 toggle");
      socket.emit("Furman3T");  // send Furman button toggle to node.js server
    } else if (x === "Furman4") {
 //     console.log("Furman4 toggle");
      socket.emit("Furman4T");  // send Furman button toggle to node.js server
    }
  }

  if (e.target.id === "Furman1M") {
 //   console.log("Furman1 pressed");
    socket.emit("Furman1", 1);
    document.getElementById('Furman1').checked = 1;
  } else if (e.target.id === "Furman2M") {
//    console.log("Furman2 pressed");
    socket.emit("Furman2", 1);
    document.getElementById('Furman2').checked = 1;
  } else if (e.target.id === "Furman3M") {
//    console.log("Furman3 pressed");
    socket.emit("Furman3", 1);
    document.getElementById('Furman3').checked = 1;
  } else if (e.target.id === "Furman4M") {
//    console.log("Furman4 pressed");
    socket.emit("Furman4", 1);
  }
}


function ReportMouseUp(e) {
  if (e.target.id === "Furman1M") {
    socket.emit("Furman1", 0);
    document.getElementById('Furman1').checked = 0;
  } else if (e.target.id === "Furman2M") {
    socket.emit("Furman2", 0);
    document.getElementById('Furman2').checked = 0;
  } else if (e.target.id === "Furman3M") {
    socket.emit("Furman3", 0);
    document.getElementById('Furman3').checked = 0;
  } else if (e.target.id === "Furman4M") {
    socket.emit("Furman4", 0);
    document.getElementById('Furman4').checked = 0;
  }
}

function TouchMove(e) {

}



/** function to sense if device is a mobile device ***/
// Reference: https://stackoverflow.com/questions/1138473/detecting-a-mobile-browser

var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

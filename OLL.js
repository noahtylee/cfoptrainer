const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const openModalButtonsStats = document.querySelectorAll('[data-modal-target-stats]')
const closeModalButtonsStats = document.querySelectorAll('[data-close-button-stats]')
const overlayStats = document.getElementById('overlayStats')
var checkedBoxes = [];
var count = 0;
var timeStats = [];

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.cases.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.cases')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    checkedBoxes = getCheckedBoxes("casesChosen");
    count = 0;
    changeInfo(checkedBoxes);
    onOrOff = 'reset';
    startStop();
}

openModalButtonsStats.forEach(button => {
  button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTargetStats)
      openModalStats(modal)
  })
})

overlayStats.addEventListener('click', () => {
  const modals = document.querySelectorAll('.stats.active')
  modals.forEach(modal => {
      closeModalStats(modal)
  })
})

closeModalButtonsStats.forEach(button => {
  button.addEventListener('click', () => {
      const modal = button.closest('.stats')
      closeModalStats(modal)
  })
})

function openModalStats(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlayStats.classList.add('active')
}

function closeModalStats(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlayStats.classList.remove('active')
}


// Pass the checkbox name to the function
function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i]);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }
  
function changeInfo(boxesCheck) {
  if (boxesCheck == null) {
    document.getElementById('centralDisplay').style.display = 'none';
    document.getElementById('tempCentral').style.display = 'block';
  } else if (boxesCheck.length > 0) {
    document.getElementById('centralDisplay').style.display = 'block';
    document.getElementById('tempCentral').style.display = 'none';
    if (boxesCheck[count] == document.getElementById('caseF2l1')) {
      document.getElementById("scramble").innerHTML = "Scramble: F' U2 L' U' L2 F L'";
      document.getElementById("mainImage").src="images/casef2l1.png";
      document.getElementById("solutionsF2l").innerHTML = "Solution: (R U' R') U (R U2 R') U (R U' R')";
    } else if (boxesCheck[count] == document.getElementById('caseF2l2')) {
      document.getElementById("scramble").innerHTML = "Scramble: R U' R2 U R";
      document.getElementById("mainImage").src="images/casef2l2.png";
      document.getElementById("solutionsF2l").innerHTML = "Solution: R' U' R2 U R'";
    } else if (boxesCheck[count] == document.getElementById('caseF2l3')) {
      document.getElementById("scramble").innerHTML = "Scramble: R U' R2 U R";
      document.getElementById("mainImage").src="images/casef2l3.png";
      document.getElementById("solutionsF2l").innerHTML = "Solution: R' U' R2 U R'";
    }
  }
}
function changeNextCase() {
  if (document.getElementById('nextCaseF2l').checked) {
    document.getElementById('nextCase').style.display = 'none';
  } else {
    document.getElementById('nextCase').style.display = 'block';
  }
}
function showSolution() {
  if (document.getElementById('showSolutionsF2l').checked) {
    document.getElementById('solutionsF2l').style.display = 'block';
  } else {
    document.getElementById('solutionsF2l').style.display = 'none';
  }
}
function moveNextCase() {
  if (document.getElementById('randomizeF2l').checked) {
    count = Math.floor(Math.random() * checkedBoxes.length);
    changeInfo(checkedBoxes);
  } else if (count == (checkedBoxes.length - 1)) {
    count = 0;
    changeInfo(checkedBoxes);
  } else {
    count++;
    changeInfo(checkedBoxes);
  }
  onOrOff = 'reset';
  startStop();
}
function best() {
  var bestMin = timeStats[0][0];
  var bestSec = timeStats[0][1];
  var bestMil = timeStats[0][2];
  for (var i = 0; i < timeStats.length; i++) {
    if (timeStats[i][0] < bestMin){
      bestMin = timeStats[i][0];
    }
  }
  for (var i = 0; i < timeStats.length; i++) {
    if (timeStats[i][0] == bestMin) {
      if (timeStats[i][1] < bestSec) {
        bestSec = timeStats[i][1];
      }
    }
  }
  for (var i = 0; i < timeStats.length; i++) {
    if (timeStats[i][0] == bestMin) {
      if (timeStats[i][1] == bestSec) {
        if (timeStats[i][2] < bestMil) {
          bestMil = timeStats[i][2];
        }
      }
    }
  }
  if (bestMin.toString().length == 1) {
    bestMin = '0' + bestMin;
  }
  if (bestSec.toString().length == 1) {
    bestSec = '0' + bestSec;
  }
  if (bestMil.toString().length == 1) {
    bestMil = '0' + bestMil;
  }
  document.getElementById('best').innerHTML = 'Best: ' + bestMin + ':' + bestSec + ':' + bestMil;
}
function worst() {
  var worstMin = 0;
  var worstSec = 0;
  var worstMil = 0;
  for (var i = 0; i < timeStats.length; i++) {
    if (timeStats[i][0] > worstMin){
      worstMin = timeStats[i][0];
    }
  }
  for (var i = 0; i < timeStats.length; i++) {
    if (timeStats[i][0] == worstMin) {
      if (timeStats[i][1] > worstSec) {
        worstSec = timeStats[i][1];
      }
    }
  }
  for (var i = 0; i < timeStats.length; i++) {
    if (timeStats[i][0] == worstMin) {
      if (timeStats[i][1] == worstSec) {
        if (timeStats[i][2] > worstMil) {
          worstMil = timeStats[i][2];
        }
      }
    }
  }
  if (worstMin.toString().length == 1) {
    worstMin = '0' + worstMin;
  }
  if (worstSec.toString().length == 1) {
    worstSec = '0' + worstSec;
  }
  if (worstMil.toString().length == 1) {
    worstMil = '0' + worstMil;
  }
  document.getElementById('worst').innerHTML = 'Worst: ' + worstMin + ':' + worstSec + ':' + worstMil;
}
function average() {
  var temp = 0;
  for (var i = 0; i < timeStats.length; i++) {
    temp += (timeStats[i][0] * 6000);
    temp += (timeStats[i][1] * 100);
    temp += (timeStats[i][2]);
  }
  temp = temp / timeStats.length;
  var tempMin = Math.floor(temp / 6000);
  temp -= tempMin * 6000;
  var tempSec = Math.floor(temp / 100);
  temp -= tempSec * 100;
  temp = Math.round(temp);
  if (tempMin.toString().length == 1) {
    tempMin = '0' + tempMin;
  }
  if (tempSec.toString().length == 1) {
    tempSec = '0' + tempSec;
  }
  if (temp.toString().length == 1) {
    temp = '0' + temp;
  }
  document.getElementById('average').innerHTML = 'Average: ' + tempMin + ':' + tempSec + ':' + temp;
}
function median() {
  var tempMin = 0;
  var tempSec = 0;
  var tempMil = 0;
  if (timeStats.length % 2 == 0) {
    tempMin += timeStats[timeStats.length / 2][0];
    tempSec += timeStats[timeStats.length / 2][1];
    tempMil += timeStats[timeStats.length / 2][2];
    tempMin += timeStats[(timeStats.length / 2) - 1][0];
    tempSec += timeStats[(timeStats.length / 2) - 1][1];
    tempMil += timeStats[(timeStats.length / 2) - 1][2];
    tempMin = Math.round(tempMin / 2);
    tempSec = Math.round(tempSec / 2);
    tempMil = Math.round(tempMil / 2);
    document.getElementById('median').innerHTML = 'Median: ' + tempMin + ':' + tempSec + ':' + tempMil;
  } else {

  }
}
function statistics(mil, sec, min) {
  var newTime = [parseInt(min), parseInt(sec), parseInt(mil)];
  timeStats.push(newTime);
  average();
  best();
  worst();
  median();
}
function times(mil, sec, min) {
  var appendage = min + ":" + sec + ":" + mil;
  var time = document.createElement('p');
  time.innerHTML = appendage;
  var trTemp = document.createElement('tr');
  var thTemp1 = document.createElement('th');
  var thTemp2 = document.createElement('th');
  var btnTemp = document.createElement('button');
  btnTemp.className = 'closeTime';
  btnTemp.onclick = function() {
    document.getElementById('times').removeChild(this.parentElement.parentElement);
  };
  btnTemp.innerHTML = '&times;';
  thTemp1.style.fontSize = '3vh';
  btnTemp.style.fontSize = '4vh';
  btnTemp.style.border = 'none';
  btnTemp.style.background = 'none';
  thTemp1.appendChild(time);
  thTemp2.appendChild(btnTemp);
  trTemp.appendChild(thTemp1);
  trTemp.appendChild(thTemp2);
  document.getElementById('times').insertBefore(trTemp, document.getElementById('times').firstChild);
}

  //Define vars to hold time values
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  //Define vars to hold "display" value
  let displaySeconds = 0;
  let displayMinutes = 0;
  let displayHours = 0;

  //Define var to hold setInterval() function
  let interval = null;

  //Define var to hold stopwatch status
  let onOrOff = "stopped";

  //Stopwatch function (logic to determine when to increment next value, etc.)
  function stopWatch() {

  seconds++;

  //Logic to determine when to increment next value
  if (seconds / 100 === 1) {
    seconds = 0;
    minutes++;

    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }

  }

  //If seconds/minutes/hours are only one digit, add a leading 0 to the value
  if (seconds < 10) {
    displaySeconds = "0" + seconds.toString();
  } else {
    displaySeconds = seconds;
  }

  if (minutes < 10) {
    displayMinutes = "0" + minutes.toString();
  } else {
    displayMinutes = minutes;
  }

  if (hours < 10) {
    displayHours = "0" + hours.toString();
  } else {
    displayHours = hours;
  }

  //Display updated time values to user
  document.getElementById("mil").innerHTML = displaySeconds;
  document.getElementById("sec").innerHTML = displayMinutes;
  document.getElementById("min").innerHTML = displayHours;
}

function startStop() {

  if (onOrOff === "stopped") {

    //Start the stopwatch (by calling the setInterval() function)
    interval = window.setInterval(stopWatch, 10);
    onOrOff = "started";

  } else if (onOrOff === 'started') {
    window.clearInterval(interval);
    onOrOff = "reset";
    times(document.getElementById('mil').innerHTML, document.getElementById('sec').innerHTML, document.getElementById('min').innerHTML);
    statistics(document.getElementById('mil').innerHTML, document.getElementById('sec').innerHTML, document.getElementById('min').innerHTML);
  } else {
    document.getElementById("mil").innerHTML = '00';
    document.getElementById("sec").innerHTML = '00';
    document.getElementById("min").innerHTML = '00';
    seconds = 0;
    minutes = 0;
    hours = 0;
    onOrOff = 'stopped';
    window.clearInterval(interval);
    if (document.getElementById('randomizeF2l').checked) {
      count = Math.floor(Math.random() * checkedBoxes.length);
      changeInfo(checkedBoxes);
    } else if (document.getElementById('nextCaseF2l').checked) {
      if (count == (checkedBoxes.length - 1)) {
        count = 0;
        changeInfo(checkedBoxes);
      } else {
        count++;
        changeInfo(checkedBoxes);
      }
    }
  }
}
document.body.onkeyup = function(e){ if(e.keyCode == 32){ 
  if (checkedBoxes.length > 0) {
    document.getElementById('mil').style.color = "black";
    document.getElementById('sec').style.color = "black";
    document.getElementById('min').style.color = "black";
    document.getElementById('colon').style.color = "black";
    document.getElementById('colon1').style.color = "black";
    startStop();
  }
}};
document.body.onkeydown = function(e){ if(e.keyCode == 32){ 
  if (checkedBoxes.length > 0) {
    if (onOrOff == "stopped") {
      document.getElementById('mil').style.color = "#00ffb7";
      document.getElementById('sec').style.color = "#00ffb7";
      document.getElementById('min').style.color = "#00ffb7";
      document.getElementById('colon').style.color = "#00ffb7";
      document.getElementById('colon1').style.color = "#00ffb7";
    }
  }
}};
cases.addEventListener("transitionend", function(){
  cases.active.style.transform = '';
}, false);
  //document.getElementById("mainImage").src="../template/save.png";


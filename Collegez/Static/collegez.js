/*
 *  collegez.js
 *  Anton Nagy, Julia Weingart
 *
 *  Javascript for Collegez website.
 */

var collegeData;

function getInput(){
    var searchText = document.getElementById('search_bar').value;
    getCollege(searchText);
}

function getCollege(item) {
    var results = document.getElementById('map');
    results.innerHTML = '';
    var textBody = ''

    if (item == 'list') {
      for (key in collegeData) {
        textBody += key + '<br>';
      }
    }
    else {
      textBody += 'College: ' + item + '<br>';
      textBody += 'Region: ' + collegeData[item]['Region'] + '<br>';
      textBody += 'Type of School: ' + collegeData[item]['College Type'] + '<br>';
      if (collegeData[item]['College Type 2'] != "") {
        textBody += 'Secondary Type of School: ' + collegeData[item]['College Type 2'] + '<br>';
      }
      textBody += 'Tuition: $' + collegeData[item]['Tuition'] + '<br>';
      textBody += 'Salary: $' + collegeData[item]['Salary'];
    }

    var moreText = '';
    var numYears = collegeData[item]['Tuition']*4/collegeData[item]['Salary'];
    var avgSalaryInRegion = getAverageSalaryByRegion(collegeData[item]['Region']);
    var avgTuitionInRegion = getAverageTuitionByRegion(collegeData[item]['Region']);
    var percentAboveTuition = collegeData[item]['Tuition']/avgTuitionInRegion-1;
    var percentAboveSalary = collegeData[item]['Salary']/avgSalaryInRegion-1;
    moreText += '<p> Your salary will pay off your tuition in ' + numYears.toFixed(2) + ' years.</p>';
    moreText += '<p> The average salary in your region is ' + avgSalaryInRegion.toFixed(2) + '.</p>';
    if (percentAboveSalary > 0) {
      moreText += '<p> Your salary is ' + percentAboveSalary.toFixed(2) + '% above the average. </p>';
    }
    else {
      moreText += '<p> Your salary is ' + (percentAboveSalary*-1).toFixed(2) + '% below the average. </p>';
    }
    moreText += '<p> The average tuition in your region is ' + avgTuitionInRegion.toFixed(2) + '.</p>';
    if (percentAboveTuition > 0) {
      moreText += '<p> Your tuition is ' + percentAboveTuition.toFixed(2) + '% above the average. </p>';
    }
    else {
      moreText += '<p> Your tuition is ' + (percentAboveTuition*-1).toFixed(2) + '% below the average. </p>';
    }

    document.getElementById('search_results').innerHTML = textBody + moreText;

}

function loadCollegeData(collegeInfo) {
  collegeData = collegeInfo;
}

function getRegion(item) {
    var results = document.getElementById('map');
    results.innerHTML = '';
    var regionStats = "Region: " + item + "<br>";
    var collegeList = "Colleges: <br>";

    collegeTypes = [];
    for (key in collegeData) {
      if (collegeData[key]['Region'] == item) {
        collegeTypes.push(collegeData[key]['College Type'])
        if (collegeData[key]['College Type'] == "") {
          collegeTypes.push(collegeData[key]['College Type 2'])
        }
        collegeList += '<p id=\"links\" onclick=\"getCollege(\'' + key + '\')\"> '+ key + '</p>';
      }
    }
    regionStats += '<li id=\"Statistics\"> Statistics: ';
    regionStats += '<ul> Average Tuition: $ ' + getAverageTuitionByRegion(item) + '</ul>';
    regionStats += '<ul> Average Salary: $ ' + getAverageSalaryByRegion(item) + '</ul>';
    regionStats += '</li>'

    document.getElementById('search_results').innerHTML += regionStats + '<br>' +collegeList;

}

function showGraph() {
    var results = document.getElementById('map');
    results.innerHTML = '';
    var regionStats = "Graphs: <br>";
    var graphs = "<img src=\"../static/images/tuitionSalary.jpg\" width=\"500\" height=\"300\"> <br>";
    graphs += "<img src=\"../static/images/tuitionRegion.jpg\" width=\"500\" height=\"400\">";
    graphs += "<img src=\"../static/images/salaryRegion.jpg\" width=\"500\" height=\"400\"> + <br>";
    graphs += "<img src=\"../static/images/SalaryCollegeType.jpg\" width=\"500\" height=\"400\">";
    graphs += "<img src=\"../static/images/TuitionCollegeType.jpg\" width=\"500\" height=\"400\"> + <br>";

    document.getElementById('search_results').innerHTML = graphs;

}

function getAverageSalaryByRegion(region) {
  var salaries = [];
  var salarySum = 0;

  for (key in collegeData) {
    if (collegeData[key]['Region'] == region) {
      salaries.push(collegeData[key]['Salary']);
      salarySum += collegeData[key]['Salary'];
    }
  }
  return Math.round(salarySum/salaries.length);
}

function getAverageTuitionByRegion(region) {
  var tuitions = [];
  var tuitionSum = 0;

  for (key in collegeData) {
    if (collegeData[key]['Region'] == region) {
      tuitions.push(collegeData[key]['Tuition']);
      tuitionSum += collegeData[key]['Tuition'];
    }
  }
  return Math.round(tuitionSum/tuitions.length);
}

 /*
  *  When the user clicks help button, an alert shows up explaining what they can search for
  */
function helpAlert() {
    alert(`Search for a college by name. Click the regions in the map to display region-specific information and list the colleges in that region (that we have data on)`)
}

/*
 *  The user can press enter in addition to clicking the search bar
 */
function onKeyPress(keyEvent) {
    if(keyEvent.keyCode == 13) {
        getInput();
    }
}

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
    document.getElementById('search_results').innerHTML = textBody;

}

function loadCollegeData(collegeInfo) {
  collegeData = collegeInfo;
}

function getRegion(item) {
    var results = document.getElementById('map');
    results.innerHTML = '';
    var regionStats = "Region: " + item + "<br>";
    var collegeList = "Colleges: <br>";

    tuitions = [];
    tuitionSum = 0;
    salaries = [];
    salarySum = 0;

    collegeTypes = [];
    for (key in collegeData) {
      if (collegeData[key]['Region'] == item) {
        tuitions.push(collegeData[key]['Tuition']);
        tuitionSum += collegeData[key]['Tuition'];
        salaries.push(collegeData[key]['Salary']);
        salarySum += collegeData[key]['Salary'];
        collegeTypes.push(collegeData[key]['College Type'])
        if (collegeData[key]['College Type'] == "") {
          collegeTypes.push(collegeData[key]['College Type 2'])
        }
        collegeList += '<p id=\"links\" onclick=\"getCollege(\'' + key + '\')\"> '+ key + '</p>';
        //collegeList += '<a href=\"/\" onclick = \"getCollege(\'' + key + '\')\"> '+ key + '</a>' + '<br>';
      }
    }
    regionStats += '<li id=\"Statistics\"> Statistics: ';
    regionStats += '<ul> Average Tuition: $ ' + Math.round(tuitionSum/tuitions.length) + '</ul>';
    regionStats += '<ul> Average Salary: $ ' + Math.round(salarySum/salaries.length) + '</ul>';
    regionStats += '</li>'

    document.getElementById('search_results').innerHTML += regionStats + '<br>' +collegeList;

}

 /*
  *  When the user clicks help button, an alert shows up explaining what they can search for
  */
function helpAlert() {
    alert(`Search for a college by name. Search "list" to see what colleges there is data for. You can also click on regions to get a list of colleges in that region and region specific statistics.`)
}

/*
 *  The user can press enter in addition to clicking the search bar
 */
function onKeyPress(keyEvent) {
    if(keyEvent.keyCode == 13) {
        getInput();
    }
}

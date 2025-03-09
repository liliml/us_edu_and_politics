// for nav bar
// Get the element with the class "icon"
let icon = document.getElementsByClassName("icon")[0];

// Add an event listener for the 'click' event on the icon element
icon.addEventListener('click', responsive_control);

// Function to control the responsiveness of the navigation bar
function responsive_control() {
  // Get the element with the id "myTopnav"
  let x = document.getElementById("myTopnav");

  // Check if the class name of the element is "topnav"
  if (x.className === "topnav") {
    // If it is, add the "responsive" class to the element
    x.className += " responsive";
  } else {
    // If it's not, remove the "responsive" class from the element
    x.className = "topnav";
  }
}
var slider = document.getElementById("yearSlider");
var selectedYear = document.getElementById("yearLabel");

slider.oninput = function() {
  selectedYear.innerHTML = this.value;
  geojsonFetch(this.value);
}

async function geojsonFetch(year) { 
      let response = await fetch(`assets/${year}_data.geojson`);
      let stateData = await response.json();
      let features = stateData.features;

      updateTable(features);
}

function updateTable(features) {
    let categories = {
        "less9th": [],
        "nohs": [],
        "hsdip": [],
        "collno": [],
        "asso": [],
        "bach": [],
        "mast": []
    };

    // Loop through each edu level for each year
    features.forEach(feature => {
        let properties = feature.properties;

        // Collect values from geojson
        if (properties) {
            categories["less9th"].push(properties["Less9Gra"] || 0);
            categories["nohs"].push(properties["9_12NoDip"] || 0);
            categories["hsdip"].push(properties["HighGrad"] || 0);
            categories["collno"].push(properties["Col_NoDeg"] || 0);
            categories["asso"].push(properties["AssocDeg"] || 0);
            categories["bach"].push(properties["BachDeg"] || 0);
            categories["mast"].push(properties["Grad_Prof"] || 0);
        }
    });

    Object.keys(categories).forEach(key => {
        let values = categories[key];

        let min = Math.min(...values);
        let max = Math.max(...values);
        let avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

        let minCell = document.getElementById(`${key}-min`);
        let maxCell = document.getElementById(`${key}-max`);
        let avgCell = document.getElementById(`${key}-avg`);

        if (minCell && maxCell && avgCell) {
            minCell.innerText = min;
            maxCell.innerText = max;
            avgCell.innerText = avg;
      }
    });
}
document.addEventListener("DOMContentLoaded", function () {
  geojsonFetch(2010);
});
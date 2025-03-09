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


mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zZS0xNjgiLCJhIjoiY202aWYxY3lsMDdxdjJpcHJoaHlmZzdiNiJ9.3wUanYJCI6409InuRs9e7A';

// Close the welcome panel when the button is clicked
document.getElementById('close-welcome').addEventListener('click', function () {
    document.getElementById('welcome-panel').style.display = 'none';
});


//lynnie
// const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023];
// let currentYear = 2010; 
//



const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/millzm/cm80orv0g006p01sjhiyxdi37', 
        zoom: 3, // starting zoom
        center: [-100, 40] // starting center
    }
);




var slider = document.getElementById("yearSlider");
var selectedYear = document.getElementById("yearLabel");
var selectedColumn = 'HighGrad'; // Default column




// Update the map data based on the slider value
slider.oninput = function() {
    //this.value is the "year", the value that "slider" has in line above
    if (this.value >= 2020) {
        //force to go to next year so there is not duplicate 2021s due to 14 slider slots and only 13 datasets
        //parseInt casts this.value to an int (was a string before). To do this also had to set max to 2022 in the html to avoid it saying 2024
        selectedYear.innerHTML = parseInt(this.value) + 1;
        geojsonFetch(parseInt(this.value) + 1);

    } else {
        selectedYear.innerHTML = this.value;
        geojsonFetch(this.value);
    }
}


function openCity(evt, columnName) {
    selectedColumn = columnName;
    geojsonFetch(slider.value);
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
}

async function geojsonFetch(year) {
    if (year != 2020) {
        let response = await fetch(`assets/${year}_data.geojson`);
        let stateData = await response.json();
        document.getElementById('president').innerHTML = stateData.features[0].properties.President; 
        // // source: https://stackoverflow.com/questions/52097840/how-to-overwrite-text-in-p-tag-using-javascript
        document.getElementById('polparty').innerHTML = stateData.features[0].properties.Pol_Party;
    
        //ORGINAL
        // const blocks = [
        //     11,
        //     21,
        //     31,
        //     41,
        //     51
        // ];
    
        let blocks = [];
        if (selectedColumn == "Est25Over") {
           
        
            //legend section, added .0 to fix legend precision
            blocks = [
                1.0,
                1000001.0,
                2000001.0,
                3000001.0,
                4000001.0,
                5000001.0
            ];
        } else {
            //legend section, added .0 to fix legend precision
            blocks = [
                1.0,
                11.0,
                21.0,
                31.0,
                41.0,
                51.0
            ];
        }
    
        //Still not working changing colors
        let legendcolors = [
            '#f1eef6',
            '#bdc9e1',
            '#74a9cf',
            '#2b8cbe',
            '#045a8d'
        ];
    
    
        if (stateData.features[0].properties.Color === 'Red') {
            legendcolors = [
                '#fee5d9',
                '#fcae91',
                '#fb6a4a',
                '#de2d26',
                '#a50f15'
            ];
        }
    
    
        if (map.getSource('stateData')) {
            map.getSource('stateData').setData(stateData);
        } else {
            //ORIGINAL DON'T TOUCH
            // map.on('load', function loadingData() {
            //     map.addSource('stateData', {
            //         type: 'geojson',
            //         data: stateData
            //     });
    
            //     map.addLayer({
            //         'id': 'stateData-layer',
            //         'type': 'fill',
            //         'source': 'stateData',
            //         'paint': {
            //             'fill-color': [
            //                 'interpolate',
            //                 ['linear'],
            //                 ['get', selectedColumn],
            //                 blocks[0], legendcolors[0],
            //                 blocks[1], legendcolors[1],
            //                 blocks[2], legendcolors[2],
            //                 blocks[3], legendcolors[3],
            //                 blocks[4], legendcolors[4]
            //             ],
            //             'fill-outline-color': '#BBBBBB',
            //             'fill-opacity': 0.7,
            //         }
            //     });
            // });
            if (selectedColumn == "Est25Over") {
                map.on('load', function loadingData() {
                    map.addSource('stateData', {
                        type: 'geojson',
                        data: stateData
                    });
        
                    map.addLayer({
                        'id': 'stateData-layer',
                        'type': 'fill',
                        'source': 'stateData',
                        'paint': {
                            'fill-color': [
                                'interpolate',
                                ['linear'],
                                ['get', Est25Over],
                                blocks[0], legendcolors[0],
                                blocks[1], legendcolors[1],
                                blocks[2], legendcolors[2],
                                blocks[3], legendcolors[3],
                                blocks[4], legendcolors[4]
                            ],
                            'fill-outline-color': '#BBBBBB',
                            'fill-opacity': 0.7,
                        }
                    });
                });
            } else {
                map.on('load', function loadingData() {
                    map.addSource('stateData', {
                        type: 'geojson',
                        data: stateData
                    });
        
                    map.addLayer({
                        'id': 'stateData-layer',
                        'type': 'fill',
                        'source': 'stateData',
                        'paint': {
                            'fill-color': [
                                'interpolate',
                                ['linear'],
                                ['get', selectedColumn],
                                blocks[0], legendcolors[0],
                                blocks[1], legendcolors[1],
                                blocks[2], legendcolors[2],
                                blocks[3], legendcolors[3],
                                blocks[4], legendcolors[4]
                            ],
                            'fill-outline-color': '#BBBBBB',
                            'fill-opacity': 0.7,
                        }
                    });
                });    
            }
        }
    
        //legend section
        // const layers = [
        //     '0-10',
        //     '11-20',
        //     '21-30',
        //     '31-40',
        //     '41-50'
        // ];
    
        
        ///ORGINAL DON'T TOUCH!!!
        let layers = [];
        if (selectedColumn == "Est25Over") {
           
            console.log("test")
            //legend section
            layers = [
                '0-1,000,000',
                '1,000,001-2,000,000',
                '2,000,001-3,000,000',
                '3,000,001-4,000,000',
                '4,000,001-5,000,000+'
            ];
        } else {
            //legend section
            layers = [
                '0-10',
                '11-20',
                '21-30',
                '31-40',
                '41-50'
            ];
        }
    
        //BELOW DOES NOT WORK, NEITHER DOES ABOVE
        // let layers = [
        //         '0-10',
        //         '11-20',
        //         '21-30',
        //         '31-40',
        //         '41-50'];
        // if (selectedColumn == "Summary") {
        //     //legend section
        //     layers = [
        //         '0-1,000,000',
        //         '1,000,001-2,000,000',
        //         '2,000,001-3,000,000',
        //         '3,000,001-4,000,000',
        //         '4,000,001-5,000,000+'
        //     ];
        // } 
    
    
    
    
        // const colors = [
        //     '#FFEDA070',
        //     '#FED97670',
        //     '#FEB24C70',
        //     '#FD8D3C70',
        //     '#FC4E2A70',
        //     '#E31A1C70',
        //     '#BD002670',
        //     '#80002670'
        // ];
        
    
        const legend = document.getElementById('legend');
        
        if (selectedColumn == "Less9Gra") {        
            legend.innerHTML = "<b>% estimated of people 25 and over who have less then 9th grade education<br></b><br><br>";
        } else if (selectedColumn == "9_12NoDip") {
            legend.innerHTML = "<b>% estimated of people 25 and over who have high school education but no diploma<br></b><br><br>";  
        } else if (selectedColumn == "HighGrad") {
            legend.innerHTML = "<b>% estimated of people 25 and over who only have high school diplomas<br></b><br><br>";
        } else if (selectedColumn == "Col_NoDeg") {
            legend.innerHTML = "<b>% estimated of people 25 and over who went to college but have no degree<br></b><br><br>";
        } else if (selectedColumn == "AssocDeg") {
            legend.innerHTML = "<b>% estimated of people 25 and over who only have an associates degree<br></b><br><br>";
        } else if (selectedColumn == "BachDeg") {
            legend.innerHTML = "<b>% estimated of people 25 and over who have a bachlor's degree<br></b><br><br>";
        } else if (selectedColumn == "Grad_Prof") {
            legend.innerHTML = "<b>% estimated of people 25 and over who have professional or graduate degrees<br></b><br><br>";
        } else {
            legend.innerHTML = "<b>State Population. Hover over a state for additional statistics<br></b><br><br>";
        }
        
        //ORGINAL IN LINE BELOW!!!
        //legend.innerHTML = "<b>Population Density<br>(people/sq.mi.)</b><br><br>";  
    
    
    
    
    
    
    
    
    
    
    
    
    
        //ORGINAL DON'T TOUCH!!!
        layers.forEach((layer, i) => {
            const color = legendcolors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;
    
            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });
    
    
        // map.setPaintProperty('stateData-layer', 'fill-color', [
        //     'step',
        //     ['get', selectedColumn],
        //     blocks[0], legendcolors[0],
        //     blocks[1], legendcolors[1],
        //     blocks[2], legendcolors[2],
        //     blocks[3], legendcolors[3],
        //     blocks[4], legendcolors[4]
        // ]);
    
    
        //ORGINAL DON'T TOUCH!!!
        map.setPaintProperty('stateData-layer', 'fill-color', [
            'interpolate',
            ['linear'],
            ['get', selectedColumn],
            blocks[0], legendcolors[0],
            blocks[1], legendcolors[1],
            blocks[2], legendcolors[2],
            blocks[3], legendcolors[3],
            blocks[4], legendcolors[4]
        ]);
    
        //NOTE: The code below breaks the summary page as it does not give correct color and breaks 
        // it such that the info for the state shown is not correct and does not show all info for the summary page
        //********TODO, GET THE CODE BELOW TO WORK, SEE NOTE ABOVE!!!!
        // if (selectedColumn == "Summary") {
        //     map.setPaintProperty('stateData-layer', 'fill-color', [
        //         'interpolate',
        //         ['linear'],
        //         ['get', Est25Over],
        //         blocks[0], legendcolors[0],
        //         blocks[1], legendcolors[1],
        //         blocks[2], legendcolors[2],
        //         blocks[3], legendcolors[3],
        //         blocks[4], legendcolors[4]
        //     ]);
        // } else {
        //     map.setPaintProperty('stateData-layer', 'fill-color', [
        //         'interpolate',
        //         ['linear'],
        //         ['get', selectedColumn],
        //         blocks[0], legendcolors[0],
        //         blocks[1], legendcolors[1],
        //         blocks[2], legendcolors[2],
        //         blocks[3], legendcolors[3],
        //         blocks[4], legendcolors[4]
        //     ]);
        // }
    
    
    
        let test = "9_12NoDip" //testing this to see if replacing .columnname with this works, tested and it does not?
        // let BachDeg = " percent estimated of people 25 and over who have a bachlor's degree"
        // let Grad_Prof = " percent estimated of people 25 and over who have professional or graduate degrees"
        if (selectedColumn == "Less9Gra") {        
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties.Less9Gra}</strong>% estimated of people 25 and over who have less then 9th grade education</em></p>
                    ` :
                    `<p>Hover over a state!</p>`;
            });
        } else if (selectedColumn == "9_12NoDip") {
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties['9_12NoDip']}</strong>% estimated of people 25 and over who have high school education but no diploma</em></p>
                    ` :
                    `<p>Hover over a state!</p>`;
            });    
        } else if (selectedColumn == "HighGrad") {
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties.HighGrad}</strong>% estimated of people 25 and over who only have high school diplomas</em></p>
                    ` :
                    `<p>Hover over a state!</p>`;
            });
        } else if (selectedColumn == "Col_NoDeg") {
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties.Col_NoDeg}</strong>% estimated of people 25 and over who went to college but have no degree</em></p>
                    ` :
                    `<p>Hover over a state!</p>`;
            });    
        } else if (selectedColumn == "AssocDeg") {
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties.AssocDeg}</strong>% estimated of people 25 and over who only have an associates degree</em></p>
                    ` :
                    `<p>Hover over a state!</p>`;
            });       
        } else if (selectedColumn == "BachDeg") {
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties.BachDeg}</strong>% estimated of people 25 and over who have a bachlor's degree</em></p>
                    ` :
                    `<p>Hover over a state!</p>`;
            });    
        } else if (selectedColumn == "Grad_Prof") {
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties.Grad_Prof}</strong>% estimated of people 25 and over who have professional or graduate degrees</em></p>
                    ` :
                    `<p>Hover over a state!</p>`;
            });
        } else {
            // this branch is for the "Summary" tab
            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['stateData-layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.name}</h3>
                    <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
                    <p><strong><em>${state[0].properties.Less9Gra}</strong>% estimated of people 25 and over who have less then 9th grade education</em></p>
                    <p><strong><em>${state[0].properties['9_12NoDip']}</strong>% estimated of people 25 and over who have high school education but no diploma</em></p>
                    <p><strong><em>${state[0].properties.HighGrad}</strong>% estimated of people 25 and over who only have high school diplomas</em></p>
                    <p><strong><em>${state[0].properties.Col_NoDeg}</strong>% estimated of people 25 and over who went to college but have no degree</em></p>
                    <p><strong><em>${state[0].properties.AssocDeg}</strong>% estimated of people 25 and over who only have an associates degree</em></p>
                    <p><strong><em>${state[0].properties.BachDeg}</strong>% estimated of people 25 and over who have a bachlor's degree</em></p>
                    <p><strong><em>${state[0].properties.Grad_Prof}</strong>% estimated of people 25 and over who have professional or graduate degrees</em></p>
                    ` :
                    // "name" (index of 1)
                    // "Est25Over"
                    // "Less9Gra" 
                    // "9-12NoDip" (has properties index of 7 due to zero based indexing, doing this due to using - in the name, which is a special character!!!!)
                    //"HighGrad", 
                    // "Col_NoDeg"
                    // "AssocDeg"
                    // "BachDeg" 
                    //"Grad_Prof"
                    `<p>Hover over a state!</p>`;
            });
        }
    } 
}


// Initial load
geojsonFetch(slider.value);
// js file to go with index.html file
mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        zoom: 3.8, // starting zoom
        center: [-99.92677322202407, 39.51185858540333] // starting center
    }
);

var slider = document.getElementById("dataRange");
var selectedYear = document.getElementById("selectedYear");
var selectedColumn = 'HighGrad'; // Default column

// Update the map data based on the slider value
slider.oninput = function() {
    selectedYear.innerHTML = this.value;
    geojsonFetch(this.value);
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
    let response = await fetch(`assets/${year}_data.geojson`);
    let stateData = await response.json();

    if (map.getSource('stateData')) {
        map.getSource('stateData').setData(stateData);
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
                        'step',
                        ['get', selectedColumn],
                        '#ffffd4',   // stop_output_0
                        20,          // stop_input_0
                        '#fee391',   // stop_output_1
                        22,          // stop_input_1
                        '#fec44f',   // stop_output_2
                        24,          // stop_input_2 
                        '#fe9929',   // stop_output_3
                        26,         // stop_input_3
                        '#ec7014',   // stop_output_4
                        28,         // stop_input_4
                        '#cc4c02'
                    ],
                    'fill-outline-color': '#BBBBBB',
                    'fill-opacity': 0.7,
                }
            });
        });
    }

    map.setPaintProperty('stateData-layer', 'fill-color', [
        'step',
        ['get', selectedColumn],
        '#ffffd4',   // stop_output_0
        20,          // stop_input_0
        '#fee391',   // stop_output_1
        22,          // stop_input_1
        '#fec44f',   // stop_output_2
        24,          // stop_input_2 
        '#fe9929',   // stop_output_3
        26,         // stop_input_3
        '#ec7014',   // stop_output_4
        28,         // stop_input_4
        '#cc4c02'
    ]);

    map.on('mousemove', ({point}) => {
        const state = map.queryRenderedFeatures(point, {
            layers: ['stateData-layer']
        });
        document.getElementById('text-description').innerHTML = state.length ?
            `<h3>${state[0].properties.name}</h3><p><strong><em>${state[0].properties[selectedColumn]}%</strong> Population Over 25</em></p>` :
            `<p>Hover over a state!</p>`;
    });
}

// Initial load
geojsonFetch(slider.value);
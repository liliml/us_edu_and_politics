mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zZS0xNjgiLCJhIjoiY202aWYxY3lsMDdxdjJpcHJoaHlmZzdiNiJ9.3wUanYJCI6409InuRs9e7A';

//lynnie
const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023];
let currentYear = 2010;  // AI
//

const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        zoom: 3, // starting zoom
        center: [-100, 40] // starting center
    }
);

async function geojsonFetch() { 
    let response = await fetch('assets/2010_data.geojson');
    let tenData = await response.json();

    map.on('load', function loadingData() {
        // add layer
        // add legend
        map.addSource('tenData', {
            type: 'geojson',
            data: tenData
        });
        // console.log("got here");
        
        map.addLayer({
            'id': 'tenData-layer',
            'type': 'fill',
            'source': 'tenData',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'Est25Over'],
                    '#FFEDA0',   // stop_output_0
                    10,          // stop_input_0
                    '#FED976',   // stop_output_1
                    20,          // stop_input_1
                    '#FEB24C',   // stop_output_2
                    50,          // stop_input_2
                    '#FD8D3C',   // stop_output_3
                    100,         // stop_input_3
                    '#FC4E2A',   // stop_output_4
                    200,         // stop_input_4
                    '#E31A1C',   // stop_output_5
                    500,         // stop_input_5
                    '#BD0026',   // stop_output_6
                    1000,        // stop_input_6
                    "#800026"    // stop_output_7
                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.7
            }
        });
    });

    
    const layers = [
        '0-9',
        '10-19',
        '20-49',
        '50-99',
        '100-199',
        '200-499',
        '500-999',
        '1000 and more'
    ];
    const colors = [
        '#FFEDA070',
        '#FED97670',
        '#FEB24C70',
        '#FD8D3C70',
        '#FC4E2A70',
        '#E31A1C70',
        '#BD002670',
        '#80002670'
    ];
    
    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Population Density<br>(people/sq.mi.)</b><br><br>";
    
    layers.forEach((layer, i) => {
        const color = colors[i];
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
    
    map.on('mousemove', ({point}) => {
        const state = map.queryRenderedFeatures(point, {
            layers: ['tenData-layer']
        });
        document.getElementById('text-description').innerHTML = state.length ?
            `<h3>${state[0].properties.name}</h3>
            <p><strong><em>${state[0].properties.Est25Over}</strong> estimated people 25 and over</em></p>
            <p><strong><em>${state[0].properties.Less9Gra}</strong> percent estimated of people 25 and over who have less then 9th grade education</em></p>
            <p><strong><em>${state[0].properties[[[7]]]}</strong> percent estimated of people 25 and over who have high school education but no diploma</em></p>
            <p><strong><em>${state[0].properties.HighGrad}</strong> percent estimated of people 25 and over who only have high school diplomas</em></p>
            <p><strong><em>${state[0].properties.Col_NoDeg}</strong> percent estimated of people 25 and over who went to college but have no degree</em></p>
            <p><strong><em>${state[0].properties.AssocDeg}</strong> percent estimated of people 25 and over who only have an associates degree</em></p>
            <p><strong><em>${state[0].properties.BachDeg}</strong> percent estimated of people 25 and over who have a bachlor's degree</em></p>
            <p><strong><em>${state[0].properties.Grad_Prof}</strong> percent estimated of people 25 and over who have professional or graduate degrees</em></p>` :
            
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

    //lynnie
    document.getElementById('yearSlider').addEventListener('input', (event) => {
        const year = parseInt(event.target.value);
        document.getElementById('yearLabel').textContent = year;

        years.forEach(y => {
            map.setLayoutProperty(`educationLayer_${y}`, 'visibility', y === year ? 'visible' : 'none');
        });
    });
    //
}

geojsonFetch();
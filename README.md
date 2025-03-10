# us_edu_and_politics

## **Project Title: US Education and Politics 2010-2023 (excluding 2020)**

## **Project Goal and Target Audience:**
The target audience for our project is two groups. One of the audiences is the general public, to create better awareness of the success or failure of the US education system and where in the US it is lacking. The second audience our project is targeted towards is teachers in training or during education courses for those teachers. The purpose of the application is to help teachers in training gain a better understanding of the United States’ education system, its flaws, and where the education needs to be improved, as well as where they could potentially provide help to students in the future. It shows the prevalence of higher education and how necessary it has become in recent years. We will continue to see how future administrations with varying views on education spending will affect the graduation rates of future students.

## **Project Description:**
This project is about US political parties and their effect over the years on the education acquisition rate of various ranges, including those lower than 9th grade, those who pass high school, and different college degrees. The project includes a few choropleth maps with layers corresponding to less than 9th grade, no high school, high school, college no degree, associate's, bachelor's, and master's or higher. This data is also an estimation from the US Census Bureau for individuals over 25. We chose to use estimations since the actual data for this age group wasn’t consistent or sufficient. Each of these pages or “layers” can be switched using a navigation bar at the top of the screen. A second navigation bar above the layer navigation bar can be used to navigate between an introduction with additional information about the project, navigate to and from the map, and view a conclusion with summary statistics for each year of the data. On the map page, a slider can be used that ranges from 2010 to 2023, exempting 2020 due to the pandemic, to display data for that year. The map was also colored according to the political party of the president for the selected year (democrat or republican). The key on the map in the lower left of the screen shows educational attainment levels per state for the “layer” or page selected, which is reflected on the choropleth map of the United States. 

## **Application URL:** http://liliml.github.io/us_edu_and_politics/index.html

## **Project Screenshots:** 
![](/image/image-1.png)

Education levels by state during 2010, a democratic year, which is why the color scheme is blue, and gives a little extra information about Washington in the top right.

![](/image/image.png)

Education acquisition levels by state under Donald Trump’s first presidency in 2017. Since it was a republican year, the color scheme is red, and there is a pop-up on the right with more information about Washington. The legend on the lower left also shows the population of the state being hovered over, in this case Washington, while the info on the right shows a summary of all the tabs for the selected state.

## **Data Source:** 
Census data on Educational attainment https://data.census.gov/table?q=educational%20attainment%20by%20state 

## **Main functions:** TODO, WAIT FOR GARRETT

## **Favicon:**
Our favicon is designed to represent US educational attainment statistics and politics as represented by the bar graph, the flag background and coloring, and the graduation cap and tassel.  
![](/image/image-2.png)

## **Applied Libraries:** 
We did not use an applied libraries such as mapbox gl js or and for web services we used Mapbox for our basemap and github.

## **Mapbox Basemap Style Link:** https://api.mapbox.com/styles/v1/millzm/cm80orv0g006p01sjhiyxdi37.html?title=copy&access_token=pk.eyJ1IjoibWlsbHptIiwiYSI6ImNtN2U3bDFvcDA1eG4yeW44MXgzY3VjM28ifQ.7u7kF2MNuacxZKJ7uFqjTA&zoomwheel=true&fresh=true#11/40.73/-74 

## Acknowledgments: 
One of our data sources is the US Census Bureau, which gave us data for the years 2010-2023, except for 2020. We also got data from IndexMundi, which is a data aggregation site that produces charts, statistics, and maps. In addition, we got inspiration from projects like Kyle Walker, who made a dot density map of the US by county about education levels. We also got inspiration from a public project that showed education attainment from 2010-2014.
- https://www.census.gov/library/visualizations/interactive/acs-percentage-bachelors-degree-2015-2019.html
- https://sitek94.github.io/d3-choropleth-map/
- https://personal.tcu.edu/kylewalker/maps/education/colorsafe/#8.76/37.5829/-122.3656 
- https://www.indexmundi.com/facts/united-states/quick-facts/all-states/percent-of-people-25-years-and-over-with-bachelors-degree-or-higher#map 

## **AI Usage:** TODO, PUT PROMPTS HERE, GARRATT IF HAVE ANY PROMPTS PUT THEM HERE
- Intro prompt (chat gpt): "I have a project. I am going to give you a proposal, and I need you to make an introduction which incorporates what it says and is 3.5 paragraphs long."
- FaviCon Prompt (ChatGPT): "Make a favicon related to Educational attainment in US"

## Sources Referenced: 
- For welcome panel: [Geog 328 github project template 2](https://github.com/jakobzhao/geog328/blob/main/project/template2/index.html)
- For how to use innerHTML: https://stackoverflow.com/questions/52097840/how-to-overwrite-text-in-p-tag-using-javascript 
- For favicons:
    - https://www.w3schools.com/html/html_favicon.asp  
    - https://stackoverflow.com/questions/74737479/can-favicon-just-accept-png-or-jpg-file-type-please 
- Tutorials referenced as temples: 
	- https://docs.mapbox.com/help/tutorials/show-changes-over-time/?step=7
    - https://docs.mapbox.com/help/tutorials/building-a-store-locator/?step=8

## Project Inspiration: 
- Percentage of Population Aged 25 Years and Over With a Bachelor’s Degree or Higher: 2015-2019: https://www.census.gov/library/visualizations/interactive/acs-percentage-bachelors-degree-2015-2019.html
- Educational Attainment in America is an interactive dot-density map of the US population aged 25 and over by educational attainment: https://personal.tcu.edu/kylewalker/maps/education/colorsafe/#8.76/37.5829/-122.3656 
- Choropleth Map showing data about Education Attainment in United States for years 2010-2014: https://sitek94.github.io/d3-choropleth-map/
- Choropleth map showing educational attainment for people over 25 and is percentage of bachelor’s degree or higher by state: https://www.indexmundi.com/facts/united-states/quick-facts/all-states/percent-of-people-25-years-and-over-with-bachelors-degree-or-higher#map 


// creating function for plot initialization. 




function init() {
    // code that runs once (only on page load or refresh)
    d3.json("samples.json").then(function (jsonData) {
        let data = jsonData;
        // console.log(data)
            
        //Capturing the id, for dropdown menus
        let dataNames = data.names;
        let dropDownMenu = d3.select("#selDataset");
    
        dataNames.forEach(function (name) {
          dropDownMenu.append("option").text(name).property("value", name);
        });

        // using first sample (id 940)  from the data for initial plot
        let testSubject = data.samples.filter((val) => val.id == '940');
        // console.log(testSubject);
        //taking the first array for sample info
        let result = testSubject[0];
         console.log(result)

        let ids = result.otu_ids;
        let values = result.sample_values;
        let labels = result.otu_labels;
        // console.log(ids)
       

    
    });

    // this checks that our initial function runs.
    console.log("The Init() function ran")
    

    // create dropdown/select


    // run functions to generate plots
    createScatter('940')
    createBar('940')
    createSummary('940')

};

// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
    // code that updates graphics
    // one way is to recall each function
    createScatter(newID)
    createBar(newID)
    createSummary(newID)

}

function createScatter(id){
    // code that makes scatter plot at id='bubble'
    d3.json("samples.json").then(function (jsonData) {
        let data = jsonData;
        console.log(data)
            
        //Capturing the id, for dropdown menus
        let dataNames = data.names;
        let dropDownMenu = d3.select("#selDataset");
    
        dataNames.forEach(function (name) {
          dropDownMenu.append("option").text(name).property("value", name);
        });

        // using first sample (id 940)  from the data for initial plot
        let testSubject = data.samples.filter((val) => val.id == id);
        // console.log(testSubject);
        //taking the first array for sample info
        let result = testSubject[0];
        // console.log(result)

        let ids = result.otu_ids;
        let values = result.sample_values;
        let labels = result.otu_labels;

        let bubble_data = [
            {
                y: values,
                x: ids,
                text: labels,                
                mode: "markers",
                
                marker: {
                    size: values,
                    color: ids
                }
            }
        ];
        let Layout = {
            title: "Bubble chart of Otus Distribution"
           };

        Plotly.newPlot("bubble", bubble_data, Layout);
       

    
    });
    

    
    

    // checking to see if function is running
    console.log(`This function generates scatter plot of ${id} `)
}

function createBar(id){
    // code that makes bar chart at id='bar'
    d3.json("samples.json").then(function (jsonData) {
        let data = jsonData;
        console.log(data)
            
        //Capturing the id, for dropdown menus
        let dataNames = data.names;
        let dropDownMenu = d3.select("#selDataset");
    
        dataNames.forEach(function (name) {
          dropDownMenu.append("option").text(name).property("value", name);
        });

        // using first sample (id 940)  from the data for initial plot
        let testSubject = data.samples.filter((val) => val.id == id);
        // console.log(testSubject);
        //taking the first array for sample info
        let result = testSubject[0];
        // console.log(result)

        let ids = result.otu_ids;
        let values = result.sample_values;
        let labels = result.otu_labels;

        let bar_data = [
            {
                x: values.slice(0,10),
                y: ids.slice(0,10).map(otuID => `OTU No ${otuID}`),
                text: labels.slice(0,10),                
                type: "bar",
                orientation: 'h'
            }
        ];
        let barLayout = {
            title: "Top 10 Bacteria Cultures identified"
           };

        Plotly.newPlot("bar", bar_data, barLayout);
       

    
    });
    

    
    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)

}

function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    d3.json("samples.json").then(function (jsonData) {
        let data = jsonData;
        console.log(data)
            
        //Capturing the id, for dropdown menus
        let dataNames = data.names;
        let dropDownMenu = d3.select("#selDataset");
    
        dataNames.forEach(function (name) {
          dropDownMenu.append("option").text(name).property("value", name);
        });

        // using first sample (id 940)  from the data for initial metadata
        let testSubject = data.metadata.filter((val) => val.id == id);
        // console.log(testSubject);
        //taking the first value of the element
        let result = testSubject[0];
        // console.log(result)
        let panel = d3.select("#sample-metadata");

        // entering hte keys and values for selected id into the panel as element
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`)});
              
       
    
    });
    // checking to see if function is running
    console.log(`This function generates summary info of ${id} `)
}


// function called, runs init instructions
// runs only on load and refresh of browser page
init()
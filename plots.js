// Reading the json file with d3

d3.json("../data/samples.json").then((bellyData) => {
    window.bellyData = bellyData;
    console.log(bellyData);
    var data = bellyData;

    // Add IDs to the DropDown menu
    var idList = data.names;
    for (i = 0; i < idList.length; i++) {
        selectBox = d3.select("#selDataset");
        selectBox.append("option").text(idList[i]);
    }

    // Set up default plot
    updatePlots(0)

    // Function to update plot
    function updatePlots(index) {

        // Set up arrays for horizontal bar chart & gauge chart
        var sampleSubjectOTUs = data.samples[index].otu_ids;
        console.log(sampleSubjectOTUs);
        var sampleSubjectFreq = data.samples[index].sample_values;
        var otuLabels = data.samples[index].otu_labels;

        var washFrequency = data.metadata[+index].wfreq;
        console.log(washFrequency);


        // Populate Demographic Data card
        var demoKeys = Object.keys(data.metadata[index]);
        var demoValues = Object.values(data.metadata[index]);
        var demographicData = d3.select("#sample-metadata");

        // Clear demographic Data
        demographicData.html("");

        for (var i = 0; i < demoKeys.length; i++) {
            demographicData.append("p").text(`${demoKeys[i]}: ${demoValues[i]}`);
        };

        //Slice and Reverse data for horizontal bar chart
        var topTenOTUs = sampleSubjectOTUs.slice(0, 10).reverse();
        var topTenFreq = sampleSubjectFreq.slice(0, 10).reverse();
        var topTenToolTips = data.samples[0].otu_labels.slice(0, 10).reverse();
        var topTenLabels = topTenOTUs.map((otu => "OTU" + otu));
        var reversedLabels = topTenLabels.reverse();


        //Set up trace 1
        var trace1 = {
            type: 'bar',
            x: topTenFreq,
            y: reversedLabels,
            name: "",
            orientation: 'h',
            text: topTenToolTips

        };


        // Data
        var barData = [trace1];

        // Apply Layout
        var layout = {
            title: "Top Ten OTUs",
            margin: {
                l: 75,
                r: 75,
                t: 75,
                b: 50
            }
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", barData, layout);

        //Set up trace 2
        trace2 = {
                x: sampleSubjectOTUs,
                y: sampleSubjectFreq,
                text: otuLabels,
                mode: "markers",
                marker: {
                    color: sampleSubjectOTUs,
                    opacity: [1, 0.8, 0.6, 0.4],
                    size: sampleSubjectFreq
                }
            }
            //Data for Bubble Chart
        var bubbleData = [trace2];

        //Appply Layout
        var layout = {
                title: "OTU Frequency",
                showlegend: false,
                height: 600,
                width: 930
            }
            // Render the plot to the div tag with id "bubble-plot"
        Plotly.newPlot("bubble", bubbleData, layout)


        //----------------------Gauge chart------------ //

        var trace3 = [{
            domain: { x: [0, 1], y: [0, 1] },
            type: "indicator",
            mode: "gauge+number",
            value: washFrequency,
            title: { text: "BellyButton Washes Per Week" },
            gauge: {
                axis: { range: [0, 9], tickwidth: 0.5, tickcolor: "black" },
                bar: { color: "#669999" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "transparent",
                steps: [
                    { range: [0, 1], color: "#fff" },
                    { range: [1, 2], color: "#33ffad" },
                    { range: [2, 3], color: "#4dffb8" },
                    { range: [3, 4], color: "#66ffc2" },
                    { range: [4, 5], color: "#99ffd6" },
                    { range: [5, 6], color: "#80ffcc" },
                    { range: [6, 7], color: "b3ffe0" },
                    { range: [7, 8], color: "ccffeb" },
                    { range: [8, 9], color: "#e6fff5" }
                ],
                threshold: {
                    line: { color: "purple", width: 7 },
                    thickness: .75,
                    value: washFrequency
                }
            }
        }];

        gaugeData = trace3;

        var layout = {
            width: 600,
            height: 500,
            margin: { t: 0, b: 0 }
        };
        Plotly.newPlot("gauge", gaugeData, layout);

    }
    // On button click, call refreshData()
    d3.selectAll("#selDataset").on("change", refreshData);

    function refreshData() {
        var dropDownMenu = d3.select("#selDataset");
        // Assign the value of the DropDown menu option to a variable
        var peopleID = dropDownMenu.property("value");
        console.log(peopleID);
        // Initialize an empty array for the people´s Data
        console.log(data);

        for (var i = 0; i < data.names.length; i++) {
            if (peopleID === data.names[i]) {
                updatePlots(i);
                return
            }
        }
    }
});
// Reading the json file with d3
d3.json("data/samples.json").then((bellyData) => {
    window.bellyData = bellyData;
    console.log(bellyData);
    var data = bellyData;

    // Add IDs to the DropDown menu
    // var idList = data.names;
    // for (i = 0; i < idList.length; i++) {
    //     selectBox = d3.select("#selDataset");
    //     selectBox = append("option").text(idList[i]);

    // }

});


Plotly.newPlot('myDiv', data);
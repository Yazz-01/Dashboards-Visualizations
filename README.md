# Plot.ly - Interactive Dashboards 

![Image first page](https://github.com/Yazz-01/Dashboards-Visualizations/blob/main/Images/bancteria_port.png)

* * Belly Button Biodiversity

This is an interactive dashboard to explore the [Belly Button Biodiversity dataset](https://github.com/Yazz-01/Dashboards-Visualizations/blob/main/samples.json), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Please click on this link https://yazz-01.github.io/Dashboards-Visualizations/ to play with the interactive dashboard!!



## Step 1: Plotly

1. Reading the `samples.json` with the D3 library.

2. Creating a horizontal bar chart with a dropdown menu displaying the top 10 OTUs found in that individual.

Therefore, the following variables were performed:

* `sample_values` as the values for the bar chart.

* `otu_ids` as the labels for the bar chart.

* `otu_labels` as the hovertext for the chart.


3. Creating a Bubble chart that displays each sample.

* `otu_ids` for the x values.

* `sample_values` for the y values.

* `sample_values` for the marker size.

* `otu_ids` for the marker colors.

* `otu_labels` for the text values.


![dashboard_image](https://github.com/Yazz-01/Dashboards-Visualizations/blob/main/Images/dash2.png)


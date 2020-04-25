var options = d3.select("#selDataset");

function init_sheet(patient_id)
{ 

d3.json("samples.json",function(data)
{   
for(var j = 0; j < data.samples.length; j++){
    // console.log(patient_id)
    if(data.samples[j].id == patient_id){
    var new_patient = data.samples[j];
    break
    }
}
        // console.log(new_patient); 
    // Adding the input values to the dropdown on the HTML page
  
    data.samples.forEach(function(data){
        options
        .append("option")
        .attr("value",data.id)
        .text(data.id);
    })
   
   
    // Define variables for use in horizontal bar chart
    var otu_ids = new_patient.otu_ids;
    
    var otu_renamed = [];
    for(var i = 0;i< otu_ids.length;i++){
        otu_renamed.push("OTU " + otu_ids[i].toString());
        // console.log(otu_ids[i]);
    }
    
    var otu_labels = new_patient.otu_labels;
    var sample_values = new_patient.sample_values;

    // Create Horizontal Bar Chart (Initial Drawing)
    var trace1 = 
    {
        x: sample_values.slice(0,10),
        y: otu_renamed.slice(0,10),
        name: `Bacteria Count - Test Subject ${patient_id}`,
        orientation: 'h',
        marker: {
          color: 'rgba(55,128,191,0.6)',
          width: 1
        },
        text: otu_labels.slice(0,10),
        type: 'bar'
    };
    var data1 = [trace1];

    var layout = {
    title: `Bacteria Count - Test Subject ${patient_id}`,
    barmode: 'stack'
};

Plotly.newPlot('bar', data1, layout);

// Bubble Chart Time
var trace3 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values
    }
  };
  
  var data2 = [trace3];
  
  var layout2 = {
    title: `Bacteria Profile - Test Subject ${patient_id}`,
    showlegend: false,
    height: 600,
    width: 1300,
    xaxis: {
        title: {
          text: 'OTU ID',
          }}
    };
  
  Plotly.newPlot('bubble', data2, layout2);

// Populate dashboard w/ patient data

var new_index = data.names.indexOf(String(patient_id));
var pat_dat = d3.select("#sample-metadata");
pat_dat.html(`Patient ID: ${patient_id} <br>
            Ethnicity: ${data.metadata[new_index].ethnicity} <br>
            Gender: ${data.metadata[new_index].gender} <br>
            Age: ${data.metadata[new_index].age} <br>
            Location: ${data.metadata[new_index].location} <br>
            BB Type: ${data.metadata[new_index].bbtype} <br>
            WW Frequency: ${data.metadata[new_index].wfreq}`);
})
}





function run_sheet(patient_id){
    d3.json("samples.json",function(data)
{   
for(var k = 0; k < data.samples.length; k++){
    // console.log(patient_id)
    if(data.samples[k].id == patient_id){
    new_patient = data.samples[k];
    break
    }
}
otu_ids = new_patient.otu_ids;
otu_renamed = [];
for(var i = 0;i< otu_ids.length;i++){
    otu_renamed.push("OTU " + otu_ids[i].toString());
    // console.log(otu_ids[i]);
}
otu_labels = new_patient.otu_labels;
sample_values = new_patient.sample_values;

// Create Horizontal Bar Chart (update)
trace1 = 
{
    x: sample_values.slice(0,10),
    y: otu_renamed.slice(0,10),
    name: `Bacteria Count - Test Subject ${patient_id}`,
    orientation: 'h',
    marker: {
      color: 'rgba(55,128,191,0.6)',
      width: 1
    },
    text: otu_labels.slice(0,10),
    type: 'bar'
};

data1 = [trace1]

layout = {
title: `Bacteria Count - Test Subject ${patient_id}`,
barmode: 'stack'
};

Plotly.newPlot('bar',data1,layout);

// Bubble Chart Time
trace3 = {
x: otu_ids,
y: sample_values,
text: otu_labels,
mode: 'markers',
marker: {
  color: otu_ids,
  size: sample_values
}
};

data2 = [trace3];

layout2 = {
title: `Bacteria Profile - Test Subject ${patient_id}`,
showlegend: false,
height: 600,
width: 1300,
xaxis: {
    title: {
      text: 'OTU ID',
      }}
};

Plotly.newPlot('bubble', data2, layout2);

// Populate dashboard w/ patient data

var new_index = data.names.indexOf(String(patient_id));
var pat_dat = d3.select("#sample-metadata");
pat_dat.html("");
pat_dat.html(`Patient ID: ${patient_id} <br>
            Ethnicity: ${data.metadata[new_index].ethnicity} <br>
            Gender: ${data.metadata[new_index].gender} <br>
            Age: ${data.metadata[new_index].age} <br>
            Location: ${data.metadata[new_index].location} <br>
            BB Type: ${data.metadata[new_index].bbtype} <br>
            WW Frequency: ${data.metadata[new_index].wfreq}`);
})

}
init_sheet(940);
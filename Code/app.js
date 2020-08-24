function buildPlot(sample) {
    d3.json('data/samples.json').then(data => {
        const samples = data.samples;
        const sampleData = samples.filter(item => item.id == sample);
        const sampleId = sampleData[0].id;
        const sampleOtuIds = sampleData[0].otu_ids;
        const sampleValues = sampleData[0].sample_values;
        const genus = sampleData[0].otu_labels[5];
        console.log(genus);
        const genusGenus = genus.split(';');
        const finalGenus = genusGenus[5]
        console.log(`${sampleOtuIds[0]}: ${finalGenus}`)
        const labelLabel = (`${sampleOtuIds[0]}: ${finalGenus}`);
        const topTenOtu = (sampleOtuIds.slice(0, 10)).reverse();
        const topOtuGroup = topTenOtu.map(d => d);
        console.log(`Top 10 IDs: ${topOtuGroup}`)
        const topValues = (sampleValues).slice(0, 10);
        console.log(`Top 10 Values: ${topValues}`)

        const trace = {
            x: sampleValues,
            y: labelLabel,
            text: topValues,
            marker: {
                color: 'blue'
            },
            type: 'bar',
            orientation: 'h'
        };

        const datax = [trace];

        const layout = {
            title: 'Top 10 Bacteria - Selected Subject',
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }

        };
        Plotly.newPlot("bar1", datax, layout);
    });
};





// Build initial funtion to handle drop down selection
function init() {
    const dropDown = d3.select('#selDataset');
    d3.json('data/samples.json').then((samples) => {
        const subjectID = samples.names;
        subjectID.forEach((number) => {
            dropDown.append('option').text(number).property('value', number.id);
        });
        const selection = subjectID[0];
        console.log('Initial Dropdown Menu Success') // Check functionality
        buildPlot(selection);
    });
};

function optionChanged(sample) {
    buildPlot(sample);
  }

init();
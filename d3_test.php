<!DOCTYPE html>
<meta charset="utf-8">
<style>

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 960px;
  height: 500px;
  position: relative;
}

svg {
    width: 100%;
    height: 100%;
}

path.slice{
    stroke-width:2px;
}

polyline{
    opacity: .3;
    stroke: black;
    stroke-width: 2px;
    fill: none;
}

.labelValue
{
    font-size: 60%;
    opacity: .5;
    
}

.toolTip {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    position: absolute;
    display: none;
    width: auto;
    height: auto;
    background: none repeat scroll 0 0 white;
    border: 0 none;
    border-radius: 8px 8px 8px 8px;
    box-shadow: -3px 3px 15px #888888;
    color: black;
    font: 12px sans-serif;
    padding: 5px;
    text-align: center;
}
text {
  font: 12px sans-serif;
}
</style>
<body>
<form>
<label><input type="radio" name="dataset" id="dataset" value="total" checked> Total</label>
<label><input type="radio" name="dataset" id="dataset" value="option1"> Option 1</label>
<label><input type="radio" name="dataset" id="dataset" value="option2"> Option 2</label>
</form>

<script src="http://d3js.org/d3.v3.min.js"></script>
<script>


d3.select("input[value=\"total\"]").property("checked", true);

var svg = d3.select("body")
    .append("svg")
    .append("g")

svg.append("g")
    .attr("class", "slices");
svg.append("g")
    .attr("class", "labelName");
svg.append("g")
    .attr("class", "labelValue");
svg.append("g")
    .attr("class", "lines");

var width = 500,
    height = 200,
    radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d.total;
    });

var arc = d3.svg.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

var legendRectSize = (radius * 0.05);
var legendSpacing = radius * 0.02;


var div = d3.select("body").append("div").attr("class", "toolTip");

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
    .range(colorRange.range());


datasetTotal = [
          {
            source_id: "unleaded_petrol",
            total: 328.7944737
          },
          {
            source_id: "natural_gas",
            total: 177.16014
          },
          {
            source_id: "air_conditioners",
            total: 18.369
          },
          {
            source_id: "electricity",
            total: 4521.876768
          },
          {
            source_id: "air_travel",
            total: 1162.403957
          },
          {
            source_id: "waste_to_landfill",
            total: 136.6196
          }
        ];

datasetOption1 = [
        {source_id:"Category 1", total:22}, 
        {source_id:"Category 2", total:33}, 
        {source_id:"Category 3", total:4},
        {source_id:"Category 4", total:15},
        {source_id:"Category 5", total:36},
        {source_id:"Category 6", total:0}
        ];

datasetOption2 = [
        {source_id:"Category 1", total:10}, 
        {source_id:"Category 2", total:20}, 
        {source_id:"Category 3", total:30},
        {source_id:"Category 4", total:5},
        {source_id:"Category 5", total:12},
        {source_id:"Category 6", total:23}
        ];

change(datasetTotal);


d3.selectAll("input")
    .on("change", selectDataset);
    
function selectDataset()
{
    var value = this.value;
    if (value == "total")
    {
        change(datasetTotal);
    }
    else if (value == "option1")
    {
        change(datasetOption1);
    }
    else if (value == "option2")
    {
        change(datasetOption2);
    }
}

function change(data) {

    /* ------- PIE SLICES -------*/
    var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(data), function(d){ return d.data.source_id });

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.source_id); })
        .attr("class", "slice");

    slice
        .transition().duration(1000)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        })
    slice
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html((d.data.source_id)+"<br>"+(d.data.total)+"%");
        });
    slice
        .on("mouseout", function(d){
            div.style("display", "none");
        });

    slice.exit()
        .remove();

    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * color.domain().length / 2;
            var horz = -3 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; });

    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labelName").selectAll("text")
        .data(pie(data), function(d){ return d.data.source_id });

    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {
            return (d.data.source_id+": "+d.data.total+"%");
        });

    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text
        .transition().duration(1000)
        .attrTween("transform", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate("+ pos +")";
            };
        })
        .styleTween("text-anchor", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start":"end";
            };
        })
        .text(function(d) {
            return (d.data.source_id+": "+d.data.total+"%");
        });


    text.exit()
        .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data), function(d){ return d.data.source_id });

    polyline.enter()
        .append("polyline");

    polyline.transition().duration(1000)
        .attrTween("points", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();
};

</script>
</body>

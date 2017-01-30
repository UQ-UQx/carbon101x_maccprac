////
//
// maccurve - This function will return a reusable Marginal Abatement Cost Curve with the
//            supplied configuration.
//
// parent     = A mandatory element indicating the parent node of this chart.
// data       = The data to be graphed in this chart.
// width      = The width in pixels of this chart.
// height     = The height in pixels of this chart.
// xoffset    = The x offset (relative to the parent) in pixels where we will
//              start rendering this chart.
// yoffset    = The y offset (relative to the parent) in pixels where we will
//              start rendering this chart.
// showcarbonprice = Boolean to show carbon price as a line.
// carbonprice= The carbon price.
// showtitle = Boolean to show chart title.
// title     = The title of the chart.
// xaxislbl  = The x axis label.
// yaxislbl  = The y axis label.
//
////

var d3 = require('d3');
var d3legend = require('d3-legend')(d3);
var d3tip = require('d3-tip')(d3);

function MacCurve(config)
{

  // Default parameters.
  var p =
  {
    parent          : null,
    name            : 'chart1',
    listeners       : [],
    data            : [
                        {'id':1, 'project': 'Project C', 'cost': 8.5, 'tonnes': 120, 'selectedcolour': "#3366cc", 'unselectedcolour': "#C7D5F2"},
                        {'id':2, 'project': 'Project A', 'cost': -50, 'tonnes': 60, 'selectedcolour': "#dc3912", 'unselectedcolour': "#F59A9A"},
                        {'id':3, 'project': 'Project D', 'cost': 17, 'tonnes': 200, 'selectedcolour': "#ff9900", 'unselectedcolour': "#FADCAF"},
                        {'id':4, 'project': 'Project B', 'cost': -5, 'tonnes': 100, 'selectedcolour': "#109618", 'unselectedcolour': "#8FCC92"}
                      ],
    selected        : [],
    selectedcallback: false,
    selectedcallbackfn: '',
    width           : '900',
    height          : '500',
    margintop       : 20,
    marginright     : 30,
    marginbottom    : 30,
    marginleft      : 40,
    showcarbonprice : true,
    carbonprice     : 10,
    carbonpricelabel: 'Carbon Price',
    showtitle       : true,
    title           : "Marginal Abatement Cost Curve",
    xaxislbl        : "Total abatement (tCO2e)",
    yaxislbl        : "Marginal abatement cost ($/tCO2e)"
  };

  var tip;
  var project_colors = ["#3366cc", "#dc3912", "#ff9900", "#109618"];
  var macc_data = [];
  var total_abatementvolume = 0;
  var tip_called = false;


  // If we have user-defined parameters, override the defaults.
  if (config !== "undefined")
  {
    for (var prop in config)
    {
      p[prop] = config[prop];
    }
  }

  // Render this chart.
  this.chart = function()
  {
    // Reorder JSON by cost
    var array = [];
    $.each(p.data, function(key, value) {
        array.push(value);
    });
    array.sort(function(a, b) {
        return a.cost - b.cost;
    });

    // Calculate width and axis position for each bar
    var prev_tonnes = 0;
    var prev_axispos = 0;

    $.each(array, function(index, entry) {
      var curobj = {};
      curobj.id = entry.id;
      curobj.project = entry.project;
      curobj.cost = entry.cost;
      curobj.tonnes = entry.tonnes;
      curobj.selectedcolour = entry.selectedcolour;
      curobj.unselectedcolour = entry.unselectedcolour;
      //curobj.tonnesdelta = entry.tonnes - prev_tonnes;
      curobj.axispos = prev_axispos;
      macc_data.push(curobj)
      prev_tonnes = curobj.tonnes;
      prev_axispos = prev_axispos + curobj.tonnes;
      total_abatementvolume = total_abatementvolume + curobj.tonnes
    });

    macc_data_json = JSON.stringify(macc_data);

    // setup tooltips
    tip = d3tip();

    tip
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>" + d.project + "</strong><br/><strong>tCO<sub>2</sub>e:</strong> <span style='color:red'>" + d.tonnes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span></br>" + "<strong>$/tCO<sub>2</sub>e:</strong> <span style='color:red'>" + d.cost + "</span>" ;
          });


      this.update();

      window.addEventListener('resize', this.update);
  }

  // This routine supports the update operation for this chart.  This is
  // applicable when the chart should be partially updated.
  this.update = function()
  {
      // get width and height from parent container
      p.width = $(p.parent).parent().width();
      p.height = $(p.parent).parent().height();

      var margin = {top: p.margintop, right: p.marginright, bottom: p.marginbottom, left: p.marginleft},
          width = p.width - margin.left - margin.right,
          height = p.height - margin.top - margin.bottom;

      var x = d3.scale.linear()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      // Remove previous rendering
      d3.select("#"+p.name).remove();

      var chartContainer = d3.select(p.parent)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("id",p.name)
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        y_min = d3.min(macc_data, function(d) { return d.cost; })

        //x.domain([0, d3.max(macc_data, function(d) { return d.tonnes; })]).nice();
        x.domain([0, total_abatementvolume]).nice(); // x axis is size of total abatement from all projects

        if (y_min > 0)
        {
          y_min = 0;
        }
        y.domain([y_min, d3.max(macc_data, function(d) { return d.cost; })]).nice();

        if (tip_called == false)
        {
          chartContainer.call(tip);
          tip_called = true;
        }

        chartContainer.selectAll(".bar")
            .data(macc_data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("id", function(d) { return "proj_" + d.id; })
            .attr("x", function(d) { return x(d.axispos); })
            .attr("y", function(d) { if (d.cost>0){return y(d.cost)} else {return y(0)}; })
            .attr("height", function(d) { return Math.abs(y(d.cost) - y(0)); })
            .attr("width", function(d) { return x(d.tonnes);})
            .attr("fill", function(d,i) {
                                          if ($.inArray(d.id, p.selected)!= -1){
                                            return d.selectedcolour;
                                          }
                                          else { return d.unselectedcolour; }
                                        } )
            .attr("data-legend",function(d) { return d.project})
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on("click", function(d,i){
                                        if ($.inArray(d.id, p.selected)!= -1)
                                        {
                                          // remove from selected
                                          var index = $.inArray(d.id, p.selected);
                                          p.selected.splice(index, 1);
                                          d3.select("#proj_" + d.id).attr("fill", function(d,i) {return d.unselectedcolour;});
                                          // Remove the outline when unselected
                                          d3.select("#proj_" + d.id).attr("stroke-width", 0);
                                          d3.select("#proj_" + d.id).attr("stroke", "none");
                                          if (p.selectedcallback) {p.selectedcallbackfn(p.selected);}
                                        }
                                        else {
                                          // add to selected
                                          p.selected.push(d.id);
                                          d3.select("#proj_" + d.id).attr("fill", function(d,i) {return d.selectedcolour;});
                                          // Add outline to selected bars on the chart
                                          d3.select("#proj_" + d.id).attr("stroke-width", 2);
                                          d3.select("#proj_" + d.id).attr("stroke", "black");
                                          if (p.selectedcallback) {p.selectedcallbackfn(p.selected);}
                                        }
                                      });

        // optional line for Carbon Price
        if (p.showcarbonprice) {
          chartContainer.append("line")          // attach a line
            .style("stroke", "black")  // colour the line
            .style("stroke-dasharray", ("3, 3"))
            .attr("x1", 0)     // x position of the first end of the line
            .attr("y1", y(p.carbonprice))      // y position of the first end of the line
            .attr("x2", width)    // x position of the second end of the line //x(d3.max(macc_data, function(d) { return d.tonnes; })))
            .attr("y2", y(p.carbonprice));    // y position of the second end of the line
          chartContainer.append("text")
            .attr("x", 5)
            .attr("y", y(p.carbonprice)+6)
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(p.carbonpricelabel + ": $" + p.carbonprice);
        }

        if (p.showtitle) {
          //Create Title
          chartContainer.append("text")
            .attr("x", width / 2 )
            .attr("y", 10)
            .attr("class", "title")
            .style("text-anchor", "middle")
            .style("font-size", "200%")
            .text(p.title);
        }

        //Create X Axis
        chartContainer.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width - 45 ) //width / 2
            .attr("y", (margin.bottom / 2) + 15)
            .style("text-anchor", "middle")
            .style("font-size", "80%")
            .text(p.xaxislbl);

        //Create Y Axis
        chartContainer.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("y", - (margin.left / 2 + 5))
            .attr("x", - height / 2)
            .style("text-anchor", "middle")
            .style("font-size", "80%")
            .text(p.yaxislbl);

       legend = chartContainer.append("g")
            .attr("class","legend")
            .attr("transform","translate(20,5)")
            .style("font-size","12px")
            .call(d3.legend);

  }

  // Use this routine to retrieve and update attributes.

  this.attr = function(name, value)
  {
    // When no arguments are given, we return the current value of the
    // attribute back to the caller.
    if (arguments.length == 1)
    {
      return p[name];
    }
    // Given 2 arguments we set the name=value.
    else if (arguments.length == 2)
    {
      p[name] = value;
    }

    // Return the chart object back so we can chain the operations together.
    return chart;
  }


  this.getSelected = function()
  {
    return p.selected;
  }

  this.setSelected = function(curr_selected)
  {
    p.selected.push(curr_selected);
    var selected_colour = "";
    // get selected colour for proj
    macc_data.forEach(function(obj) {
      if (obj.id==curr_selected){
        selected_colour = obj.selectedcolour;
      }
    });

    d3.select("#proj_" + curr_selected).attr("fill", selected_colour);
    d3.select("#proj_" + curr_selected).attr("stroke-width", 2);
    d3.select("#proj_" + curr_selected).attr("stroke", "black");

    //if (p.selectedcallback) {p.selectedcallbackfn(p.selected);}
  }

  this.unsetSelected = function(curr_selected)
  {

    var index = p.selected.indexOf(curr_selected);
    p.selected.splice(index, 1);
    var unselected_colour = "";
    // get unselected colour for proj
    macc_data.forEach(function(obj) {
      if (obj.id==curr_selected){
        unselected_colour = obj.unselectedcolour;
      }
    });

    d3.select("#proj_" + curr_selected).attr("fill", unselected_colour);
    d3.select("#proj_" + curr_selected).attr("stroke-width", 0);
    d3.select("#proj_" + curr_selected).attr("stroke", "none");

  }
  /*
  function colors(n) {
    var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    return colores_g[n % colores_g.length];
  }
  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
  */
}

module.exports = MacCurve;

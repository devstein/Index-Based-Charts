//create basi sector indexes chart
function basi_mktx_us_hg_overall_chart() {
    //var to catch any issues while getting data 
    var jqxhr_basi = $.get('../../datafiles/widget_data/US_HG_MKTX_BASI_overall.csv', function (data) {
        var options = {
            //chart options 
            chart: {
                //set type of graph, where it renders
                type: 'line',
                renderTo: 'basi_mktx_us_hg_overall_container'
                //was basi_overall_container
            },
            //set title of graph
            title: {
                text: 'MKTX US High Grade Bid-Ask Spread Index (BASI)',
                style: {
                    color: '#4D759E'
                },
                align: 'center'
            },
            //set xAxis title
            xAxis: {
                title: {
                    text: 'Date',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                }
            },
            //set yAxis info 
            yAxis: [{
                title: {
                    text: 'Basis Points (BPS)',
                    style: {
                        color: '#4D759E',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    //give y-axis labels commas for thousands place seperator
                    formatter: function () {
                        return Highcharts.numberFormat(this.value);
                    }
                }, 
                //set y-axis to the left side
                opposite: false,
                //set background grid line width
                gridLineWidth: 1,
                min: 0
            },  { // Second yAxis
                gridLineWidth: 1,
                min: 0,
                title: {
                    text: 'VIX',
                    style: {
                        color: '#639741',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0);
                    }
                },
                opposite: true
            }, { // Third yAxis
                gridLineWidth: 1,
                min: 0,
                title: {
                    text: 'CDX.IG',
                    style: {
                        color: '#357895',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0);
                    }
                },
                opposite: true
        }],
            //stylize the tooltip 
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                valueDecimals: 4
            },
            //enable and stylize the legend
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                borderWidth: 1,
                borderRadius: 5,
                itemDistance: 20,
                reversed: false
            },
            //set the starting range. 0-5. 5="All", 4="1yr", etc
            rangeSelector: {
                selected: 4,
                allButtonsEnabled: true
            },
            //set general plot options 
            plotOptions: {
                //make the number of points allowed uncapped
                series: {
                    turboThreshold: 0
                }
            },
            //disable credits
            credits: {
                enabled: false
            },
            //make download as csv format correctly
            navigator: {
                series: {
                    includeInCSVExport: false
                }
            },
            //set name of chart downloads
            exporting: {
                filename: 'MarketAxess_basi_us_hg_mktx_overall',
                //enable download icon
                enabled: true,
                //add image to download
                chartOptions: {
                    chart: {
                        events: {
                            load: function () {
                                this.renderer.image('http://www.marketaxess.com/images/marketaxess_logo2.gif', 90, 75, 300, 48).attr({
                                    opacity: 0.1
                                    }).add();
                            }
                        }
                    },
                    //remove scrollbar and navigator from downloaded image
                    scrollbar: {
                        enabled: false
                    },
                    navigator:{
                    }
                },
                //make download as csv format correctly
                csv: {
                    dateFormat: '%Y-%m-%d'
                }
            },
            //set graph colors
            colors: ['#002244', '#DBBB33', '#43C5F3', '#639741', '#357895'],
            //series to be filled by data 
            series: []
        };
        //names of labels in order of series. make sure they are the same as series header in data file
        var names = ['TRACE HG BASI', 'MKTX HG BASI', 'MKTX HG BASI Tight','MKTX HG BASI Wide','VIX', 'CDX.IG'];
        //get csv file, multiply by 100 (divide by .01) and populate chart
        readCSV(options, data, 1.0, names);
        //set data to correct axis
        //set first three set to basi y-axis 
        for (var i = 0; i < 4; i++) options.series[i].yAxis = 0;
        for (var i = 4; i < options.series.length; i++) options.series[i].yAxis = i-3; 
        var chart = new Highcharts.StockChart(options);
    })
        //catch and display any errors 
        .fail(function (jqxhr_basi, exception) {
           ajaxError(jqxhr_basi, exception, '#basi_mktx_us_hg_overall_container');
    });

}

(function () {

    //set high level chart options for all charts
    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    // $('.chart_container').toggle(false);
    basi_mktx_us_hg_overall_chart();
    // $('#basi_mktx_us_hg_overall_container').toggle(true);
    // auto_assign_toggle_chart_buttons();
})();
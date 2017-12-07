import Highcharts from 'highcharts'
import stream from 'highcharts/modules/streamgraph'
import series from 'highcharts/modules/series-label'
import annotations from 'highcharts/modules/annotations'
import exporting from 'highcharts/modules/exporting'

stream(Highcharts)
series(Highcharts)
annotations(Highcharts)
exporting(Highcharts)

export default Highcharts

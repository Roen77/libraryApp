<template>
  <div>
    <bar-chart-base :data="barChartData" :options="barChartOptions" :height="400"></bar-chart-base>
  </div>
</template>

<script>
import BarChartBase from './BarChartBase.js'
export default {
  components: { BarChartBase },
  props: {
    datas: {
      type: Array,
      required: true
    },
    titleName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      barChartData: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: this.datas
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: true
        },
        title: {
          display: true,
          text: this.titleName,
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          // backgroundColor: '#17BF62'
          backgroundColor: '#222'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                max: 20
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
      }
    }
  }
}
</script>

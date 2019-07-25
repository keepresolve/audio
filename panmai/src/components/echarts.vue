<template>
  <div class="echartsPage">
    <ECharts :options="options"></ECharts>

    <div class="erweima">
      <vue-qr :bgSrc="src" :logoSrc="src2" text="Hello world!asdasdasdasdasdasd" :size="200"></vue-qr>
      <vue-qr text="Hello world!" :callback="test" qid="testid"></vue-qr>
    </div>
  </div>
</template>
<script>
import ECharts from '../common/echarts'
import VueQr from 'vue-qr'

export default {
    name: 'echartsPage',
    components: {
        ECharts,
        VueQr
    },
    data() {
        return {
            src: '',
            src2: '',
            options: {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            }
        }
    },
    methods: {
        test(dataUrl, id) {
            console.log(dataUrl, id)
        }
    }
}
</script>
<style >
.echartsPage {
    width: 500px;
    height: 500px;
}
</style>
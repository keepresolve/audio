
<template>
  <div class="echarts">
    <div id="echarts" ref="echarts"></div>
    <ul>
      <navtive-test></navtive-test>
    </ul>
  </div>
</template>
<script>
// https://echarts.baidu.com/echarts2/doc/example.html
import navtiveTest from './navtiveTest'
import echarts from 'echarts'
export default {
    name: 'echarts',
    data() {
        return {
            echarts: null
        }
    },
    components: {
        'navtive-test': navtiveTest
    },
    props: {
        options: {}
    },
    methods: {
        parent(val) {
            alert(val)
        }
    },
    watch: {
        options: {
            handler(n) {
                this.echarts.setOption(n)
            },
            deep: true
        }
    },
    mounted() {
        this.echarts = echarts.init(this.$refs.echarts)
        // 使用刚指定的配置项和数据显示图表。
        this.echarts.setOption(this.options)
        console.log({ parent: this.$parent.$parent, parents: this.$root })
        this.$parent.$emit('changed', { message: 'i am echarts' })
    }
}
</script>
<style >
.echarts {
    height: 100%;
    width: 100%;
}
#echarts {
    height: 300px;
}
</style>

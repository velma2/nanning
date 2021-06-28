<template>
  <div id="index">
       <div>
            <div class="header">
                <div class="flex-row-sb title-header">
                    <span class="white-word title">全景系统预警处置效能分析</span>
                    <span class="white-word user flex-row">
                        <img class="title-icon" src="@/assets/img/Oval.png" alt="">
                        <span>用户名</span>
                    </span>
                </div>
            </div>
            <div class="content">
            <div class="search-options white-bg flex-row-sb">
                <div class="flex-row search-option" style="width: 20%">
                    <span class="title">搜索</span>
                    <el-input placeholder="请输入" v-model="searchInput" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <div class="flex-row search-option" style="width: 15%">
                    <span class="title">组织机构</span>
                    <el-select v-model="optionvalue" filterable placeholder="请选择名称">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="flex-row search-option" style="width: 25%">
                    <span class="title">时间</span>
                   <el-date-picker
                        v-model="slectTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="预警开始时间"
                        end-placeholder="预警结束时间"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div  class="flex-row search-option" style="width: 20%">
                    <span class="title">办理时长</span>
                    <el-input-number v-model="processingTime" controls-position="right" :min="1" :max="10" placeholder="请选择时间"></el-input-number>
                </div>
                <div>
                    <el-button  @click="resetValue">重置</el-button>
                    <el-button type="primary" @click="confirmSearch">确认</el-button>
                </div>
            </div>
            <div class="top-five white-bg">
                <div class="content-title flex-row">
                    <img class="title-icon" src="@/assets/img/icon.png" alt="">
                    <span>本月预计信息量排行TOP5</span>
                </div>
                <div class="content-desc flex">
                    <div class="department">
                        <div class="subtitle flex-row">
                            <span class="title-line"></span>
                            <span>职能部门</span>
                        </div>
                        <el-table
                            :data="tableData"
                            style="width: 100%;height: 80%;overflow: auto;border: 1px solid rgb(240,240,240);"
                            :row-class-name="tableRowClassName"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            >
                            <el-table-column v-for="(item,index) in tablesHeader"
                                :key="index"
                                :prop="item.prop"
                                :label="item.label"
                                :width="item.width"
                                :sortable="item.sortable"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="subordinate">
                        <div class="subtitle flex-row">
                            <span class="title-line"></span>
                            <span>隶属海关</span>
                        </div>
                        <el-table
                            :data="subordinateData"
                            style="width: 100%;height: 80%;overflow: auto;border: 1px solid rgb(240,240,240);"
                            :row-class-name="tableRowClassName"
                            
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            >
                            <el-table-column v-for="(item,index) in tablesHeader"
                                :key="index"
                                :prop="item.prop"
                                :label="item.label"
                                :width="item.width"
                                :sortable="item.sortable"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="data-show white-bg">
                <div class="content-desc flex">
                    <div class="data-show-chart" style="margin-right: .5%;">
                        <div class="subtitle flex-row">
                            <span class="title-line"></span>
                            <span>南宁海关预警信息数量 （条）</span>
                        </div>
                        <div id="line-chart1" class="chart-div"></div>
                    </div>
                    <div class="data-show-chart" style="margin-right: .5%;">
                        <div class="subtitle flex-row">
                            <span class="title-line"></span>
                            <span>南宁海关-超办理时限（15天）单数</span>
                        </div>
                        <div id="line-chart2" class="chart-div"></div>
                    </div>
                    <div class="data-show-chart">
                        <div class="subtitle flex-row">
                            <span class="title-line"></span>
                            <span>南宁海关-截止当前办结预警信息数量 （条）</span>
                        </div>
                        <div id="line-chart3" class="chart-div"></div>
                    </div>
                </div>
            </div>
            <div class="data-show2">
                <div class="content-desc flex">
                    <div class="data-table white-bg">
                        <el-table
                        :data="totalTableData"
                        style="width: 100%;height: 90%;overflow: auto;border: 1px solid rgb(240,240,240);"
                        :row-class-name="tableRowClassName"
                        
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        >
                            <el-table-column
                                type="index"
                                width="50"
                                label="序号">
                            </el-table-column>
                            <el-table-column v-for="(item,index) in totalTablesHeader"
                                :key="index"
                                :prop="item.prop"
                                :label="item.label"
                                :width="item.width"
                                :sortable="item.sortable"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div style="margin-top: 20px;display: flex;justify-content: flex-end">
                        <el-pagination @size-change="handleSizeChange"
                            :page-sizes="[10, 20, 30, 40]"
                            @current-change="handleCurrentChange"
                            :current-page.sync="pagination.page"
                            :page-size="pagination.limit"
                            layout="sizes,total, prev, pager, next, jumper"
                            :total="pagination.total">
                        </el-pagination>
                    </div>
                    </div>
                    <div class="data-echatrs white-bg">
                            
                        <div>
                            <div class="subtitle flex-row">
                                <span class="title-line"></span>
                                <span>预警信息量排名</span>
                            </div>
                            <div id="line-chart4" class="charts chart-div">

                            </div>
                        </div>
                        <div>
                            <div class="subtitle flex-row">
                                <span class="title-line"></span>
                                <span>预警信息量</span>
                            </div>
                            <div id="line-chart5" class="charts chart-div">

                            </div>
                        </div>
                        <div>
                            <div class="subtitle flex-row">
                                <span class="title-line"></span>
                                <span>半结时长</span>
                            </div>
                            <div id="line-chart6" class="charts chart-div">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import corls from './components/corls'
//  import { getFruitAllData} from '@/api/index'
export default {
    name: 'Index',
     data () {
        return {
            searchInput: '', // 搜索框的值
            options: corls.options,
            optionvalue: '', // 组织机构选中的值
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            slectTime: '', // 预警开始时间和结束时间
            processingTime: '', // 办理时长
            tablesHeader: corls.tablesHeader,
            totalTablesHeader: corls.totalTablesHeader,
            tableData: corls.tableData,
            subordinateData: corls.subordinateData,
            totalTableData: corls.totalTableData,
            pagination: {
                page: 1,
                limit: 10,
                total: 30,
            },
            lineChartsData: [
                {
                    id: 'line-chart1',
                    color: '#5B8FF9',
                    data : {
                        date: ['202001', '202002','202003','202004','202005','202006','202007' ],
                        data: [800, 700, 600, 500, 400, 330, 300, 280]
                    },
                },
                {
                    id: 'line-chart2',
                    color: '#FFC53D',
                    data : {
                        date: ['202001', '202002','202003','202004','202005','202006','202007' ],
                        data: [800, 700, 600, 500, 400, 330, 300, 280]
                    },
                },
                {
                    id: 'line-chart3',
                    color: '#69C0FF',
                    data : {
                        date: ['202001', '202002','202003','202004','202005','202006','202007' ],
                        data: [800, 700, 600, 500, 400, 330, 300, 280]
                    },
                }
            ]
        }
    },
    mounted() {
        for(let j = 0; j < this.lineChartsData.length ; j++) {
            this.lineCharts(this.lineChartsData[j])
        }
        this.lineCharts4()
        this.lineCharts5()
        this.lineCharts6()
        // this.getFruitAllData()
    },
    methods: {
        // 重置
        resetValue() {
            
        },
        // 搜索确认
        confirmSearch() {
            console.log(this.searchInput)
            console.log(this.optionvalue)
            console.log(this.slectTime)
            let startTime = this.moment(this.slectTime[0]).format("YYYY-MM-DD");
            let endTime = this.moment(this.slectTime[1]).format("YYYY-MM-DD");
            console.log(startTime)
            console.log(endTime)
            console.log(this.processingTime)
        },
    //     getFruitAllData() {
    //        let data = {
    //         current:1,
    //         pageSize:10
    //        }
    //        getFruitAllData(data).then((res) => {
    //           console.log(res)
    //         }).catch(err =>{
    //             console.log(err)
    //         })
    //    },
        // 分页属性
        handleSizeChange (val) {
            this.limit = val
            this.loadData()
        },
        handleCurrentChange (val) {
            this.current = val
            this.loadData()
        },
        // 表格样式设置
        tableRowClassName({row, rowIndex}) {
            console.log(row)
            if (rowIndex % 2 !== 0) {
                return 'row-class';
            } else {
                return '';
            }
        },
        //  南宁海关预警信息数量
        lineCharts(dataList) {
            let chartDom = document.getElementById(dataList.id);
            let myChart = echarts.init(chartDom);
            let option = {
                title: {
                    // text: '江门市蓬江区芝山五金工艺制品有限公司产值估计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '9%',
                    bottom: '7%',
                    top: '8%',
                    containLabel: true
                },
                xAxis: {    
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    boundaryGap: false,
                    axisLabel: {  
                        interval:0,  
                        rotate:-15 ,
                        textStyle: {
                            color: 'rgba(0,0,0,0.5)',
                        } 
                    }, 
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.05)',
                        }
                    },
                    // data: ['202001', '202002','202003','202004','202005','202006','202007' ]
                    data: dataList.data.date
                },
                yAxis: {
                    type: 'value',
                    max: function(value) {
                        return value.max + 400
                    },
                    axisLine: {show:false},
                    axisTick: {show:false},
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0,0,0,0.45)',
                            fontSize: 14,
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: 'rgba(0,0,0,0.15)'
                        }
                    }
                },
                series: [
                    {
                        name: '南宁海关预警信息数量',
                        type: 'line',
                        symbol:'circle',
                        // color: '#5B8FF9',
                        color: dataList.color,
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x0: 0,
                                    y0: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        // color: '#5B8FF9',
                                        color: dataList.color,
                                    }, {
                                        offset: 1,
                                        color: 'white',
                                    }],
                                    globalCoord: false
                                },
                            }
                        },
                        // data: [800, 700, 600, 500, 400, 330, 300, 280],
                        data: dataList.data.data,
                    }
                ]
            };
            option && myChart.setOption(option)
            window.addEventListener("resize", function () {
                myChart.resize()
            });
        },
        
        //  预警信息量排名
        lineCharts4() {
            let chartDom = document.getElementById('line-chart4');
            let myChart = echarts.init(chartDom);
            let option = {
                title: {
                    // text: '江门市蓬江区芝山五金工艺制品有限公司产值估计'
                },
                legend: {
                    left: '3%',
                    icon:'rect',
                    itemWidth:10,
                    itemHeight:10,
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '9%',
                    bottom: '7%',
                    top: '17%',
                    containLabel: true
                },
                xAxis: {    
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.05)',
                        }
                    },
                    boundaryGap: false,
                    axisLabel: {  
                        interval:0,  
                        rotate:-15,
                        textStyle: {
                            color: 'rgba(0,0,0,0.5)',
                        } 
                    }, 
                    data: ['6:00', '8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00' ]
                },
                yAxis: {
                    type: 'value',
                    max: function(value) {
                        return value.max + 400
                    },
                     axisLine: {show:false},
                    axisTick: {show:false},
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0,0,0,0.45)',
                            fontSize: 14,
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: 'rgba(0,0,0,0.15)'
                        }
                    }
                },
                series: [
                    {
                        name: '类别一',
                        type: 'line',
                        symbol:'circle',
                        color: '#5B8FF9',
                        data: [600, 700, 100, 500, 200, 300, 100, 100, 500],
                    },
                    {
                        name: '类别二',
                        type: 'line',
                        symbol:'circle',
                        color: '#40A9FF ',
                        data: [300, 600, 300, 500, 500, 380, 330, 600, 300],
                    },
                    {
                        name: '类别三',
                        type: 'line',
                        symbol:'circle',
                        color: '#FFC53D',
                        data: [400, 600, 300, 200, 400, 310, 456, 600, 200],
                    },
                    {
                        name: '类别四',
                        type: 'line',
                        symbol:'circle',
                        color: '#5AD8A6',
                        data: [700, 100, 800, 800, 400, 390, 555, 600, 333],
                    }
                ]
            };
            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            });
        },
        
        //  预警信息量
        lineCharts5() {
            let chartDom = document.getElementById('line-chart5');
            let myChart = echarts.init(chartDom);
            let option = {
                title: {
                    // text: '江门市蓬江区芝山五金工艺制品有限公司产值估计'
                },
                legend: {
                    left: '3%',
                    icon:'rect',
                    itemWidth:10,
                    itemHeight:10,
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '9%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {    
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.05)',
                        }
                    },
                    boundaryGap: false,
                    axisLabel: {  
                        interval:0,  
                        textStyle: {
                            color: 'rgba(0,0,0,0.5)',
                        } 
                        // rotate:-30  
                    }, 
                    data: ['1', '2','3','4','5','6','7','8','9','10','11','12' ]
                },
                yAxis: {
                    type: 'value',
                    max: 24,
                    splitNumber : 5,
                    axisLine: {show:false},
                    axisTick: {show:false},
                    axisLabel: {
                        formatter: '{value} :00',
                        textStyle: {
                            color: 'rgba(0,0,0,0.45)',
                            fontSize: 14,
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: 'rgba(0,0,0,0.15)'
                        }
                    }
                },
                series: [
                    {
                        name: '预警开始时间',
                        type: 'line',
                        symbol:'circle',
                        color: '#00DAFF',
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x0: 0,
                                    y0: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#00DAFF',
                                    }, {
                                        offset: 1,
                                        color: 'white',
                                    }],
                                    globalCoord: false
                                },
                            }
                        },
                        // data: ['400', '400', '400', '500', '400', '700', '400', '400', '400', '400', '400', '400' ],
                        data: ['2', '3', '2', '4', '2', '2', '2' ],
                    },
                    {
                        name: '预警结束时间',
                        type: 'line',
                        symbol:'circle',
                        color: '#FDCA15',
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x0: 0,
                                    y0: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#FDCA15',
                                    }, {
                                        offset: 1,
                                        color: 'white',
                                    }],
                                    globalCoord: false
                                },
                            }
                        },
                        data: ['4', '5', '4', '5', '4', '10', '22' ],
                    }
                ]
            };
            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            });
        },
        
        //  半结时长
        lineCharts6() {
            let chartDom = document.getElementById('line-chart6');
            let myChart = echarts.init(chartDom);
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                // legend: {},
                grid: {
                    left: '3%',
                    right: '9%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: [
                    {
                        axisLabel: {  
                            interval:0,  
                            textStyle: {
                                color: 'rgba(0,0,0,0.5)',
                            } 
                        }, 
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0.05)',
                            }
                        },
                        
                        data: [1,2,3,4,5,6,7,8,9,10,11,12]
                    }
                ],
                yAxis: {
                    type: 'value',
                    max: function(value) {
                        return value.max + 204
                    },
                    axisLine: {show:false},
                    axisTick: {show:false},
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0,0,0,0.45)',
                            fontSize: 14,
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: 'rgba(0,0,0,0.15)'
                        }
                    }
                },
                series: [
                    {
                        name: '邮件营销',
                        type: 'bar',
                        stack: '广告',
                        color: '#5AD8A6',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210,100,120,130,140,170]
                    },
                    {
                        name: '联盟广告',
                        type: 'bar',
                        color:'#FFC53D',
                        stack: '广告',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [11, 22, 33, 44, 55, 66, 33,10,22,11,55,66]
                    }, 
                ]
            };
            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            });
        },
                
    }
}
</script>

<style lang="scss" scoped>
   
    /deep/{
        .el-table {
            .row-class {
                background: rgba(243,245,252,1);
            }
            th {
                font-weight: 400;
                background: rgba(243,245,252,1);
            }
            td {
                color: #1D1F24;
            }
        }
        .el-input-number.is-controls-right .el-input-number__decrease,
        .el-input-number.is-controls-right .el-input-number__increase {
            border: none;
            background: none;
        }
        .el-date-editor .el-range__icon {
            position: absolute;
            right: 1%;
        }
        .el-input-group>.el-input__inner {
            border-right: 0;
        }
    }
    .subtitle {
        padding: 10px 0;
    }
    .chart-div {
        border: 1px solid #f1f1f1;
    }
    .white-bg {
        background: #fff;
        margin-bottom: 20px;
    }
     html {
        width: 100%;
        height: 100%;
    } 
    body {
        padding: 0;
        margin: 0;
        width: 100%; 
        height: 100%; 
        background: #f5f5f5;
        font-size: 14px;
    }
    .title-icon {
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }
    .title-line {
        background: #00b8ff;
        width: 5px;
        height: 18px;
        border-radius: 5px;
        display: inline-block;
        margin-right: 5px;
    }
     /* 头部 */
    .header {
        width: 100%;
        height: 67px;
        background-image: url('../assets/img/banner.png');
        background-size: 100% 100%;
        .title-header {
            height: 100%;
            padding: 0 15px;
            .title {
                font-size: 20px;
            }
            .user {
                width: 6%;
                img {
                    margin-right: 10%;
                }
                span {
                    font-size: 14px;
                }
            }
        }
    }
    
    /* 内容 */
    .content {
        padding: 20px;
        .search-options {
            padding: 15px 10px;
            box-sizing: border-box;
            width: 100%;
            .title {
                font-size: 14px;
                color: #000;
                white-space: nowrap;
                margin-right: 10px;
            }
        }
        /deep/.el-input-group__append {
            background: none;
        }
        /* top5 */
        .top-five {
            width: 100%;
            /* height: 400px; */
            box-sizing: border-box;
            padding: 0 10px;
            .content-desc {
                width: 100%;
                height: 400px;
            }
            .content-title {    
                padding: 20px 0;
                border-bottom: 1px dashed #dad6d6;
            }
            .department {
                margin-right: 2%;
            }
            .department,
            .subordinate {
                width: 49%;
                height: 100%;
            }
            .el-table thead {
                color: #919EAB;
                font-weight: 400;
            }
        }
        /* 数据展示 */
        .data-show {
            width: 100%;
            box-sizing: border-box;
            padding: 0 10px;
            .content-desc {
                padding: 20px 0 0 0;
                width: 100%;
                height: 350px;
            }
            .data-show-chart {
                width: 33%;
                height: 100%;
            }
            #line-chart1,
            #line-chart2,
            #line-chart3 {
                width: 100%;
                height: 85%;
            }
        }
        
        /* 第二个数据展示 */
        .data-show2 {
            width: 100%;
            box-sizing: border-box;
            .data-table {
                width: 66%;
                height: 1060px;
                margin-right: 1%;
            }
            .data-echatrs {
                width: 33%;
                height: 1060px;
            }
            .data-table,
            .data-echatrs {
                &.white-bg {
                    margin-bottom: 0;
                }
                padding: 20px 10px;
                box-sizing: border-box;
            }
            .charts {
                width: 100%;
                height: 300px;
            }
        }
    }
</style>
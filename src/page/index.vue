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
                    <el-input placeholder="请输入" v-model="input1" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <div class="flex-row search-option" style="width: 15%">
                    <span class="title">组织机构</span>
                    <el-select v-model="value" filterable placeholder="请选择名称">
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
                        v-model="value2"
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
                    <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" placeholder="请选择时间"></el-input-number>
                </div>
                <div>
                    <el-button>重置</el-button>
                    <el-button type="primary">确认</el-button>
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
                            <el-table-column
                                prop="department"
                                label="单位"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="warningNum"
                                width="120"
                                label="预警信息数量(数量)"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                width="130"
                                prop="seperateWarningNum"
                                sortable
                                label="分拨/处理预警信息数量（条）">
                            </el-table-column>
                            <el-table-column
                                width="130"
                                prop="dueWarningNum"
                                label="截止当前办结预警信息数量"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="closingRate"
                                label="办结率（%）"
                                sortable>
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
                            <el-table-column
                                prop="department"
                                label="单位"
                                :show-overflow-tooltip='true'   
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="warningNum"
                                width="120"
                                label="预警信息数量(数量)"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                width="130"
                                prop="seperateWarningNum"
                                sortable
                                label="分拨/处理预警信息数量（条）">
                            </el-table-column>
                            <el-table-column
                                width="130"
                                prop="dueWarningNum"
                                label="截止当前办结预警信息数量"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="closingRate"
                                label="办结率（%）"
                                sortable>
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
                            <el-table-column
                                prop="department"
                                label="单位"
                                :show-overflow-tooltip='true'>
                            </el-table-column>
                            <el-table-column
                                prop="month"
                                label="统计月份">
                            </el-table-column>
                            <el-table-column
                                prop="warningNum"
                                width="100"
                                label="预警信息数量(条)"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                width="130"
                                prop="seperateWarningNum"
                                sortable
                                label="分拨/处理预警信息数量（条）">
                            </el-table-column>
                            <el-table-column
                                width="120"
                                prop="dueWarningNum"
                                label="截止当前办结预警信息数量"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="closingRate"
                                label="办结率（%）"
                                width="100"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="timeOut"
                                label="超办理时限(15天)单数"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="hours"
                                label="24小时分拨率(隶属)"
                                sortable>
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                        </el-table>
                        <div style="margin-top: 20px;display: flex;justify-content: flex-end">
                        <el-pagination @size-change="handleSizeChange"
                            :page-sizes="[10, 20, 30, 40]"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-size="limit"
                            layout="sizes,total, prev, pager, next, jumper"
                            :total="total">
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
export default {
    name: 'Index',
     data () {
        return {
            input1: '',
             options: [{
                value: '选项1',
                label: '防城海关'
                }, {
                value: '选项2',
                label: '钦州港海关'
                }, {
                value: '选项3',
                label: '友谊关海关'
                }, {
                value: '选项4',
                label: '北海海关'
                }, {
                value: '选项5',
                label: '梧州海关'
                }],
            value: '',
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
            value1: '',
            value2: '',
            num: '',
            tableData: [
                {
                    department: '防城海关',
                    warningNum: 1419,
                    seperateWarningNum: 1419,
                    dueWarningNum: 21,
                    closingRate: 1.48
                },
                {
                    department: '钦州港海关',
                    warningNum: 719,
                    seperateWarningNum: 719,
                    dueWarningNum: 78,
                    closingRate: 10.58
                },
                {
                    department: '友谊关海关',
                    warningNum: 568,
                    seperateWarningNum: 568,
                    dueWarningNum: 126,
                    closingRate: 22.18
                },
                {
                    department: '北海海关',
                    warningNum: 224,
                    seperateWarningNum: 224,
                    dueWarningNum: 75,
                    closingRate: 22.48
                },
                {
                    department: '梧州海关',
                    warningNum: 77,
                    seperateWarningNum: 77,
                    dueWarningNum: 35,
                    closingRate: 45.45
                },
            ],
            subordinateData: [
                {
                    department: '关税处',
                    warningNum: 1419,
                    seperateWarningNum: 1419,
                    dueWarningNum: 21,
                    closingRate: 1.48
                },
                {
                    department: '综合业务处',
                    warningNum: 719,
                    seperateWarningNum: 719,
                    dueWarningNum: 78,
                    closingRate: 10.58
                },
                {
                    department: '口岸监管处',
                    warningNum: 568,
                    seperateWarningNum: 568,
                    dueWarningNum: 126,
                    closingRate: 22.18
                },
                {
                    department: '动植物和食品检验检疫处',
                    warningNum: 224,
                    seperateWarningNum: 224,
                    dueWarningNum: 75,
                    closingRate: 22.48
                },
                {
                    department: '风险防控分局',
                    warningNum: 77,
                    seperateWarningNum: 0,
                    dueWarningNum: 0,
                    closingRate: 0
                },
            ],
            totalTableData: [
                {
                    department: '防城海关',
                    month: 202104,
                    warningNum: 1419,
                    seperateWarningNum: 1419,
                    dueWarningNum: 21,
                    closingRate: 1.48,
                    timeOut: 11,
                    hours: '-',
                    remark: '-'
                },
                {
                    department: '钦州港海关',
                    month: 202104,
                    warningNum: 719,
                    seperateWarningNum: 719,
                    dueWarningNum: 78,
                    closingRate: 10.58,
                    timeOut: 11,
                    hours: '-',
                    remark: '-'
                },
                {
                    department: '友谊关海关',
                    month: 202104,
                    warningNum: 568,
                    seperateWarningNum: 568,
                    dueWarningNum: 126,
                    closingRate: 22.18,
                    timeOut: 11,
                    hours: '-',
                    remark: '-'
                },
                {
                    department: '北海海关',
                    month: 202104,
                    warningNum: 224,
                    seperateWarningNum: 224,
                    dueWarningNum: 75,
                    closingRate: 22.48,
                    timeOut: 11,
                    hours: '-',
                    remark: '-'
                },
                {
                    department: '梧州海关',
                    month: 202104,
                    warningNum: 77,
                    seperateWarningNum: 77,
                    dueWarningNum: 35,
                    closingRate: 45.45,
                    timeOut: 11,
                    hours: '-',
                    remark: '-'
                },
            ],
            page: 1,
            limit: 10,
            total: 30,
            
        }
    },
    mounted() {
        this.lineCharts()
        this.lineCharts2()
        this.lineCharts3()
        this.lineCharts4()
        this.lineCharts5()
        this.lineCharts6()
    },
    methods: {
        // 分页属性
        handleSizeChange (val) {
            this.limit = val
            this.loadData()
        },
        handleCurrentChange (val) {
            this.current = val
            this.loadData()
        },
        tableRowClassName({row, rowIndex}) {
            console.log(row)
            if (rowIndex % 2 !== 0) {
                return 'row-class';
            } else {
                return '';
            }
        },
        //  南宁海关预警信息数量
        lineCharts() {
            let chartDom = document.getElementById('line-chart1');
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
                            color: '#2C3542'
                        } 
                    }, 
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.05)',
                        }
                    },
                    data: ['202001', '202002','202003','202004','202005','202006','202007' ]
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
                        color: '#5B8FF9',
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
                                        color: '#5B8FF9',
                                    }, {
                                        offset: 1,
                                        color: 'white',
                                    }],
                                    globalCoord: false
                                },
                            }
                        },
                        data: [800, 700, 600, 500, 400, 330, 300, 280],
                    }
                ]
            };
            option && myChart.setOption(option)
            window.addEventListener("resize", function () {
                myChart.resize()
            });
        },
        
        //  南宁海关-超办理时限（15天）单数
        lineCharts2() {
            let chartDom = document.getElementById('line-chart2');
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
                        rotate:-15,
                        textStyle: {
                            color: '#2C3542'
                        } 
                    }, 
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.05)',
                        }
                    },
                    data: ['202001', '202002','202003','202004','202005','202006','202007' ]
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
                        name: '南宁海关-超办理时限（15天）单数',
                        type: 'line',
                        symbol:'circle',
                        color: '#FFC53D',
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
                                        color: '#FFC53D',
                                    }, {
                                        offset: 1,
                                        color: 'white',
                                    }],
                                    globalCoord: false
                                },
                            }
                        },
                        data: [800, 700, 600, 500, 400, 330, 300, 280],
                    }
                ]
            };
            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            });
        },
    
        //  南宁海关-截止当前办结预警信息数量 （条）
        lineCharts3() {
            let chartDom = document.getElementById('line-chart3');
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
                            color: '#2C3542'
                        } 
                    }, 
                    data: ['202001', '202002','202003','202004','202005','202006','202007' ]
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
                        name: '南宁海关-超办理时限（15天）单数',
                        type: 'line',
                        symbol:'circle',
                        color: '#69C0FF',
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
                                        color: '#69C0FF',
                                    }, {
                                        offset: 1,
                                        color: 'white',
                                    }],
                                    globalCoord: false
                                },
                            }
                        },
                        data: [800, 700, 600, 500, 400, 330, 300, 280],
                    }
                ]
            };
            option && myChart.setOption(option);
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
                            color: '#2C3542'
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
                            color: '#2C3542'
                        } 
                        // rotate:-30  
                    }, 
                    data: ['1', '2','3','4','5','6','7','8','9','10','11','12' ]
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
                        data: ['400', '400', '400', '400', '400', '400', '400', '400', '400', '400', '400', '400' ],
                        // data: ['2:00', '2:00', '2:00', '2:00', '2:00', '2:00', '2:00' ],
                    },
                    {
                        name: '类别二',
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
                        data: ['200', '200', '200', '200', '200', '200', '200', '200', '200', '200', '200', '200' ],
                        // data: ['4:00', '4:00', '4:00', '4:00', '4:00', '4:00', '4:00' ],
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
                                color: '#2C3542'
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
            .subtitle {
                padding: 10px 0;
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
                padding: 20px 10px;
                box-sizing: border-box;
            }
            .charts {
                width: 100%;
                height: 300px;
            }
            .chart-div {
                border: 1px solid #f1f1f1;
            }
        }
    }
</style>
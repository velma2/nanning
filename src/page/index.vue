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
                <div class="flex-row search-option" style="width: 15%">
                    <span class="title">搜索</span>
                    <!-- <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select" clearable>
                        <el-select v-model="selectValue" slot="prepend" placeholder="请选择" clearable>
                        <el-option label="北海海关" value="1"></el-option>
                        <el-option label="检索预警单号" value="2"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input> -->
                    <el-input
                        placeholder="请输入"
                        prefix-icon="el-icon-search"
                        v-model="searchInput">
                    </el-input>
                    <!-- <el-input placeholder="请输入" v-model="searchInput" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input> -->
                </div>
                <div class="flex-row search-option" style="width: 28%">
                    <span class="title">组织机构</span>
                    <el-select v-model="orgType" placeholder="请选择" @change="orgChange" clearable>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="orgCodes" multiple collapse-tags placeholder="请选择" filterable clearable style="width:100%">
                        <el-option
                            v-for="item in orgOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <el-cascader v-model="optionvalue" :options="options" filterable placeholder="请选择名称" clearable>
                    </el-cascader> -->
                </div>
                <div class="flex-row search-option" style="width: 10%">
                    <span class="title">预警时间设置</span>
                    <el-switch
                        v-model="timeSet"
                        active-color="#00b8ff"
                        inactive-color="#DCDFE6">
                    </el-switch>
                </div>
                <div class="flex-row search-option" style="width: 23%">
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
                <div  class="flex-row search-option" style="width: 11%">
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
            <div v-if="curSelectOrgType !==3" class="data-show white-bg">
                <div class="content-desc flex">
                    <div class="data-show-chart" style="margin-right: .5%;">
                        <div class="subtitle flex-row">
                            <span class="title-line"></span>
                            <span>南宁海关-预警信息数量 （条）</span>
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
                        :data="curTotalTableData"
                        style="width: 100%;height: 90%;overflow: auto;border: 1px solid rgb(240,240,240);"
                        :row-class-name="tableRowClassName"
                        
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        >
                            <el-table-column
                                type="index"
                                width="50"
                                label="序号">
                            </el-table-column>
                            <el-table-column v-for="(item,index) in curTotalTablesHeader"
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
                            background
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
                            
                        <div class="charts-div" v-if="curSelectOrgType !==3">
                            <div class="subtitle flex-row">
                                <span class="title-line"></span>
                                <span>预警信息量排名</span>
                            </div>
                            <div id="line-chart4" class="charts chart-div">

                            </div>
                        </div>
                        <div class="charts-div" v-if="curSelectOrgType !==1 && curSelectOrgType !==2">
                            <div class="subtitle flex-row">
                                <span class="title-line"></span>
                                <span>预警信息量</span>
                            </div>
                            <div id="line-chart5" class="charts chart-div">

                            </div>
                        </div>
                        <div class="charts-div">
                            <div class="subtitle flex-row">
                                <span class="title-line"></span>
                                <span>单位：单</span>
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
 import { getTopFive,getOrType,getStatusList,getTableList} from '@/api/index'
export default {
    name: 'Index',
     data () {
        return {
            timeSet: false,
            searchData: {
                name: '', // 搜索内容
                orgType: '', // 组织机构类型 1职能部门 2隶属海关 3预警设置时间
                orgCodes: '', // 组织机构类型的子分类
                startTime: '', // 预警开始时间
                endTime: '', // 预警结束时间
                processingTime: '', // 办理时长
                timeOrgType: '', // 当预警设置时间和组织机构同时选中的时候此时参数的值为组织机构的类型
                current: 1, // 当前页码
                size: 10, // 每页显示的条数
            },
            searchInput: '', // 搜索框的值
            timeOrgType: '',
            options2: [{
                    value: '2',
                    label: '职能部门',
                    children: []
                },
                {
                    value: '1',
                    label: '隶属海关',
                    children: []
                },
            ],
            orgList: {
                haiguan: [],
                zhineng: []
            },
            orgOptions:[],
            options: [
                {
                    value: '2',
                    label: '职能部门',
                },
                {
                    value: '1',
                    label: '隶属海关',
                },
            ],
            selectValue: '', // 搜索选择的类型值
            orgType: '', // 组织机构选中的值
            curSelectOrgType: 0,
            orgCodes:'', // 组织机构下面的分支
            curSelectType: 1, // 记录搜索选择的类型来判断中间三个折线图是否隐藏
            statusList: [], // 预警状态类型
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
            curTotalTableData: corls.totalTableData, // 当前展示的表格名称
            curTotalTablesHeader: corls.totalTablesHeader, // 当前展示的表格数据
            tablesHeader: corls.tablesHeader,
            totalTablesHeader: corls.totalTablesHeader,
            // tableData: corls.tableData, // 职能部门数据
            tableData: [], // 职能部门数据
            subordinateData: [], // 隶属海关数据
            // subordinateData: corls.subordinateData, // 隶属海关数据
            totalTableData: corls.totalTableData,
            pagination: {
                page: 1,
                limit: 10,
                total: 30,
            },
            curShowChartsData: [],
            // 默认展示的图
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
            ],
            // 隶属海关分类的图
            lineChartsData2: [
                {
                    id: 'line-chart1',
                    color: '#5B8FF9',
                    data: {
                        data:  [
                            {value: 1048, name: '防城海关'},
                            {value: 735, name: '桂林海关'},
                            {value: 580, name: '梧州海关'},
                            {value: 484, name: '玉林海关'},
                            {value: 300, name: '柳州海关'},
                            {value: 300, name: '北海海关'},
                            {value: 300, name: '邕邮海关'},
                        ]
                    }
                },
                {
                    id: 'line-chart2',
                    color: '#FFC53D',
                    data : {
                        date: ['桂林海关', '河池海关', '柳州海关', '玉林海关', '北海海关', '永口海关'],
                        data: [0, 2.34, 2.90, 1.04, 13.44, 6.30]
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
            ],
            // 预警处理分类的图
            lineChartsData3: [
                {
                    id: 'line-chart1',
                    color: '#5B8FF9',
                    data: {
                        data: [
                            {value: 1048, name: '关税处'},
                            {value: 735, name: '综合业务处'},
                            {value: 580, name: '口岸监管处'},
                            {value: 484, name: '风险防控分局'},
                            {value: 300, name: '监察室'},
                            {value: 300, name: '统计分析处'},
                            {value: 300, name: '监督内审处'},
                        ]
                    }
                },
                {
                    id: 'line-chart2',
                    color: '#FFC53D',
                    data : {
                        date: ['监察室', '商品检验处', '卫生检疫处',
                    '企业管理和稽查处', '监督内审处', '综合业务处','动植物和视频检验检疫处','关税处','风险防控分局','统计分析处'
                    ],
                        data: [120, 0, 150, 80, 70, 110, 130,120,130,150]
                    },
                },
                {
                    id: 'line-chart3',
                    color: '#5B8FF9',
                    data : {
                        date: ['202001', '202002','202003','202004','202005','202006','202007' ],
                        data: [800, 700, 600, 500, 400, 330, 300, 280]
                    },
                }
            ],
            chartsIdList: ['line-chart1','line-chart2','line-chart3'],
            warningQuantitySort: {
                date:['6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'],
                data:[
                    [600, 700, 100, 500, 200, 300, 100, 100, 500],
                    [300, 600, 300, 500, 500, 380, 330, 600, 300],
                    [400, 600, 300, 200, 400, 310, 456, 600, 200],
                    [700, 100, 800, 800, 400, 390, 555, 600, 333]
                ]
            },
            warningQuantity: {
                date: ['1', '2','3','4','5','6','7','8','9','10','11','12' ],
                data: {
                    // 预警开始时间
                    startData: [2, 3, 2, 4, 2, 2, 2,2, 4, 2, 2, 2 ],
                    // 预警结束时间
                    endData : [4, 5, 4, 5, 4, 10, 22,4, 5, 4, 10,7 ]
                }
            },
            halfKnotDuration: {
                date: [1,2,3,4,5,6,7,8,9,10,11,12],
                data: [120, 132, 101, 134, 90, 230, 210,100,120,130,140,170]
            },
            rowList: null
        }
    },
    mounted() {
        // 获取预警类型
        this.getStatus()

        this.curShowChartsData = this.lineChartsData
        for(let j = 0; j < this.curShowChartsData.length ; j++) {
            this.lineCharts(j,this.curShowChartsData[j],1)
        }
        this.lineCharts4()
        this.lineCharts5()
        this.lineCharts6()
        // 获取本月预计信息量排行TOP5数据
        this.getTopFiveData()

        // 获取组织机构的对应的部门
        let typeList = [1,2]
        for(let i = 0; i < typeList.length ; i++) {
            this.getOrType(typeList[i])
        }
        console.log(this.slectTime)
        this.getTableList()
    },
    methods: {
        // 获取列表
        getTableList() {
            this.updateSearchData()
            getTableList(this.searchData).then((res)=> {
                let result = res.data.data
                if (this.timeSet) {
                    this.curTotalTablesHeader = corls.totalTablesHeader
                } else if (this.orgType == 1 || this.orgType == 2) {
                    this.curTotalTablesHeader = corls.totalTablesHeader2
                }
                this.curTotalTableData = result.records
                this.pagination.size =  result.size
                this.pagination.page = result.current
                this.pagination.total = result.total 
            }).catch((err)=> {
                console.log(err)
            })
        },
        // 获取预警状态
        getStatus() {
            getStatusList().then((res)=> {
                this.statusList = res.data.data
                console.log(this.statusList)
            }).catch((err)=> {
                console.log(err)
            })
        },
        // 获取组织机构的对应的部门
        getOrType(type) {
            let data = {type:type}
            getOrType(data).then((res) => {
               let result = res.data.data
               if (result.length > 0) {
                   for(let i = 0; i < result.length ; i++) {
                        let object = {}
                        object.value = result[i].orgCode
                        object.label = result[i].orgName
                        if (type == 1) {
                            this.orgList.haiguan.push(object)
                        } else {
                            this.orgList.zhineng.push(object)
                        }
                    }
               }
               
            }).catch(err =>{
                console.log(err)
            })
        },
        // 组织机构的选中
        orgChange(val) {
            console.log(val)
            if (val == 1) {
                this.orgCodes = ''
                this.orgOptions = this.orgList.haiguan
            } else if (val == 2) {
                this.orgCodes = ''
                this.orgOptions = this.orgList.zhineng
            } else if (!val) {
                this.orgOptions = []
                this.orgCodes = ''
            }
        },
        // 重置
        resetValue() {
            this.searchInput = ''
            this.orgType = ''
            this.orgCodes = ''
            this.timeSet = false
            this.slectTime = ''
            this.processingTime = ''
        },
        // 搜索确认
        confirmSearch() {
            
            this.updateSearchData()
            this.getTableList()
            // this.curSelectOrgType = this.orgType
            
            if (this.orgType == 1) {
                this.curShowChartsData = this.lineChartsData2
                for(let j = 0; j < this.curShowChartsData.length ; j++) {
                    this.lineCharts(j,this.curShowChartsData[j],2)
                }
            } else if (this.orgType == 2) {
                this.curShowChartsData = this.lineChartsData3
                for(let j = 0; j < this.curShowChartsData.length ; j++) {
                    this.lineCharts(j,this.curShowChartsData[j],3)
                }
            }
        },
        updateSearchData() {
            let startTime;
            let endTime;
            if (this.slectTime) {
                startTime = this.moment(this.slectTime[0]).format("YYYY-MM-DD");
                endTime = this.moment(this.slectTime[1]).format("YYYY-MM-DD");
            } else {
               startTime = '' 
               endTime = '' 
            } 
            let curOrgType;
            let curTimeOrgType;
            if (this.timeSet && this.orgType) {
                curOrgType = 3
                curTimeOrgType = this.orgType
            } else if(!this.timeSet && this.orgType) {
                curOrgType = this.orgType
                curTimeOrgType = ''
            } else if (this.timeSet && !this.orgType) {
                curOrgType = 3
                curTimeOrgType = ''
            }
            this.searchData.name = this.searchInput
            this.searchData.orgType = curOrgType || 1
            this.searchData.orgCodes = this.orgCodes || ['7200']
            this.searchData.startTime = startTime
            this.searchData.endTime = endTime
            this.searchData.processingTime = ''
            this.searchData.timeOrgType = curTimeOrgType
            this.searchData.current = this.pagination.page
            this.searchData.size = this.pagination.limit
            console.log(this.searchData)
        },
        //第一个搜索
        search() {
            // if (!this.selectValue) {
            //     this.$message({
            //         message: '请选择搜索类型 !',
            //         type: 'warning'
            //     });
            //     return false
            // }
            // if (!this.searchInput) {
            //     this.$message({
            //         message: '请输入搜索内容 !',
            //         type: 'warning'
            //     });
            //     return false
            // }
            this.curSelectType = this.selectValue || 1
            if (this.selectValue == 1 ||  this.curSelectType == 1) {
                setTimeout(()=> {
                    for(let j = 0; j < this.lineChartsData.length ; j++) {
                        this.lineCharts(this.lineChartsData[j])
                    }
                },500)
                this.curTotalTablesHeader = corls.totalTablesHeader2
                this.curTotalTableData = corls.totalTableData2
                this.pagination = {
                    page: 1,
                    limit: 10,
                    total: 50,
                }
            } else if (this.selectValue == 2) {
                this.curTotalTablesHeader = corls.totalTablesHeader
                this.curTotalTableData = corls.totalTableData
                this.pagination = {
                    page: 1,
                    limit: 10,
                    total: 30,
                }
            }
        },
        getTopFiveData() {
           getTopFive().then((res) => {
              let result = res.data.data
              for(let i = 0; i < result.length ; i++) {
                 if (result[i].type == 1) {
                    this.subordinateData = result[i].customsTopDtos
                 } else {
                    this.tableData = result[i].customsTopDtos
                 }
                }
            }).catch(err =>{
                console.log(err)
            })
       },
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
            this.rowList = row
            if (rowIndex % 2 !== 0) {
                return 'row-class';
            } else {
                return '';
            }
        },
        //  南宁海关预警信息数量
        lineCharts(index,dataList,type) {
            let chartDom = document.getElementById(dataList.id);
            let myChart = echarts.init(chartDom);
            let option;
            if (type == 1) {
                 option = this.changeChartsOption(4,dataList)
            } else if (type == 2) {
                if (index == 0) {
                    option = this.changeChartsOption(1,dataList)
                } else if (index == 1) {
                    option = this.changeChartsOption(2,dataList)
                }else if (index == 2) {
                    option = this.changeChartsOption(4,dataList)
                }
            } else if (type == 3) {
                if (index == 0) {
                    option = this.changeChartsOption(1,dataList)
                } else if (index == 1) {
                    option = this.changeChartsOption(3,dataList)
                }else if (index == 2) {
                    option = this.changeChartsOption(4,dataList)
                }
            }
            myChart.clear()
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
                    // data: ['6:00', '8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00' ]
                    data: this.warningQuantitySort.date
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
                        symbolSize: 8,// 拐点大小
                        symbol: 'circle',// 拐点形状
                        itemStyle: {
                            normal: {
                                color: '#5B8FF9',
                                borderColor:'#fff',//拐点边框颜色
                                borderWidth:2,//拐点边框大小
                                lineStyle: {
                                    color: '#5B8FF9'
                                }
                            },
                            // 鼠标悬浮拐点样式修改
                            emphasis:{
                                color: '#5B8FF9',
                                borderColor: '#fff',
                                borderWidth: 4,
                            }
                        },
                        name: '类别一',
                        type: 'line',
                        color: '#5B8FF9',
                        // data: [600, 700, 100, 500, 200, 300, 100, 100, 500],
                        data: this.warningQuantitySort.data[0]
                    },
                    {
                        symbolSize: 8,// 拐点大小
                        symbol: 'circle',// 拐点形状
                        itemStyle: {
                            normal: {
                                color: '#40A9FF',
                                borderColor:'#fff',//拐点边框颜色
                                borderWidth:2,//拐点边框大小
                                lineStyle: {
                                    color: '#40A9FF'
                                }
                            },
                            // 鼠标悬浮拐点样式修改
                            emphasis:{
                                color: '#40A9FF',
                                borderColor: '#fff',
                                borderWidth: 4,
                            }
                        },
                        name: '类别二',
                        type: 'line',
                        color: '#40A9FF',
                        // data: [300, 600, 300, 500, 500, 380, 330, 600, 300],
                        data: this.warningQuantitySort.data[1]
                    },
                    {
                        symbolSize: 8,// 拐点大小
                        symbol: 'circle',// 拐点形状
                        itemStyle: {
                            normal: {
                                color: '#FFC53D',
                                borderColor:'#fff',//拐点边框颜色
                                borderWidth:2,//拐点边框大小
                                lineStyle: {
                                    color: '#FFC53D'
                                }
                            },
                            // 鼠标悬浮拐点样式修改
                            emphasis:{
                                color: '#FFC53D',
                                borderColor: '#fff',
                                borderWidth: 4,
                            }
                        },
                        name: '类别三',
                        type: 'line',
                        color: '#FFC53D',
                        // data: [400, 600, 300, 200, 400, 310, 456, 600, 200],
                        data: this.warningQuantitySort.data[2],
                    },
                    {
                        symbolSize: 8,// 拐点大小
                        symbol: 'circle',// 拐点形状
                        itemStyle: {
                            normal: {
                                color: '#5AD8A6',
                                borderColor:'#fff',//拐点边框颜色
                                borderWidth:2,//拐点边框大小
                                lineStyle: {
                                    color: '#5AD8A6'
                                }
                            },
                            // 鼠标悬浮拐点样式修改
                            emphasis:{
                                color: '#5AD8A6',
                                borderColor: '#fff',
                                borderWidth: 4,
                            }
                        },
                        name: '类别四',
                        type: 'line',
                        color: '#5AD8A6',
                        // data: [700, 100, 800, 800, 400, 390, 555, 600, 333],
                        data: this.warningQuantitySort.data[3],
                    }
                ]
            };
            myChart.clear();
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
                    // data: ['1', '2','3','4','5','6','7','8','9','10','11','12' ]
                    data: this.warningQuantity.date
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
                        symbolSize: 8,// 拐点大小
                        symbol: 'circle',// 拐点形状
                        itemStyle: {
                            normal: {
                                color: '#00DAFF',
                                borderColor:'#fff',//拐点边框颜色
                                borderWidth:2,//拐点边框大小
                                lineStyle: {
                                    color: '#00DAFF'
                                }
                            },
                            // 鼠标悬浮拐点样式修改
                            emphasis:{
                                color: '#00DAFF',
                                borderColor: '#fff',
                                borderWidth: 4,
                            }
                        },
                        name: '预警开始时间',
                        type: 'line',
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
                        // data: [2, 3, 2, 4, 2, 2, 2,2, 4, 2, 2, 2 ],
                        data: this.warningQuantity.data.startData,
                    },
                    {
                        symbolSize: 8,// 拐点大小
                        symbol: 'circle',// 拐点形状
                        itemStyle: {
                            normal: {
                                color: '#FDCA15',
                                borderColor:'#fff',//拐点边框颜色
                                borderWidth:2,//拐点边框大小
                                lineStyle: {
                                    color: '#FDCA15'
                                }
                            },
                            // 鼠标悬浮拐点样式修改
                            emphasis:{
                                color: '#FDCA15',
                                borderColor: '#fff',
                                borderWidth: 4,
                            }
                        },
                        name: '预警结束时间',
                        type: 'line',
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
                        // data: [4, 5, 4, 5, 4, 10, 22,4, 5, 4, 10,7 ],
                        data: this.warningQuantity.data.endData,
                    }
                ]
            };
            myChart.clear();
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
                        
                        // data: [1,2,3,4,5,6,7,8,9,10,11,12]
                        data: this.halfKnotDuration.date
                    }
                ],
                yAxis: {
                    type: 'value',
                    // max: function(value) {
                    //     return value.max + 204
                    // },
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
                        name: '办结时长',
                        type: 'bar',
                        stack: '广告',
                        color: '#5AD8A6',
                        emphasis: {
                            focus: 'series'
                        },
                        // data: [120, 132, 101, 134, 90, 230, 210,100,120,130,140,170]
                        data: this.halfKnotDuration.data
                    },
                    // {
                    //     name: '联盟广告',
                    //     type: 'bar',
                    //     color:'#FFC53D',
                    //     stack: '广告',
                    //     emphasis: {
                    //         focus: 'series'
                    //     },
                    //     data: [11, 22, 33, 44, 55, 66, 33,10,22,11,55,66]
                    // }, 
                ]
            };
            myChart.clear();
            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize()
            });
        },
        // 选择option
        changeChartsOption(type,dataList) {
            let options;
            if (type == 1) {
                // 饼图
                options = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        bottom: '0%',
                        left: 'center',
                        textStyle: {
                            color: 'rgba(0,0,0,0.45)'
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            center: ["50%", "35%"], 
                            type: 'pie',
                            radius: ['30%', '50%'],
                            color: ['#5B8FF9','#9270CA','#6DC8EC','#F6C3B7','#FBE5A2','#F6BD16','#436CB6',
                            '#BDEFDB','#BDD2FD','#246CFF','#269A99','#E37C27','#6DC8EC','#BD2906','#5D7092',
                            '#5AD8A6','#B6E3F5','#1546AA','#E8684A','#40A9FF','#C2C8D5','#D2A00D','#5AD8A6'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            // data: [
                            //     {value: 1048, name: '搜索引擎'},
                            //     {value: 735, name: '直接访问'},
                            //     {value: 580, name: '邮件营销'},
                            //     {value: 484, name: '联盟广告'},
                            //     {value: 300, name: '视频广告'},
                            // ]
                            data: dataList.data.data
                        }
                    ]
                };
            } else if (type == 2) {
                // 横向柱状图
                options = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {  
                            textStyle: {
                                color: 'rgba(0,0,0,0.45)',
                            } 
                        }, 
                    },
                    yAxis: {
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(0,0,0,0.45)',
                                fontSize: 14,
                            }
                        },
                        type: 'category',
                        // data: ['桂林海关', '河池海关', '柳州海关', '玉林海关', '北海海关', '永口海关']
                        data: dataList.data.date
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            color: '#5AD8A6',
                            // data: [0, 2.34, 2.90, 1.04, 13.44, 6.30],
                            data: dataList.data.data,
                            label: {
                                show: true,
                                position: 'right'
                            },
                        },
                    ]
                };
            } else if (type == 3) {
                // 纵向柱状图
                options = {
                    xAxis: {
                        type: 'category',
                        // data: ['监察室', '商品检验处', '卫生检疫处',
                        // '企业管理和稽查处', '监督内审处', '综合业务处','动植物和视频检验检疫处','关税处','风险防控分局','统计分析处'
                        // ],
                        data: dataList.data.date,
                        axisTick: {show:false},
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0.5)',
                            }   
                        },
                        axisLabel: {
                            interval: 0, // 强制文字产生间隔
                            rotate: -20,
                        },
                    },
                    yAxis: {
                        axisLine: {show:false},
                        axisTick: {show:false},
                        type: 'value',
                        max: function(value) {
                            return value.max + 200
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(0,0,0,0.45)',
                                fontSize: 14,
                            }
                        },
                    },
                    series: [{
                        // data: [120, 0, 150, 80, 70, 110, 130,120,130,150],
                        data: dataList.data.data,
                        type: 'bar',
                        color: '#F6BD16',
                        label: {
                            show: true,
                            position: 'top'
                        },
                    }]
                };
            } else if (type == 4) {
                // 折线图
                options = {
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
                            symbolSize: 8,// 拐点大小
                            symbol: 'circle',// 拐点形状
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
                            itemStyle: {
                                normal: {
                                    color: dataList.color,
                                    // color: '#5B8FF9',
                                    borderColor:'#fff',//拐点边框颜色
                                    borderWidth:2,//拐点边框大小
                                    lineStyle: {
                                        // color: '#5B8FF9',
                                        color: dataList.color
                                    }
                                },
                                // 鼠标悬浮拐点样式修改
                                emphasis:{
                                    // color: '#5B8FF9',
                                    color: dataList.color,
                                    borderColor: '#fff',
                                    borderWidth: 4,
                                }
                            },
                            // data: [800, 700, 600, 500, 400, 330, 300, 280],
                            data: dataList.data.data,
                        }
                    ]
                };
            }
            return options
        }
    }
}
</script>

<style lang="scss" scoped>
   
    /deep/{
        .el-select .el-input {
            // width: 130px;
            width: 100%;
        }
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
        .el-input__prefix {
            left: unset;
            right: 5px ;
        }
        .el-input--prefix .el-input__inner  {
            padding-left: 15px;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
           background: none; 
           color: #409EFF;
        }
        .el-pagination.is-background .el-pager li {
            background: none;
        }
        .el-pager li {
            border: 1px solid #DCDFE6;
        }
        .el-pager li.active {
            border-color: #409EFF;
        }
        .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
            background: none;
            border: 1px solid #DCDFE6;
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
            .charts-div {
                height: 33.3%;
                width: 100%;
            }
            .charts {
                width: 100%;
                height: 85%;
            }
        }
    }
</style>
export default {
    tablesHeader: [
        {
            prop: 'customsName',
            label: '单位',
            sortable: true
            // width: '220'
        },
        {
            prop: 'warningNum',
            label: '预警信息数量(条)',
            width: '120',
            sortable: true
        },
        {
            prop: 'seperateWarningNum',
            label: '分拨/处理预警信息数量（条）',
            width: '130',
            sortable: true
        },
        {
            prop: 'dueWarningNum',
            label: '截止当前办结预警信息数量',
            width: '130',
            sortable: true
        },
        {
            prop: 'closingRate',
            label: '办结率（%）',
            sortable: true
        }
    ],
    totalTablesHeader: [
        {
            prop: 'department',
            label: '单位',
        },
        {
            prop: 'month',
            label: '统计月份',
        },
        {
            prop: 'warningNum',
            label: '预警信息数量(条)',
            sortable: true,
            width: '100'
        },
        {
            prop: 'seperateWarningNum',
            label: '分拨/处理预警信息数量(条)',
            sortable: true,
            width: '130'
        },
        {
            prop: 'dueWarningNum',
            label: '截止当前办结预警信息数量',
            sortable: true,
            width: '120'
        },
        {
            prop: 'department',
            label: '办结率（%）',
            sortable: true,
            width: '100'
        },
        {
            prop: 'timeOut',
            label: '超办理时限(15天)单数',
            sortable: true,
        },
        {
            prop: 'hours',
            label: '24小时分拨率(隶属)',
            sortable: true,
        },
        {
            prop: 'remark',
            label: '备注',
        },
    ],
    totalTablesHeader2: [
        {
            prop: 'alarmId',
            label: '预警单号',
        },
        {
            prop: 'indexCode',
            label: '指标编码',
        },
        {
            prop: 'customsName',
            label: '关区',
            width: '100'
        },
        {
            prop: 'modelName',
            label: '职能处室',
            width: '130'
        },
        {
            prop: 'alarmContent',
            label: '预警内容',
            width: '120'
        },
        {
            prop: 'alarmTime',
            label: '预警开始时间',
            sortable: true,
            width: '90'
        },
        {
            prop: 'mdate',
            label: '预警结束时间',
            sortable: true,
            width: '90'
        },
        {
            prop: 'hours',
            label: '半节时长(单位: 小时)',
            sortable: true,
        },
        // {
        //     prop: 'status',
        //     label: '状态',
        // },
    ],
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
            department: '防城海关', // 单位
            month: 202104, // 统计月份
            warningNum: 1419, // 预警信息数量(条)
            seperateWarningNum: 1419, // 分拨/处理预警信息数量(条)
            dueWarningNum: 21, // 截止当前办结预警信息数量
            closingRate: 1.48, // 办结率（%）
            timeOut: 11, // 超办理时限(15天)单数
            hours: '-', // 24小时分拨率(隶属)
            remark: '-' // 备注
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
    totalTableData2: [
        {
            warningNum: 'Y321053100049463', 
            indexCode: '-',
            offZone: '北海海关',
            department: '关税处',
            content: '-', 
            startTime: 20210515, 
            endTime: 20210523, 
            hours: 192, 
            status: '处置中'
        },
        {
            warningNum: 'Y321053100049472', 
            indexCode: '-',
            offZone: '北海海关',
            department: '综合业务处',
            content: '-', 
            startTime: 20210515, 
            endTime: 20210523, 
            hours: 192, 
            status: '处置中'
        },
        {
            warningNum: 'Y321053100049487', 
            indexCode: '-',
            offZone: '北海海关',
            department: '口岸监管处',
            content: '-', 
            startTime: 20210515, 
            endTime: 20210523, 
            hours: 192, 
            status: '处置中'
        },
        {
            warningNum: 'Y321053100049466', 
            indexCode: '-',
            offZone: '北海海关',
            department: '动植物和食品检验检疫处',
            content: '-', 
            startTime: 20210515, 
            endTime: 20210523, 
            hours: 192, 
            status: '处置中'
        },
        {
            warningNum: 'Y321053100049456', 
            indexCode: '-',
            offZone: '北海海关',
            department: '风险防控分局',
            content: '-', 
            startTime: 20210515, 
            endTime: 20210523, 
            hours: 192, 
            status: '处置中'
        },
    ],
    options: [{
        value: '2',
        label: '职能部门'
      }, {
        value: '1',
        label: '隶属海关'
      }],
    options2: [{
        value: '2',
        label: '职能部门',
        children: [
            {
                value: '3',
                label: '税务部', 
            }
        ]
    },
    {
        value: '1',
        label: '隶属海关',
        children: [
            {
                value: '4',
                label: '北海海关',
            }
        ]
    },
    ],
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
}
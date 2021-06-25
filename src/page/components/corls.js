export default {
    tablesHeader: [
        {
            prop: 'department',
            label: '单位',
            sortable: true
            // width: '220'
        },
        {
            prop: 'warningNum',
            label: '预警信息数量(数量)',
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
    options: [{
        value: '防城海关',
        label: '防城海关'
    }, {
        value: '钦州港海关',
        label: '钦州港海关'
    }, {
        value: '友谊关海关',
        label: '友谊关海关'
    }, {
        value: '北海海关',
        label: '北海海关'
    }, {
        value: '梧州海关',
        label: '梧州海关'
    }]
}
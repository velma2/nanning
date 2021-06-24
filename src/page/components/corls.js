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
    ]
}
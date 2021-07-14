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
            prop: 'closingRate',
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
            prop: 'endTime',
            label: '办节时长(单位: 小时)',
            sortable: true,
        },
        // {
        //     prop: 'status',
        //     label: '状态',
        // },
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
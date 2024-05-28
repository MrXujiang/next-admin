const commonSchema = ({base = [], interact = [], data = []} = {}) => {
    const curBase = [
        {
            type: 'CopyText',
            text: 'ID',
            field: 'id',
            size: 'half'
        },
        {
            type: 'Input',
            text: '名称',
            field: 'name',
            size: 'half'
        },
        {
            type: 'Number',
            text: 'x',
            field: 'x',
            size: 'half'
        },
        {
            type: 'Number',
            text: 'y',
            field: 'y',
            size: 'half'
        },
        {
            type: 'Number',
            text: '宽',
            field: 'w',
            size: 'half',
            min: 0,
        },
        {
            type: 'Number',
            text: '高',
            field: 'h',
            size: 'half',
            min: 0,
        },
        {
            type: 'Number',
            text: '层级',
            field: 'zIndex',
            size: 'half'
        },
        {
            type: 'Number',
            text: '旋转',
            field: 'rotate',
            size: 'half',
        },
        ...base,
        {
            type: 'FourInput',
            text: '阴影',
            field: 'shadow',
            size: 'block'
        },
        {
            type: 'Number',
            text: '透明度',
            field: 'opacity',
            size: 'half',
            min: 0,
            max: 100,
            width: 60
        },
        {
            type: 'Switch',
            text: '可见性',
            field: 'visible',
            size: 'half',
            options: ['可见', '隐藏'],
            defaultValue: true
        },
        {
            type: 'Switch',
            text: '锁定',
            field: 'lock',
            size: 'half',
            options: [],
            defaultValue: false
        },
        {
            type: 'Select',
            text: '访问权限',
            field: 'auth',
            size: 'block',
            defaultValue: 'all',
            options: [
                {
                    label: '所有人',
                    value: 'all'
                },
                {
                    label: '平台注册用户',
                    value: 'plat'
                },
                {
                    label: '仅自己',
                    value: 'only'
                }
            ]
        },
    ]
    return {
        base: curBase,
        animation: [
            {
                type: 'AnimateSelect',
                text: '动画类型',
                field: 'animate',
                size: 'block'
            },
            {
                type: 'NumberAndSelect',
                text: '动画次数',
                field: 'count',
                size: 'block',
                min: 0,
                options: [
                    { label: '指定次数', value: 'count' }, { label: '循环', value: 'infinite' }
                ]
            },
            {
                type: 'Number',
                text: '动画时长',
                field: 'time',
                size: 'block',
                min: 0
            },
            {
                type: 'Number',
                text: '延迟时间',
                field: 'delay',
                size: 'block',
                min: 0
            },
        ],
        interact: [
            {
                type: 'AttrPanel',
                text: '鼠标经过',
                field: 'mouseover',
                attrs: ['w', 'h', 'zIndex', 'rotate', 'shadow'],
                size: 'block',
            },
            {
                type: 'EventList',
                text: '鼠标单机',
                field: 'click',
                size: 'block',
            },
            ...interact
        ],
        data: [
            {
                type: 'Radio',
                text: '数据类型',
                field: 'datatype',
                size: 'block',
                options: [
                    {label: '静态', value: 'static'}, {label: '动态', value: 'dynamic'}, {label: '数据源', value: 'datasource'}
                ]
            },
            {
                type: 'Switch',
                text: '埋点',
                field: 'track',
                size: 'block'
            },
            ...data
        ]
    }
}

export default commonSchema
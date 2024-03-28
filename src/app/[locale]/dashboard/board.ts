const barData = [
    { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
    { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
    { name: 'RELEASING', value: 48, washaway: 0 },
  ];

const barLineData = [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 },
  ];

  const pieData = [
    { item: '事例一', count: 40, percent: 0.4 },
    { item: '事例二', count: 21, percent: 0.21 },
    { item: '事例三', count: 17, percent: 0.17 },
    { item: '事例四', count: 13, percent: 0.13 },
    { item: '事例五', count: 9, percent: 0.09 },
  ];

  const choData = [
    {
      source: '北京',
      target: '天津',
      value: 30,
    },
    {
      source: '北京',
      target: '上海',
      value: 80,
    },
    {
      source: '北京',
      target: '河北',
      value: 46,
    },
    {
      source: '北京',
      target: '辽宁',
      value: 49,
    },
    {
      source: '北京',
      target: '黑龙江',
      value: 69,
    },
    {
      source: '北京',
      target: '吉林',
      value: 19,
    },
    {
      source: '天津',
      target: '河北',
      value: 62,
    },
    {
      source: '天津',
      target: '辽宁',
      value: 82,
    },
    {
      source: '天津',
      target: '上海',
      value: 16,
    },
    {
      source: '上海',
      target: '黑龙江',
      value: 16,
    },
    {
      source: '河北',
      target: '黑龙江',
      value: 76,
    },
    {
      source: '河北',
      target: '内蒙古',
      value: 24,
    },
    {
      source: '内蒙古',
      target: '北京',
      value: 32,
    },
  ];


const boardList = [
    {
        id: '1',
        w: 'calc(30% - 16px)',
        h: 320,
        type: 'bar',
        data: barData
    },
    {
        id: '3',
        w: 'calc(34% - 16px)',
        h: 320,
        type: 'pie',
        data: pieData
    },
    {
        id: '5',
        w: 'calc(36% - 16px)',
        h: 320,
        type: 'chord',
        data: choData
    },

    {
        id: '6',
        w: 'calc(42% - 16px)',
        h: 320,
        type: 'path',
        data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
            transform: [
            {
                type: 'venn',
                padding: 8,
                sets: 'sets',
                size: 'size',
                as: ['key', 'path'],
            },
            ],
        }
    },
    {
        id: '2',
        w: 'calc(58% - 16px)',
        h: 320,
        type: 'barline',
        data: barLineData
    },
]

export default boardList
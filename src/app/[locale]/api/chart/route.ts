import {  NextRequest } from 'next/server'
import { sleep } from '@/utils';

const boardList = [
    {
        id: '1',
        w: 'calc(30% - 16px)',
        h: 320,
        type: 'bubble-bar',
        data: {
            type: 'static',
            value: [43, 2, 5, 24, 53, 78, 82, 63, 49, 6]
        }
    },
    {
        id: '2',
        w: 'calc(34% - 16px)',
        h: 320,
        type: 'select-bar',
        data: {
            type: 'static',
            value: [43, 2, 5, 24, 53, 78, 82, 63, 49, 6]
        }
    },
    {
        id: '3',
        w: 'calc(36% - 16px)',
        h: 320,
        type: 'insert-bar',
        data: {
            type: 'static',
            value: [43, 2, 5, 24, 53, 78, 82, 63, 49, 6]
        }
    },

    {
        id: '4',
        w: 'calc(42% - 16px)',
        h: 320,
        type: 'timing',
        data: {
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/bmw-prod/7fbb7084-cf34-4e7c-91b3-09e4748dc5e9.json',
        }
    },
    {
        id: '5',
        w: 'calc(58% - 16px)',
        h: 320,
        type: 'mutiFrame',
        data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/stocks2.json'
        }
    },
]

// 模拟用户获取数据
export async function GET(req: NextRequest) {
    const plainData: any[] = [];
    const asyncData:any[] = [];
    const resultData: any[] = [];
    boardList.forEach(v => {
        if(v.data.type === 'fetch') {
            asyncData.push(v);
        }else {
            plainData.push({...v, data: v.data.value});
        }
    });
    asyncData.forEach(v => {
        fetch(v.data.value).then(res => res.json()).then(res => {
            resultData.push({...v, data: res})
        })
    });

    await sleep();

    return Response.json({ data: [...plainData, ...resultData]})
    
}
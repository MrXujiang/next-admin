import { useEffect, useRef } from 'react';
import createChart from './tool';
import { isDev } from '@/utils';

interface IChart {
    type: string,
    id: string,
    data: any
}

const MyChart = (props: IChart) => {
    const chartRef = useRef<any>(null);
    const { type, data, id } =props;
    useEffect(() => {
        let chart:any;
        // 避免在开发环境渲染两次
    if(isDev) {
        let curCache = localStorage.getItem(id);
        if(!curCache) {
            localStorage.setItem(id, '1');
            chart = createChart(chartRef.current, type, data);
        } 
    }else {
        chart = createChart(chartRef.current, type, data);
    }
    return () => {
        localStorage.removeItem(id);
        chart && chart.destroy();
    }
    }, [type, data, id]);
    return <div ref={chartRef}></div>
}

export default MyChart
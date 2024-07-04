import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

const LineChart = (props: any) => {
    const ref = useRef<any>(null);
    const { data } = props;
    useEffect(() => {
        if(!data.length) return

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
          });
          
          chart
            .cell()
            .data(data)
            .encode('x', 'name')
            .encode('y', 'value')
            .axis('x', {title: '名称'})
            .axis('y', {title: '值'})
            .scale('color', { type: 'ordinal' })
            .encode('color', 'index')
            .style('stroke', '#000')
            .style('inset', 2)
            .animate('enter', { type: 'fadeIn' });
          
          
          chart.render();
          return () => {
            chart.destroy();
          }
    }, [data])
    return <div ref={ref} style={{width: '70%', height: '70%', paddingTop: 12}}></div>
}

  export default LineChart
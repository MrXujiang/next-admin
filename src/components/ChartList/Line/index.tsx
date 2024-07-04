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
            .data(data)
            .encode('x', 'name')
            .encode('y', 'value')
            .axis('x', {title: '名称'})
            .axis('y', {title: '值'})
            .scale('x', {
              range: [0, 1],
            })
            .scale('y', {
              domainMin: 0,
              nice: true,
            });
          
          chart.line().label({
            text: 'value',
            style: {
              dx: -10,
              dy: 12,
            },
          });
          
          chart.point().style('fill', 'white').tooltip(false);
          
          chart.render();
          return () => {
            chart.destroy();
          }
    }, [data])
    return <div ref={ref} style={{width: '70%', height: '70%', paddingTop: 12}}></div>
}

  export default LineChart
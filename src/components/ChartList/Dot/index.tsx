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
            .point()
            .data(data)
            .encode('x', 'name')
            .encode('y', 'value')
            .axis('x', {title: '名称'})
            .axis('y', {title: '值'})
            .encode('color', 'value')
            .encode('shape', 'point')
            .scale('color', {
              palette: 'rdBu',
              offset: (t) => 1 - t,
            })
            .style('stroke', '#000')
            .style('strokeOpacity', 0.2)
            .tooltip([
              { channel: 'x', name: '名称' },
              { channel: 'y', name: '值' },
            ]);
          
          
          chart.render();
          return () => {
            chart.destroy();
          }
    }, [data])
    return <div ref={ref} style={{width: '70%', height: '70%', paddingTop: 12}}></div>
}

  export default LineChart
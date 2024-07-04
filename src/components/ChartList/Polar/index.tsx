import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

const PolarChart = (props: any) => {
    const ref = useRef<any>(null);
    const { data } = props;
    useEffect(() => {
        if(!data.length) return

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
          });

          chart.coordinate({ type: 'polar' });
          
          chart
            // .interval()
            .data(data.map((v:any) => ({...v, type: '值'})))
            .scale('x', { padding: 0.5, align: 0 })
            .scale('y', { tickCount: 5, domainMin: 0, domainMax: 100 })
            .axis('x', {
              grid: true,
              gridLineWidth: 1,
              tick: false,
              gridLineDash: [0, 0],
            })
            .axis('y', {
              zIndex: 1,
              title: false,
              gridLineWidth: 1,
              gridLineDash: [0, 0],
              gridAreaFill: (dataum: any, index: number, data: any) => {
                return index % 2 === 1 ? 'rgba(0, 0, 0, 0.04)' : '';
              },
            });

            chart
            .line()
            .encode('x', 'name')
            .encode('y', 'value')
            .encode('color', 'type')
            .style('lineWidth', 2);
          
          chart
            .point()
            .encode('x', 'name')
            .encode('y', 'value')
            .encode('color', 'type')
            .encode('shape', 'point')
            .encode('size', 3)
            .tooltip(null);
          
          chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });
          
          
          chart.render();
          return () => {
            chart.destroy();
          }
    }, [data])
    return <div ref={ref} style={{width: '70%', height: '70%', paddingTop: 12}}></div>
}

  export default PolarChart
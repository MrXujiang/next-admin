import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

const PieChart = (props: any) => {
    const ref = useRef<any>(null);
    const { data } = props;
    useEffect(() => {
        if(!data.length) return

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
          });

          chart.coordinate({ type: 'radial', innerRadius: 0.1, endAngle: Math.PI });
          
          chart
            .interval()
            .data(data.map((v:any) => ({ ...v, percent: v.value / 100})))
            .encode('x', 'name')
            .encode('y', 'percent')
            // .transform({ type: 'stackY' })
            .encode('color', 'percent')
            .style('stroke', 'white')
            .scale('color', {
              range: '#BAE7FF-#1890FF-#0050B3',
            })
            .axis('y', { tickFilter: (d: string, i: number) => i !== 0, title: '比例' })
            .axis('x', {title: '名称'})
            .legend({
              color: {
                length: 400,
                position: 'bottom',
                layout: { justifyContent: 'center' },
              },
            })
            .animate('enter', { type: 'waveIn', duration: 800 });
          
          
          chart.render();
          return () => {
            chart.destroy();
          }
    }, [data])
    return <div ref={ref} style={{width: '70%', height: '70%', paddingTop: 12}}></div>
}

  export default PieChart
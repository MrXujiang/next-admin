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
          
          chart
            .wordCloud()
            .data(data.map((v:any) => ({...v, text: v.name})))
            .layout({
              spiral: 'rectangular',
              fontSize: [20, 100],
            })
            .encode('color', 'name');
          
          
          chart.render();
          return () => {
            chart.destroy();
          }
    }, [data])
    return <div ref={ref} style={{width: '70%', height: '70%', paddingTop: 12}}></div>
}

  export default PolarChart
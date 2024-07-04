import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';
import WebFont from 'webfontloader';

const PieChart = (props: any) => {
    const ref = useRef<any>(null);
    const { data, draw } = props;
    useEffect(() => {
        if(!data.length) return

        if(draw) {
          WebFont.load({
            google: {
              families: ['Gaegu'],
            },
            active: () => {
              const chart = new Chart({
                container: ref.current,
                autoFit: true,
                paddingLeft: 60,
                plugins: [new Plugin()],
              });
  
              chart.coordinate({ type: 'theta', outerRadius: 0.8 });
          
              chart
                .interval()
                .data(data.map((v:any) => ({item: v.name, count: v.value, percent: v.value / 100})))
                .transform({ type: 'stackY' })
                .encode('y', 'percent')
                .encode('color', 'item')
                .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
                .label({
                  position: 'outside',
                  text: (data: any) => `${data.item}: ${data.percent * 100}%`,
                })
                .tooltip((data) => ({
                  name: data.item,
                  value: `${data.percent * 100}%`,
                })); 
            
            chart.render();
              
            },
          });
        }

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
          });

          chart.coordinate({ type: 'theta', outerRadius: 0.8 });
          
          chart
            .interval()
            .data(data.map((v:any) => ({item: v.name, count: v.value, percent: v.value / 100})))
            .transform({ type: 'stackY' })
            .encode('y', 'percent')
            .encode('color', 'item')
            .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
            .label({
              position: 'outside',
              text: (data: any) => `${data.item}: ${data.percent * 100}%`,
            })
            .tooltip((data) => ({
              name: data.item,
              value: `${data.percent * 100}%`,
            }));
          
          
          chart.render();
          return () => {
            chart.destroy();
          }
    }, [data, draw])
    return <div ref={ref} style={{width: '70%', height: '70%', paddingTop: 12}}></div>
}

  export default PieChart
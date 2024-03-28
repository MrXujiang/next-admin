import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';
import { bubbleSort, selectionSort, insertionSort } from '@/utils/index';

const createChart = (el: HTMLElement, type: string, data: any[]) => {
    const chart = new Chart({ container: el, autoFit: true });

    if(type === 'bar') {
        chart.options({
            type: "interval",
            autoFit: true,
            data,
            encode: { x: "name", y: "value", color: "name", size: 60 },
            style: {
              radiusTopLeft: 20,
              radiusTopRight: 20,
              radiusBottomRight: 0,
              radiusBottomLeft: 0,
            },
          });
    }

    if(type === 'barline') {
        chart.data(data);
        chart
        .interval()
        .encode('x', 'time')
        .encode('y', 'waiting');

        chart
        .line()
        .encode('x', 'time')
        .encode('y', 'people')
        .encode('shape', 'smooth')
        .style('stroke', '#fdae6b')
        .style('lineWidth', 2)
        .scale('y', { independent: true })
        .axis('y', {
            position: 'right',
            grid: null,
            title: 'People',
            titleFill: '#fdae6b',
        });
    }

    if(type === 'pie') {
        chart.coordinate({ type: 'theta', outerRadius: 0.8 });

        chart
        .interval()
        .data(data)
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
    }

    if(type === 'liquid') {
        chart.liquid().data(0.581).style({
            contentFill: '#000',
            contentText: data,
            contentStroke: '#fff',
            contentLineWidth: 2,
            outlineBorder: 4,
            outlineDistance: 8,
            waveLength: 128,
          });
    }

    if(type === 'chord') {
        chart
            .chord()
            .data({
                value: { links: data },
            })
            .layout({
                nodeWidthRatio: 0.05,
            })
            .scale('color', { range: schemeTableau10 })
            .style('labelFontSize', 15)
            .style('linkFillOpacity', 0.6);
    }

    if(type === 'path') {
        chart
            .path()
            .data(data)
            .encode('d', 'path')
            .encode('color', 'key')
            .label({
                position: 'inside',
                text: (d: any) => d.label || '',
                transform: [{ type: 'contrastReverse' }],
            })
            .style('opacity', (d: any) => (d.sets.length > 1 ? 0.001 : 0.5))
            .state('inactive', { opacity: 0.2 })
            .state('active', { opacity: 0.8 })
            .interaction('elementHighlight', true)
            .legend(false);
    }

    // 动态部分
    if(type === 'bubble-bar') {
        const keyframe = chart.timingKeyframe();
        // @ts-ignore
        for (const frame of bubbleSort(data)) {
        keyframe
            .interval()
            .data(frame.map((datum: any, index: number) => ({ index, ...datum })))
            .encode('x', 'index')
            .encode('y', 'value')
            .encode('key', 'value')
            .encode('color', 'swap');
        }
    }

    if(type === 'select-bar') {
        const keyframe = chart.timingKeyframe();
        // @ts-ignore
        for (const frame of selectionSort(data)) {
            keyframe
                .interval()
                .data(frame.map((datum:any, index: number) => ({ index, ...datum })))
                .encode('x', 'index')
                .encode('y', 'value')
                .encode('key', 'value')
                .encode('color', 'swap');
        }
    }

    if(type === 'insert-bar') {
        const keyframe = chart.timingKeyframe();
        // @ts-ignore
        for (const frame of insertionSort(data)) {
            keyframe
                .interval()
                .data(frame.map((datum:any, index: number) => ({ index, ...datum })))
                .encode('x', 'index')
                .encode('y', 'value')
                .encode('key', 'value')
                .encode('color', 'swap');
        }
    }

    if(type === 'timing') {
        const padding = (node:any) =>
        node.attr('paddingRight', 120).attr('paddingLeft', 70);

        const encode = (node:any) =>
            node
                .encode('shape', 'smooth')
                .encode('x', (d:any) => new Date(d.date))
                .encode('y', 'unemployed')
                .encode('color', 'industry')
                .encode('key', 'industry');

        const utcX = (node:any) => node.scale('x', { utc: true });

        const keyframe = chart
        .timingKeyframe()
        .attr('direction', 'alternate')
        .attr('iterationCount', 2);

        keyframe
        .facetRect()
        .call(padding)
        .attr('paddingBottom', 60)
        .data(data)
        .encode('y', 'industry')
        .area()
        .attr('class', 'area')
        .attr('frame', false)
        .call(encode)
        .call(utcX)
        .scale('y', { facet: false })
        .style('fillOpacity', 1)
        .animate('enter', { type: 'scaleInY' });

        keyframe
        .area()
        .call(padding)
        .data(data)
        .attr('class', 'area')
        .transform({ type: 'stackY', reverse: true })
        .call(encode)
        .call(utcX)
        .style('fillOpacity', 1);

        keyframe
        .area()
        .call(padding)
        .data(data)
        .attr('class', 'area')
        .call(encode)
        .call(utcX)
        .style('fillOpacity', 0.8);
    }

    if(type === 'mutiFrame') {
        const keyframes = [
            facetLine,
            facetArea,
            stackArea,
            layerArea,
            streamgraph,
            normalizeArea,
            normalizeBar,
            groupBar,
            stackBar,
            bar,
            pie,
            rose,
          ];
          chart.options({
            type: 'timingKeyframe',
            width: 800,
            children: keyframes.map((plot) => {
              // @ts-ignore
              const { children, ...options } = plot(data);
              return {
                theme: 'dark',
                paddingLeft: 40,
                paddingBottom: 50,
                paddingRight: 50,
                ...options,
                ...(children && {
                  children: children.map((d: any) => ({ ...d, theme: 'dark' })),
                }),
              };
            }),
          });
    }
    
    
    chart.render();

    return chart
}

function facetLine(data: any[]) {
    return {
      type: 'facetRect',
      data,
      encode: { y: 'symbol' },
      axis: { y: { title: false } },
      children: [
        {
          type: 'line',
          key: 'line',
          encode: {
            x: (d: any) => new Date(d.date),
            y: 'price',
            color: 'symbol',
            key: 'symbol',
          },
          frame: false,
          scale: { y: { zero: true, tickCount: 3 } },
          axis: { x: { title: false }, y: { title: false } },
          animate: { enter: { type: 'pathIn' } },
          style: { shape: 'smooth' },
        },
      ],
    };
  }
  
  function facetArea(data: any[]) {
    return {
      type: 'facetRect',
      data,
      encode: { y: 'symbol' },
      axis: { y: { title: false } },
      children: [
        {
          type: 'line',
          key: 'line',
          frame: false,
          encode: {
            x: (d: any) => new Date(d.date),
            y: 'price',
            color: 'symbol',
            key: 'symbol',
          },
          style: { shape: 'smooth' },
          axis: { x: { title: false }, y: { title: false } },
          scale: { y: { zero: true, facet: false, tickCount: 3 } },
        },
        {
          type: 'area',
          key: 'area',
          class: 'area',
          frame: false,
          encode: {
            x: (d: any) => new Date(d.date),
            y: 'price',
            color: 'symbol',
            key: 'symbol',
          },
          style: { shape: 'smooth' },
          scale: { y: { facet: false, zero: true, tickCount: 3 } },
          axis: { x: { title: false }, y: { title: false } },
          animate: { exit: { type: 'fadeOut' } },
        },
      ],
    };
  }
  
  function stackArea(data: any[]) {
    return {
      type: 'area',
      data,
      key: 'area',
      class: 'area',
      transform: [{ type: 'stackY', reverse: true }],
      axis: { y: { title: false } },
      encode: {
        x: (d: any) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      style: { shape: 'smooth' },
    };
  }
  
  function layerArea(data: any[]) {
    return {
      type: 'area',
      key: 'area',
      class: 'area',
      data,
      axis: { y: { title: false } },
      encode: {
        x: (d: any) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      style: { fillOpacity: 0.5, shape: 'smooth' },
    };
  }
  
  function streamgraph(data: any[]) {
    return {
      type: 'area',
      key: 'area',
      class: 'area',
      data,
      axis: { y: { title: false } },
      transform: [{ type: 'stackY', reverse: true }, { type: 'symmetryY' }],
      encode: {
        x: (d: any) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      style: { fillOpacity: 1, shape: 'smooth' },
    };
  }
  
  function normalizeArea(data: any[]) {
    return {
      type: 'area',
      key: 'area',
      class: 'area',
      data,
      axis: { y: { title: false } },
      transform: [{ type: 'stackY', reverse: true }, { type: 'normalizeY' }],
      encode: {
        x: (d: any) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      style: { fillOpacity: 1, shape: 'smooth' },
    };
  }
  
  function normalizeBar(data: any[]) {
    return {
      type: 'interval',
      data,
      encode: {
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      transform: [
        { type: 'groupColor', y: 'sum' },
        { type: 'stackY', reverse: true },
        { type: 'normalizeY' },
      ],
      scale: { x: { padding: 0 } },
      axis: { y: { title: false }, x: { title: false } },
    };
  }
  
  function groupBar(data: any[]) {
    return {
      type: 'interval',
      data,
      transform: [{ type: 'dodgeX' }],
      encode: {
        x: 'date',
        y: 'price',
        color: 'symbol',
        groupKey: 'symbol',
        key: (_:any, i: number) => i,
      },
      scale: { y: { nice: true } },
      axis: { x: false, y: { title: false } },
    };
  }
  
  function stackBar(data: any[]) {
    return {
      type: 'interval',
      data,
      transform: [{ type: 'stackY' }],
      encode: {
        x: 'date',
        y: 'price',
        color: 'symbol',
        groupKey: 'symbol',
        key: (_: any, i: number) => i,
      },
      axis: { x: false, y: { title: false } },
    };
  }
  
  function bar(data: any[]) {
    return {
      type: 'interval',
      data,
      transform: [{ type: 'groupX', y: 'sum' }],
      encode: {
        x: 'symbol',
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      axis: {
        y: { labelFormatter: '~s', title: false },
        x: { title: false },
      },
    };
  }
  
  function pie(data: any[]) {
    return {
      type: 'interval',
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      data,
      transform: [{ type: 'groupX', y: 'sum' }, { type: 'stackY' }],
      coordinate: { type: 'theta' },
      encode: {
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      legend: { color: { layout: { justifyContent: 'center' } } },
      style: { radius: 10 },
    };
  }
  
  function rose(data: any[]) {
    return {
      type: 'interval',
      data,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      transform: [{ type: 'groupX', y: 'sum' }],
      coordinate: { type: 'polar' },
      encode: {
        x: 'symbol',
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      scale: { x: { padding: 0 } },
      style: { radius: 10 },
      legend: { color: { layout: { justifyContent: 'center' } } },
      axis: { y: false },
    };
  }

export default createChart
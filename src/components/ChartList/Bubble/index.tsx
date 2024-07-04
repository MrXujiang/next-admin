// @ts-nocheck
import { useEffect, useRef } from 'react';
import * as G6 from '@antv/g6';


interface IBubbleProps {
    data?: any
}

const BubbleChart = (props: IBubbleProps) => {
    const chartRef = useRef<any>(null);
    const { data = [] } = props;

    useEffect(() => {
        let showNodes: any = [];
        let nodes = [];
        let nodeMap = new Map();
        let highlighting = false;
        const width = chartRef.current.scrollWidth;
        const height = chartRef.current.scrollHeight || 500;
        
        const LIMIT_OVERFLOW_WIDTH = width;
        const LIMIT_OVERFLOW_HEIGHT = height;
        
        const mapNodeSize = (nodes: any, propertyName: string, visualRange: any) => {
          let minp = 9999999999;
          let maxp = -9999999999;
          nodes.forEach((node: any) => {
            minp = node[propertyName] < minp ? node[propertyName] : minp;
            maxp = node[propertyName] > maxp ? node[propertyName] : maxp;
          });
          const rangepLength = maxp - minp;
          const rangevLength = visualRange[1] - visualRange[0];
          nodes.forEach((node: any) => {
            node.size = ((node[propertyName] - minp) / rangepLength) * rangevLength + visualRange[0];
          });
        };
        
        const lightColors = [
          '#8FE9FF',
          '#87EAEF',
          '#FFC9E3',
          '#A7C2FF',
          '#FFA1E3',
          '#FFE269',
          '#BFCFEE',
          '#FFA0C5',
          '#D5FF86',
        ];
        const darkColors = [
          '#7DA8FF',
          '#44E6C1',
          '#FF68A7',
          '#7F86FF',
          '#AE6CFF',
          '#FF5A34',
          '#5D7092',
          '#FF6565',
          '#6BFFDE',
        ];
        const uLightColors = [
          '#CFF6FF',
          '#BCFCFF',
          '#FFECF5',
          '#ECFBFF',
          '#EAD9FF',
          '#FFF8DA',
          '#DCE2EE',
          '#FFE7F0',
          '#EEFFCE',
        ];
        const uDarkColors = [
          '#CADBFF',
          '#A9FFEB',
          '#FFC4DD',
          '#CACDFF',
          '#FFD4F2',
          '#FFD3C9',
          '#EBF2FF',
          '#FFCBCB',
          '#CAFFF3',
        ];
        
        const gColors: string[] = [];
        const unlightColorMap = new Map();
        lightColors.forEach((lcolor, i) => {
          gColors.push('l(0) 0:' + lcolor + ' 1:' + darkColors[i]);
          unlightColorMap.set(gColors[i], 'l(0) 0:' + uLightColors[i] + ' 1:' + uDarkColors[i]);
        });
        
        let graph: any;
        const layoutCfg = {
          type: 'force',
          nodeSize: (d: any) => {
            return d.size / 2 + 5;
          },
          nodeStrength: 2500,
          collideStrength: 0.8,
          alphaDecay: 0.01,
          preventOverlap: true,
          onTick: () => {
            const nodeItems = graph.getNodes();
            const height = graph.get('height');
            const width = graph.get('width');
            const padding = 10;
            nodeItems.forEach((item: any) => {
              const model = item.getModel();
              if (model.x > width - padding) model.x = width - padding;
              else if (model.x < padding) model.x = padding;
        
              if (model.y > height - padding) model.y = height - padding;
              else if (model.y < padding) model.y = padding;
            });
          },
        };
        // @ts-ignore
        G6.registerBehavior('double-finger-drag-canvas', {
          getEvents: function getEvents() {
            return {
              wheel: 'onWheel',
            };
          },
        
          onWheel: (ev: any) => {
            if (ev.ctrlKey) {
              const canvas = graph.get('canvas');
              const point = canvas.getPointByClient(ev.clientX, ev.clientY);
              let ratio = graph.getZoom();
              if (ev.wheelDelta > 0) {
                ratio = ratio + ratio * 0.05;
              } else {
                ratio = ratio - ratio * 0.05;
              }
              graph.zoomTo(ratio, {
                x: point.x,
                y: point.y,
              });
            } else {
              const x = ev.deltaX || ev.movementX;
              const y = ev.deltaY || ev.movementY || (-ev.wheelDelta * 125) / 3;
              translate(x, y);
            }
            ev.preventDefault();
          },
        });
        
        // @ts-ignore
        G6.registerNode(
          'bubble',
          {
            drawShape(cfg: any, group: any) {
              const self: any = this;
              const r = cfg.size / 2;
              // a circle by path
              const path = [
                ['M', -r, 0],
                ['C', -r, r / 2, -r / 2, r, 0, r],
                ['C', r / 2, r, r, r / 2, r, 0],
                ['C', r, -r / 2, r / 2, -r, 0, -r],
                ['C', -r / 2, -r, -r, -r / 2, -r, 0],
                ['Z'],
              ];
              const keyShape = group.addShape('path', {
                attrs: {
                  x: 0,
                  y: 0,
                  path,
                  fill: cfg.color || 'steelblue',
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'path-shape',
              });
        
              const mask = group.addShape('path', {
                attrs: {
                  x: 0,
                  y: 0,
                  path,
                  opacity: 0.25,
                  fill: cfg.color || 'steelblue',
                  shadowColor: cfg.color.split(' ')[2].substr(2),
                  shadowBlur: 40,
                  shadowOffsetX: 0,
                  shadowOffsetY: 30,
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'mask-shape',
              });
        
              const spNum = 10; // split points number
              const directions: number[] = [],
                rs: number[] = [];

              self.changeDirections(spNum, directions);
              for (let i = 0; i < spNum; i++) {
                const rr = r + directions[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
                if (rs[i] < 0.97 * r) rs[i] = 0.97 * r;
                else if (rs[i] > 1.03 * r) rs[i] = 1.03 * r;
                rs.push(rr);
              }
              keyShape.animate(
                () => {
                  const path = self.getBubblePath(r, spNum, directions, rs);
                  return { path };
                },
                {
                  repeat: true,
                  duration: 10000,
                },
              );
        
              const directions2: number[] = [],
                rs2: number[] = [];
              self.changeDirections(spNum, directions2);
              for (let i = 0; i < spNum; i++) {
                const rr = r + directions2[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
                if (rs2[i] < 0.97 * r) rs2[i] = 0.97 * r;
                else if (rs2[i] > 1.03 * r) rs2[i] = 1.03 * r;
                rs2.push(rr);
              }
              mask.animate(
                () => {
                  const path = self.getBubblePath(r, spNum, directions2, rs2);
                  return { path };
                },
                {
                  repeat: true,
                  duration: 10000,
                },
              );
              return keyShape;
            },
            changeDirections(num: number, directions: number[]) {
              for (let i = 0; i < num; i++) {
                if (!directions[i]) {
                  const rand = Math.random();
                  const dire = rand > 0.5 ? 1 : -1;
                  directions.push(dire);
                } else {
                  directions[i] = -1 * directions[i];
                }
              }
              return directions;
            },
            getBubblePath(r: number, spNum: number, directions: number[], rs: number[]) {
              const path = [];
              const cpNum = spNum * 2; // control points number
              const unitAngle = (Math.PI * 2) / spNum; // base angle for split points
              let angleSum = 0;
              const sps = [];
              const cps = [];
              for (let i = 0; i < spNum; i++) {
                const speed = 0.001 * Math.random();
                rs[i] = rs[i] + directions[i] * speed * r; // +-r/6, the sign according to the directions
                if (rs[i] < 0.97 * r) {
                  rs[i] = 0.97 * r;
                  directions[i] = -1 * directions[i];
                } else if (rs[i] > 1.03 * r) {
                  rs[i] = 1.03 * r;
                  directions[i] = -1 * directions[i];
                }
                const spX = rs[i] * Math.cos(angleSum);
                const spY = rs[i] * Math.sin(angleSum);
                sps.push({ x: spX, y: spY });
                for (let j = 0; j < 2; j++) {
                  const cpAngleRand = unitAngle / 3;
                  const cpR = rs[i] / Math.cos(cpAngleRand);
                  const sign = j === 0 ? -1 : 1;
                  const x = cpR * Math.cos(angleSum + sign * cpAngleRand);
                  const y = cpR * Math.sin(angleSum + sign * cpAngleRand);
                  cps.push({ x, y });
                }
                angleSum += unitAngle;
              }
              path.push(['M', sps[0].x, sps[0].y]);
              for (let i = 1; i < spNum; i++) {
                path.push([
                  'C',
                  cps[2 * i - 1].x,
                  cps[2 * i - 1].y,
                  cps[2 * i].x,
                  cps[2 * i].y,
                  sps[i].x,
                  sps[i].y,
                ]);
              }
              path.push(['C', cps[cpNum - 1].x, cps[cpNum - 1].y, cps[0].x, cps[0].y, sps[0].x, sps[0].y]);
              path.push(['Z']);
              return path;
            },
            // @ts-ignore
            setState(name: string, value: number, item: any) {
              const shape = item.get('keyShape');
              if (name === 'dark') {
                if (value) {
                  if (shape.attr('fill') !== '#fff') {
                    shape.oriFill = shape.attr('fill');
                    const uColor = unlightColorMap.get(shape.attr('fill'));
                    shape.attr('fill', uColor);
                  } else {
                    shape.attr('opacity', 0.2);
                  }
                } else {
                  if (shape.attr('fill') !== '#fff') {
                    shape.attr('fill', shape.oriFill || shape.attr('fill'));
                  } else {
                    shape.attr('opacity', 1);
                  }
                }
              }
            },
          },
          'single-node',
        );
        // @ts-ignore
        graph = new G6.Graph({
          container: chartRef.current,
          width,
          height,
          // @ts-ignore
          linkCenter: true,
          layout: layoutCfg,
          modes: {
            default: ['drag-canvas'],
          },
          defaultNode: {
            type: 'bubble',
            size: 95,
            labelCfg: {
              position: 'center',
              style: {
                fill: 'white',
                fontStyle: 'bold',
              },
            },
          },
        });
        graph.get('canvas').set('localRefresh', false);
        
        function translate(x: number, y: number) {
          let moveX = x;
          let moveY = y;
        
          /* 获得当前偏移量*/
          const group = graph.get('group');
          const bbox = group.getBBox();
          const leftTopPoint = graph.getCanvasByPoint(bbox.minX, bbox.minY);
          const rightBottomPoint = graph.getCanvasByPoint(bbox.maxX, bbox.maxY);
          /* 如果 x 轴在区域内，不允许左右超过100 */
          if (x < 0 && leftTopPoint.x - x > LIMIT_OVERFLOW_WIDTH) {
            moveX = 0;
          }
          if (x > 0 && rightBottomPoint.x - x < width - LIMIT_OVERFLOW_WIDTH) {
            moveX = 0;
          }
        
          if (y < 0 && leftTopPoint.y - y > LIMIT_OVERFLOW_HEIGHT) {
            moveY = 0;
          }
          if (y > 0 && rightBottomPoint.y - y < height - LIMIT_OVERFLOW_HEIGHT) {
            moveY = 0;
          }
          graph.translate(-moveX, -moveY);
        }
        
        function refreshDragedNodePosition(e: any) {
          const model = e.item.get('model');
          model.fx = e.x;
          model.fy = e.y;
        }
        graph.on('node:dragstart', (e: any) => {
          graph.layout();
          refreshDragedNodePosition(e);
        });
        graph.on('node:drag', (e: any) => {
          refreshDragedNodePosition(e);
        });
        graph.on('node:dragend', (e: any) => {
          e.item.get('model').fx = null;
          e.item.get('model').fy = null;
        });
        
        const loadData = (data: any) => {
          const layoutController = graph.get('layoutController');
          layoutController.layoutCfg.nodeStrength = 2500;
          layoutController.layoutCfg.collideStrength = 0.8;
          layoutController.layoutCfg.alphaDecay = 0.01;
          nodes = data.nodes;
        
          showNodes = [];
          nodeMap = new Map();
          // find the roots
          nodes.forEach((node: any) => {
            if (node.level === 0) {
              node.color = gColors[showNodes.length % gColors.length];
              node.style = {
                fill: gColors[showNodes.length % gColors.length],
                lineWidth: 0,
              };
              node.labelCfg = {
                style: {
                  fontSize: 25,
                  fill: '#fff',
                  fontWeight: 500,
                },
              };
              node.x = Math.random() * 800;
              node.y = Math.random() * 800;
              showNodes.push(node);
            }

            const num = node.value ? `\n(${node.value})` : '';
            node.label = `${node.name}${num}`;

            nodeMap.set(node.id, node);
          });
        
          mapNodeSize(showNodes, 'value', [120, 180]);
        
          nodes.forEach((node: any) => {
            if (node.level !== 0) {
              const parent = nodeMap.get(node.tags[0]);
              node.color = parent.color;
              node.style = {
                fill: parent.color,
              };
            }
          });
          graph.data({
            nodes: showNodes,
            edges: [],
          });
          graph.render();
        };
        
        graph.on('node:mouseenter', (e: any) => {
          const item = e.item;
          const model = item.getModel();
          if (model.level === 0) {
            return;
          }
          highlighting = true;
          graph.setAutoPaint(false);
          const nodeItems = graph.getNodes();
          const edgeItems = graph.getEdges();
          nodeItems.forEach((node: any) => {
            graph.setItemState(node, 'dark', true);
            node.getModel().light = false;
          });
          graph.setItemState(item, 'dark', false);
          model.light = true;
          const tags = model.tags;
          const findTagsMap = new Map();
          let mid = 0;
        
          // find the tags
          tags.forEach((t: string) => {
            const ts = t.split('-');
            findTagsMap.set(ts[0], mid);
            mid++;
            if (ts[1]) {
              findTagsMap.set(ts[1], mid);
              mid++;
            }
          });
          // find the nodes with tag === tags[?]
          nodeItems.forEach((item: any) => {
            const node = item.getModel();
            if (findTagsMap.get(node.tag) !== undefined) {
              graph.setItemState(item, 'dark', false);
              node.light = true;
            }
          });
          edgeItems.forEach((item: any) => {
            const source = item.getSource().getModel();
            const target = item.getTarget().getModel();
            if (source.light && target.light) {
              graph.setItemState(item, 'dark', false);
            } else {
              graph.setItemState(item, 'dark', true);
            }
          });
          graph.paint();
          graph.setAutoPaint(true);
        });
        
        graph.on('node:mouseleave', () => {
          if (highlighting) {
            const nodeItems = graph.getNodes();
            const edgeItems = graph.getEdges();
            highlighting = false;
            nodeItems.forEach((item: any) => {
              graph.setItemState(item, 'dark', false);
            });
            edgeItems.forEach((item: any) => {
              graph.setItemState(item, 'dark', false);
            });
          }
        });

        if(!data.nodes) {
            return () => {
                graph.destroy();
            }
        }
        
        loadData(data);

        return () => {
            graph.destroy();
        }
    }, [data])

    
    return <div ref={chartRef} style={{width: '100%', height: '100%'}}></div>
    
                
                
            
}

export default BubbleChart
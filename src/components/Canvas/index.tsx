
// @ts-nocheck
import { deepFlat } from "@daybrush/utils";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Selecto from "react-selecto";
import { Tooltip, theme, Button } from 'antd';
import { HolderOutlined } from '@ant-design/icons';
import Moveable, { MoveableTargetGroupsType, DraggableRequestParam } from "react-moveable";
import { GroupManager, TargetList } from "@moveable/helper";
import { useKeycon } from "react-keycon";
import Draggable from 'react-draggable';
import { memoryManage } from '@/utils/index';
import toolbar from "./toolbar";
import { hideElementById } from '@/utils/dom';
import styles from './index.less';

interface IProps {
    width: number,
    height: number,
    schema?: any,
    onItemClick?: (row: any) => void,
    onItemDrop?: (row: any) => void,
}

export default function Canvas(props: IProps) {
    const { width, height, onItemDrop, schema, onItemClick } = props;
    const {
        token: { colorBgContainer, borderRadius, colorTextLabel },
      } = theme.useToken();
    const { isKeydown: isCommand } = useKeycon({ keys: "meta" });
    const { isKeydown: isShift } = useKeycon({ keys: "shift" });
    const groupManager = useMemo<GroupManager>(() => new GroupManager([]), []);
    const [targets, setTargets] = useState<MoveableTargetGroupsType>([]);
    const [canvasSize, setCanvasSize] = useState([width, height]);
    const moveableRef = useRef<Moveable>(null);
    const selectoRef = useRef<Selecto>(null);
    const canvasRef = useRef<any>(null);

    const cubes = useMemo(() => {
        return Object.values(schema)
    }, [schema])

    const setSelectedTargets = useCallback((nextTargetes: MoveableTargetGroupsType) => {
        selectoRef.current!.setSelectedTargets(deepFlat(nextTargetes));
        setTargets(nextTargetes);
    }, []);

    const handleOperate = (key: string) => {
        if(key === 'group') {
            const nextGroup = groupManager.group(targets, true);
            if (nextGroup) {
                setTargets(nextGroup);
            }
            return
        }
        if(key === 'ungroup') {
            const nextGroup = groupManager.ungroup(targets);

            if (nextGroup) {
                setTargets(nextGroup);
            }
            return 
        }

        if(key === 'top') {
            const rect = moveableRef.current!.getRect();
            // console.log(rect)
            const moveables = moveableRef.current!.getMoveables();

            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request<DraggableRequestParam>("draggable", {
                    y: rect.top,
                }, true);
            });

            moveableRef.current?.updateRect();
            return
        }

        if(key === 'bottom') {
            const rect = moveableRef.current!.getRect();
            const moveables = moveableRef.current!.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request<DraggableRequestParam>("draggable", {
                    y: rect.top + rect.height - (child.props?.target ? (child.props.target as any).offsetHeight : 0),
                }, true);
            });
            moveableRef.current?.updateRect();
            return
        }

        if(key === 'left') {
            const rect = moveableRef.current!.getRect();
            const moveables = moveableRef.current!.getMoveables();

            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request<DraggableRequestParam>("draggable", {
                    x: rect.left,
                }, true);
            });

            moveableRef.current?.updateRect();
            return 
        }

        if(key === 'right') {
            const rect = moveableRef.current!.getRect();
            const moveables = moveableRef.current!.getMoveables();

            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request<DraggableRequestParam>("draggable", {
                    x: rect.left + rect.width - (child.props?.target ? (child.props.target as any).offsetWidth : 0),
                }, true);
            });

            moveableRef.current?.updateRect();
            return 
        }

        if(key === 'h-center') {
            const rect = moveableRef.current!.getRect();
            const moveables = moveableRef.current!.getMoveables();

            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach((child, i) => {
                child.request<DraggableRequestParam>("draggable", {
                    y: rect.top + rect.height / 2 - rect.children![i].height / 2,
                }, true);
            });

            moveableRef.current?.updateRect();
            return
        }

        if(key === 'v-center') {
            const rect = moveableRef.current!.getRect();
            const moveables = moveableRef.current!.getMoveables();

            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach((child, i) => {
                child.request<DraggableRequestParam>("draggable", {
                    x: rect.left + rect.width / 2 - rect.children![i].width / 2,
                }, true);
            });

            moveableRef.current?.updateRect();
            return 
        }

        if(key === 'v-space') {
            const groupRect = moveableRef.current!.getRect();
            const moveables = moveableRef.current!.getMoveables();
            let top = groupRect.top;

            if (moveables.length <= 1) {
                return;
            }
            const gap = (groupRect.height - groupRect.children!.reduce((prev, cur) => {
                return prev + cur.height;
            }, 0)) / (moveables.length - 1);

            moveables.sort((a, b) => {
                return a.state.top - b.state.top;
            });
            moveables.forEach(child => {
                const rect = child.getRect();

                child.request<DraggableRequestParam>("draggable", {
                    y: top,
                }, true);

                top += rect.height + gap;
            });


            moveableRef.current?.updateRect();
            return
        }

        if(key === 'h-space') {
            const groupRect = moveableRef.current!.getRect();
            const moveables = moveableRef.current!.getMoveables();
            let left = groupRect.left;

            if (moveables.length <= 1) {
                return;
            }
            const gap = (groupRect.width - groupRect.children!.reduce((prev, cur) => {
                return prev + cur.width;
            }, 0)) / (moveables.length - 1);

            moveables.sort((a, b) => {
                return a.state.left - b.state.left;
            });
            moveables.forEach(child => {
                const rect = child.getRect();

                child.request<DraggableRequestParam>("draggable", {
                    x: left,
                }, true);

                left += rect.width + gap;
            });

            moveableRef.current?.updateRect();
            return
        }

    }

    const handleDrop = (event) => {
        // 阻止默认行为（会作为某些元素的链接打开）
        event.preventDefault();
        // 将被拖动的元素移动到选定的放置目标
        if(/(wep-area|cube)/.test(event.target.className)) {
            const data = event.dataTransfer.getData("text");
            const raw = JSON.parse(data);
            const transform = `translate(${event.offsetX - raw.width / 2}px, ${event.offsetY - raw.height / 2}px)`;
            onItemDrop && onItemDrop({...raw, transform});
            
            event.dataTransfer.clearData();
            // 隐藏滑块
            hideElementById('cube_holder_block');
            memoryManage.remove('curDragItem');
            return
        }
    }

    const handleDragover = (event) => {
        // 阻止默认行为以允许放置
        event.preventDefault();
        const curItem = memoryManage.get('curDragItem') || {};
        const block = document.querySelector('#cube_holder_block');
        const size = {width: curItem.width || 100, height: curItem.height || 100};
        if(block.style.display !== 'inline-block') {
            block.style.display = 'inline-block';
            block.style.width = `${size.width}px`;
            block.style.height = `${size.height}px`;
        }
        
        block.style.transform = `translate(${event.offsetX - size.width / 2}px, ${event.offsetY - size.height / 2}px)`;
    }

    useEffect(() => {
        const elements = selectoRef.current!.getSelectableElements();
        groupManager.set([], elements);
    }, []);

    useEffect(() => {
        if(canvasRef.current) {
            canvasRef.current.addEventListener('dragover', handleDragover, false)

            canvasRef.current.addEventListener("drop", handleDrop, false);
            return () => {
                canvasRef.current?.removeEventListener("drop", handleDrop, false);
                canvasRef.current?.removeEventListener("dragover", handleDragover, false);
            }
        }
        
    }, [canvasRef.current, schema]);

    useEffect(() => {
        setCanvasSize([width, height]);
    }, [width, height])

    return <>
        <Draggable
            handle="#js_toolbar"
            // defaultPosition={{x: 18, y: 10}}
            scale={1}
        >
            <div className={styles.toolBar} style={{display: 'inline-block', background: colorBgContainer, borderRadius, padding: 4, marginBottom: 12}}>
                <span id="js_toolbar" style={{cursor: 'move', color: colorTextLabel, fontSize: 14}}><HolderOutlined /></span>
                {
                    toolbar.base.map(v => {
                        return <Tooltip key={v.key} title={v.text}>
                            <Button className={styles.item} type="text" size="small" style={{color: colorTextLabel}} onClick={() => handleOperate(v.key)}>
                                <span style={{pointerEvents: 'none'}}>{ v.icon }</span>
                            </Button>
                        </Tooltip>
                    })
                }
            </div>
        </Draggable>
        <div className={styles.canvasWrap}>
            <Moveable
                ref={moveableRef}
                draggable={true}
                rotatable={true}
                // 内容是否支持缩放
                scalable={false}
                // warpable={true}
                throttleResize={1}
                target={targets}
                snappable={true}
                throttleDrag={1}
                edgeDraggable={false}
                startDragRotate={0}
                throttleDragRotate={0}
                resizable={true}
                keepRatio={false}
                throttleScale={0}
                renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                throttleRotate={0}
                rotationPosition={"top"}
                originDraggable={true}
                originRelative={true}
                snapDirections={{
                top: true,
                left: true,
                bottom: true,
                right: true,
                center: true,
                middle: true,
            }}
            elementSnapDirections={{
                top: true,
                left: true,
                bottom: true,
                right: true,
                center: true,
                middle: true,
            }}
            maxSnapElementGuidelineDistance={200}
            elementGuidelines={cubes.map(v => ({
                element: `.${v.id}`,
                // className: "red",
            }))}
            onDragOrigin={e => {
                e.target.style.transformOrigin = e.transformOrigin;
            }}
            onClick={e => {
                console.log(111, e.target.id)
            }}
            onResize={e => {
                const id = e.target.id;
                
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                // e.target.style.transform = e.drag.transform;
            }}
            onResizeEnd={e => {
                requestAnimationFrame(() => {
                    const rect = e.moveable.getRect();  
                    console.log(rect)
                });
            }}
                    // onWarp={e => {
                    //     console.log(e)
                    //     e.target.style.transform = e.transform;
                    // }}
            onRender={e => {
                e.target.style.transform = e.transform;
            }}
            onDrag={e => {
                // console.log(e.target.id)
                e.target.style.transform = e.transform;
            }}
            onRenderGroup={e => {
                console.log(e.events)
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}
            onClickGroup={e => {
                
                if (!e.moveableTarget) {
                    setSelectedTargets([]);
                    return;
                }
                if (e.isDouble) {
                    const childs = groupManager.selectSubChilds(targets, e.moveableTarget);

                    setSelectedTargets(childs.targets());
                    return;
                }
                if (e.isTrusted) {
                    selectoRef.current!.clickTarget(e.inputEvent, e.moveableTarget);
                }
            }}
            ></Moveable>
            <Selecto
                ref={selectoRef}
                // dragContainer={container.current}
                selectableTargets={[".wep-area .cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    const flatted = deepFlat(targets);

                    if (
                        target.tagName === "BUTTON"
                        || moveable.isMoveableElement(target)
                        || flatted.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                    e.data.startTargets = targets;
                }}
                onSelect={e => {
                    const {
                        startAdded,
                        startRemoved,
                        isDragStartEnd,
                    } = e;

                    if (isDragStartEnd) {
                        return;
                    }
                    const nextChilds = groupManager.selectSameDepthChilds(
                        e.data.startTargets,
                        startAdded,
                        startRemoved,
                    );

                    setSelectedTargets(nextChilds.targets());
                }}
                onSelectEnd={e => {
                    const {
                        isDragStartEnd,
                        isClick,
                        added,
                        removed,
                        inputEvent,
                    } = e;
                    const moveable = moveableRef.current!;

                    if (isDragStartEnd) {
                        inputEvent.preventDefault();

                        moveable.waitToChangeTarget().then(() => {
                            moveable.dragStart(inputEvent);
                        });
                    }
                    let nextChilds: TargetList;

                    if (isDragStartEnd || isClick) {
                        if (isCommand) {
                            nextChilds = groupManager.selectSingleChilds(targets, added, removed);
                        } else {
                            nextChilds = groupManager.selectCompletedChilds(targets, added, removed, isShift);
                        }
                        
                    } else {
                        nextChilds = groupManager.selectSameDepthChilds(e.data.startTargets, added, removed);
                    }
                    e.currentTarget.setSelectedTargets(nextChilds.flatten());
                    setSelectedTargets(nextChilds.targets());
                }}
            ></Selecto>
            <div className={`${styles.canvas} wep-area`} ref={canvasRef} style={{background: colorBgContainer, width: canvasSize[0], height: canvasSize[1], borderRadius }}>
                {cubes.map(i => <div className={`cube ${i.id} ${styles.item}`} key={i.id} id={i.id} style={{
                    width: i.base.width,
                    height: i.base.height,
                    transform: i.base.transform
                }}>
                    { i.name === 'Button' && <Button type="primary">Next-Admin</Button> }
                    {/* { i.name === 'Image' && <img src="/qtcode.png" alt="next-admin drag and drop" /> } */}
                    { i.name === 'Image' && <img src="/logo_bg.svg" alt="next-admin drag and drop" /> }
                </div>)}
                <span id="cube_holder_block"></span>
            </div>
        </div>
    </>
    
}
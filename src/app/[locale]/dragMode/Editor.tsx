'use client'

import { useState, useEffect, useRef, ReactNode } from 'react';
import { Button, Modal, Input, Upload, Radio, type UploadProps, message, theme, type RadioChangeEvent, Layout, Divider, Tooltip, Popover, Typography, Spin, Affix } from 'antd';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import Draggable from 'react-draggable';
import LeftBar from './components/LeftBar';
import ConfigBar from '@/components/Attr/FormRender';
import {
    HolderOutlined
} from '@ant-design/icons';
import WaterPanel, { type WatermarkConfig } from '@/components/WaterPanel';
import Canvas from '@/components/Canvas';
import { saveAs } from 'file-saver';
import { uniqueId } from '@/utils';
import styles from './index.module.less';

const { Content } = Layout;

interface IEditorType {
    isPreview?: boolean
}

const EditorWrap = (props: IEditorType) => {
    const {
        token: { colorBgContainer, borderRadius, colorTextLabel, colorFillContentHover, colorTextBase, colorLink },
      } = theme.useToken();

    const { isPreview = true } = props;
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isLoading, setLoading] = useState(true);

    const [showDownload, setShowDownload] = useState(false);

    const [curDownType, setCurDownType] = useState(1);

    const [waterShow, setWaterShow] = useState(false);
    const [waterConfig, setWaterConfig] = useState<any>();
    const [configPanelX, setConfigPanelX] = useState(0);
    const [canvasPanelX, setCanvasPanelX] = useState(0);
    const [canvasSize, setCanvasSize] = useState([600, 500]);
    const [pageSchema, setPageSchema] = useState<any>({});
    const [formValues, setFormValues] = useState<any>({});

    const editorRef = useRef<any>(null);

    const pid = searchParams.get('id');
    const uid = searchParams.get('uid');

    const setPageState = (key: string, value: any) => {
        switch(key) {
            case 'pageSchema':
                setPageSchema(value);
                break;
        }
    }

    const onDownloadChange = (e: RadioChangeEvent) => {
        setCurDownType(e.target.value);
    }

    const handleDownload = () => {
        const now = Date.now();
        if(curDownType === 1) {
            editorRef.current.save().then((data: any) => {
                const blob = new Blob([JSON.stringify(data || "{}", null, 4)], { type: "application/json" })
                saveAs(blob, `${now}.json`);
            })
            return
        }

    }

    const handleDownloadCancel = () => {
        setShowDownload(false);
    }

    const handleWaterModalClose = () => {
        setWaterShow(false);
    }

    const handleWaterChange = (data: WatermarkConfig) => {
        setWaterConfig(data);
    }

    const handleBack = () => {
        router.push('/home')
    }

    const handleFormChange = (type: string, values: any) => {
        setFormValues((prev:any) => {
            return {
                ...prev,
                [type]: values
            }
        })
    }

    const handleDragStart = (row: any) => {
        console.log(row);
    }

    const handleDrop = (row: any) => {
        const id = uniqueId();
        const { type, text, auth, cate, width, height, transform } = row;
        setPageState('pageSchema', {
            ...pageSchema,
            [id]: {
                id,
                type,
                text,
                base: {
                    auth, cate, width, height,
                    transform
                }
            }
        })
    }

    useEffect(() => {
        const width = document.body.offsetWidth;
        const configPanelW = 260;
        const configX = width - configPanelW - 50;
        setConfigPanelX(configX);
        const leftBarW = 312;
        const left = 18;
        const restArea = configX - leftBarW - left;
        const restGap = restArea - canvasSize[0];
        const canvasX = leftBarW + left + restGap / 2;
        setCanvasPanelX(canvasX);
        
    }, [])

    return <div className={styles.editWrap}>
                
                <div className={styles.editBox} style={{marginTop: 30}}>
                    <Draggable
                        handle="#js_left_bar"
                        defaultPosition={{x: 18, y: 10}}
                        scale={1}
                    >
                        <div style={{position: 'absolute', display: 'inline-block'}}>
                            <span id="js_left_bar" style={{color: colorTextLabel}}><HolderOutlined /></span>
                            <LeftBar onDragStart={handleDragStart} />
                        </div>
                    </Draggable>


                    <WaterPanel visible={waterShow} onChange={handleWaterChange} onClose={handleWaterModalClose} value={waterConfig}>
                        <div className={styles.canvasBox} style={{position: 'absolute', display: 'inline-block', left: canvasPanelX, top: 12}}>
                            <Canvas width={canvasSize[0]} height={canvasSize[1]} onItemDrop={handleDrop} schema={pageSchema} />
                        </div>
                    </WaterPanel>

                    {
                        configPanelX ? <Draggable
                            handle="#js_canvas_bar"
                            defaultPosition={{x: configPanelX, y: 10}}
                            scale={1}
                        >
                            <div style={{position: 'absolute', display: 'inline-block'}}>
                                <Content 
                                    style={{
                                        background: colorBgContainer, 
                                        padding: 16, 
                                        borderRadius,
                                        width: 270
                                    }}
                                >      
                                    <span id="js_canvas_bar" style={{color: colorTextLabel}}><HolderOutlined /></span>
                                    <ConfigBar onChange={handleFormChange} values={formValues} /> 
                                </Content>
                            </div>
                        </Draggable> : null
                    }

                    
                    
                </div>
                <Modal title="下载内容" open={showDownload} onOk={handleDownload} onCancel={handleDownloadCancel} okText="确定" cancelText="取消">
                    <div className={styles.download}>
                    <Radio.Group onChange={onDownloadChange} defaultValue={1}>
                        <Radio value={1}>JSON</Radio>
                        <Radio value={2}>HTML</Radio>
                    </Radio.Group>
                    </div>
                </Modal>
            </div>
}

export default EditorWrap
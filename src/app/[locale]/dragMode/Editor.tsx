'use client'

import { useState, useEffect, useRef, ReactNode } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import schema from './mock';
import Canvas from '@/components/Canvas';
import styles from './index.module.less';

interface IEditorType {
    isPreview?: boolean
}

const EditorWrap = (props: IEditorType) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [canvasPanelX, setCanvasPanelX] = useState(0);
    const [canvasSize, setCanvasSize] = useState([1000, 500]);
    const [pageSchema, setPageSchema] = useState<any>(schema);

    useEffect(() => {
        // 调度 + 计算画布位置
        const width = document.body.offsetWidth;
        const configPanelW = 200;
        const configX = width - configPanelW - 50;
        const leftBarW = 200;
        const left = 18;
        const restArea = configX - leftBarW - left;
        const restGap = restArea - canvasSize[0];
        const canvasX = leftBarW + left + restGap / 2;
        setCanvasPanelX(canvasX);
        
    }, [])

    return <div className={styles.editWrap}>
                <div className={styles.editBox}>
                    <div className={styles.canvasBox} style={{position: 'absolute', display: 'inline-block', left: 0, top: 0}}>
                        <Canvas width={canvasSize[0]} height={canvasSize[1]} schema={pageSchema} />
                    </div>
                </div>
            </div>
}

export default EditorWrap
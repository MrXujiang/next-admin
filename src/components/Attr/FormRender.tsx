import { useState, useEffect, useRef, useMemo, ReactNode } from 'react';
import { Tabs, Button, Modal, Input, Upload, Radio, type UploadProps, message, theme, Tooltip, Popover, Spin } from 'antd';
import type { TabsProps } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    
} from '@ant-design/icons';
import FormEngine from './Form';
import getSchema from './schema';
// import { } from './api';
import styles from './index.module.less';

interface IAttrType {
    schema?: {
        base: any,
        animation?: any,
        interact: any,
        data: any
    },
    values?: any,
    onChange?: (type: keyof IAttrType['schema'] | string, values: any) => void
}

const FormRender = (props: IAttrType) => {
    const {
        token: { colorBgContainer, colorTextLabel, colorFillContentHover, colorTextBase },
      } = theme.useToken();
    const { schema, values = {}, onChange } = props;
    const configSchema = getSchema(schema);

    const items = useMemo(() => {
        const configSchema = getSchema(schema);
        return [
            {
                label: '基础',
                key: 'base',
                children: <FormEngine 
                            schema={configSchema.base} 
                            onChange={(values) => handleFormChange('base', values)} 
                            values={values.base}
                        />,
            },
            {
                label: '动画',
                key: 'animation',
                children: <Scrollbars 
                    style={{ width: 272, height: 520 }}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                >
                    <FormEngine 
                        schema={configSchema.animation} 
                        onChange={(values) => handleFormChange('animation', values)}
                        values={values.base}
                     />
                </Scrollbars>    
            },
            {
                label: '交互',
                key: 'interact',
                children: ['qqqqqqqqqqqqqqq'],
            },
            {
                label: '数据',
                key: 'data',
                children: ['qqqqqqqqqqqqqqq'],
            }
        ]
    }, [schema])

    const handleFormChange = (type: keyof IAttrType['schema'] | string, values: any) => {
        onChange && onChange(type, values)
    }
    

    return <div className={styles.configBarWrap}>
                <div style={{fontWeight: 'bold', fontSize: 14}}>属性面板</div>
                <Tabs
                    defaultActiveKey="base"
                    items={items}
                    centered
                />
            </div>
}

export default FormRender
import { useState, useEffect, useRef, useMemo, ReactNode } from 'react';
import { 
    Tabs, 
    Button, 
    ColorPicker, 
    Select, 
    InputNumber, 
    Switch, 
    Checkbox, 
    Modal, 
    Input, 
    Upload, 
    Radio, 
    Typography, 
    Space,
    Spin 
} from 'antd';
import styles from './index.module.less';

const { Text } = Typography;

const numberW = 72;

const FormItemsMap: any = {
    Input: (props: any) => <Input variant="filled" {...props} />,
    Number: (props: any) => <InputNumber variant="filled" {...props} style={{width: props.width || numberW}} />,
    CopyText: ({value}: {value: string}) => <Text copyable={{tooltips: ['复制', '复制成功']}}>{ value }</Text>,
    Switch: (props: any) => <Switch checkedChildren={props.options[0]} unCheckedChildren={props.options[1]} {...props} />,
    Select: (props: any) => {
        const { options } = props;
        return <Select
                    {...props}
                />
    },
    FourInput: (props: any) => {
        const { value = {}, onChange } = props;
        const handleColorChange = (color: any, hex: string) => {
            const rgba = color.toRgb();
            const rgbaStr = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
            const newValues = {...value, color: rgbaStr};
            onChange && onChange(newValues);

        }
        const handleChange = (idx: string, val: number | null | string) => {
            onChange && onChange({...value, [idx]: val});
        }
        return <div className={styles.shadowWrap}>
            <ColorPicker defaultValue={value.color || '#fff'} size="small" onChange={handleColorChange} /> 
            <InputNumber defaultValue={value.x || null} variant="filled" style={{width: 50}} onChange={val => handleChange('x', val)} />
            <InputNumber defaultValue={value.y || null} variant="filled" style={{width: 50}} onChange={val => handleChange('y', val)} />
            <InputNumber defaultValue={value.b || null} variant="filled" style={{width: 50}} onChange={val => handleChange('b', val)} />
        </div>
    },
    AnimateSelect: (props: any) => {
        const [loading, setLoading] = useState(false);
        const [animations, setAnimations] = useState([]);
        const { value, onChange } = props;
        const handleChange = (key: string) => {
            onChange && onChange(key);
        }
        useEffect(() => {
            setLoading(true);
            fetch('/json/animate.json').then(res => res.json()).then((res:any) => {
                setLoading(false);
                res && setAnimations(res);
            })
        }, []);
        
        return <Spin spinning={loading}>
                <div className={styles.animationWrap}>
                    {/* <div style={{width: 100, height: 100, border: '1px solid #06c'}} className={`animate__animated animate__${value}`}>123</div> */}
                    {
                        animations.map((v: any,i) => {
                            return <div key={i} className={v.name === value ? `${styles.item} ${styles.active}` : styles.item} onClick={() => handleChange(v.name)}>
                                { v.label }
                            </div>
                        })
                    }
                </div>
            </Spin>
    },
    NumberAndSelect: (props: any) => {
        const { options, min, onChange, value = [] } = props;
        const handleChange = (idx: number, val: string) => {
            value[idx] = val;
            const newValue = [...value];
            onChange && onChange(value);
        }
        return <Space.Compact>
                    <Select options={options} defaultValue={'count'} style={{width: 100}} onChange={(val) => handleChange(0, val)} value={value[0]} />
                    <InputNumber variant="filled" style={{width: 72}} min={min} onChange={(val) => handleChange(1, val)} value={value[1]}  />
                </Space.Compact>
    }
}

export default FormItemsMap
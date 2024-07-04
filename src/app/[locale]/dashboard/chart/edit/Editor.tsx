'use client'
// @ts-nocheck
import { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Spin, InputNumber, Select, Switch } from 'antd';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import mockData from './data';
import styles from './index.module.less';


interface IEditorType {
    
}

const EditorWrap = (props: IEditorType) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data2, setData2] = useState(mockData);
    const [curType, setCurType] = useState('Bubble');
    const [Component, setComponent] = useState<any>(null);
    const [draw, setDraw] = useState(false);

    const searchParams = useSearchParams();
    const uid = searchParams.get('uid');
    const isInline = !!searchParams.get('i');

    const [id, setId] = useState(searchParams.get('id'));


    const onFinish = (values: any) => {
        // console.log('Received values of form:', values);
        setData2(values.data.map((v: any) => {
            return {
                "id": v.name,
                "name": v.name,
                "level": 0,
                "value": v.value,
                "tag": v.name
            }
        }));
        
    }

    const onTypeChange = (value: string) => {
        setCurType(value);
    }

    const onChartSearch = (value: string) => {
        console.log(value)
    }

    const onStyleChange = (checked: boolean) => {
        // console.log(`switch to ${checked}`);
        setDraw(checked);
    };

    useEffect(() => {
        const Cp = () => dynamic(() => import(`@/components/ChartList/${curType}`), { ssr: false });
        setComponent(Cp);
    }, [curType]);

    
    return <Spin tip="数据保存中......" spinning={isLoading}>
        <div className={styles.editWrap} style={{margin: isInline ? '80px 0 0' : '', height: isInline ? 'calc(100vh - 80px)' : ''}}>
            <div className={styles.charts}>
                <div className={styles.controlArea}>
                    <div className={styles.formItem}>
                        <div className={styles.label}>图表类型：</div>
                        <Select
                            showSearch
                            placeholder="请选择需要的图表"
                            optionFilterProp="label"
                            defaultValue={curType}
                            onChange={onTypeChange}
                            onSearch={onChartSearch}
                            style={{width: 150}}
                            options={[
                                {
                                    value: 'Bubble',
                                    label: '气泡图',
                                },
                                {
                                    value: 'Line',
                                    label: '折线图',
                                },
                                {
                                    value: 'Bar',
                                    label: '柱状图',
                                },
                                {
                                    value: 'Pie',
                                    label: '饼图',
                                },
                                {
                                    value: 'Circle',
                                    label: '环形图',
                                },
                                {
                                    value: 'Area',
                                    label: '面积图',
                                },
                                {
                                    value: 'Dot',
                                    label: '散点图',
                                },
                                {
                                    value: 'Cell',
                                    label: '色块图',
                                },
                                {
                                    value: 'YuCircle',
                                    label: '玉环图',
                                },
                                {
                                    value: 'Polar',
                                    label: '雷达图',
                                },
                                {
                                    value: 'Word',
                                    label: '词云图',
                                },
                            ]}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <div className={styles.label}>手绘风：</div>
                        <Switch onChange={onStyleChange} disabled={!['Pie', 'Bar', 'Area'].includes(curType)} />
                        <span style={{color: 'red', fontSize: 12, marginLeft: 12}}>柱状图，饼图，面积图支持手绘风格</span>
                    </div>
                    
                </div>
                { !!Component && <Component draw={draw} data={curType === 'Bubble' ? { nodes: data2 } : data2 } /> }
                
            </div>
            <div className={styles.table}>
            <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                initialValues={{
                    data: data2.map((v: any) => {
                        return {
                            ...v,
                            name: v.name,
                            value: v.value
                        }
                    })
                }}
                autoComplete="off"
            >
                <Form.List name="data">
                {(fields, { add, remove }) => (
                    <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: '请输入字段名称' }]}
                        >
                            <Input placeholder="字段名称" />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            rules={[{ required: true, message: '请输入字段值' }]}
                        >
                            <InputNumber placeholder="字段值" min={0} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          添加数据
                        </Button>
                    </Form.Item>
                    </>
                )}
                </Form.List>
                <Form.Item>
                <Button type="primary" htmlType="submit">
                    生成
                </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    </Spin>
    
                
                
            
}

export default EditorWrap
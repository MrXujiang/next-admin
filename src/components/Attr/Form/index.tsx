import { useState, useEffect, useRef, useMemo, ReactNode } from 'react';
import { Tabs, Button, Form, Checkbox, Modal, Input, Upload, Radio, type UploadProps, message, theme, Tooltip, Popover, Spin } from 'antd';
import FormItemsMap from './FormItems';
import styles from './index.module.less';

interface IAttrType {
    schema?: any[],
    values?: any,
    onChange?: (values: any) => void
}

const FormEngine = (props: IAttrType) => {
    const { schema, onChange, values = {} } = props;
    const [form] = Form.useForm();

    const handleFormChange = (values: any) => {
        onChange && onChange(form.getFieldsValue())
    }

    useEffect(() => {
        form.setFieldsValue(values);
    }, [values])
    

    return <div className={styles.formWrap}>
                <Form
                    name="basic"
                    form={form}
                    style={{ display: 'flex', flexWrap: 'wrap' }}
                    onValuesChange={handleFormChange}
                    autoComplete="off"
                >
                    {
                        schema?.map((v, i) => {
                            const FormItem = FormItemsMap[v.type] || null;
                            return <Form.Item
                                        key={i}
                                        style={{width: v.size === 'half' ? 'calc(50% - 18px)' : '100%', marginRight: v.size === 'half' ? 9 : 26 }}
                                        label={v.text}
                                        name={v.field}
                                    >
                                        <FormItem {...v} />
                                    </Form.Item>
                        })
                    }
                </Form>
            </div>
}

export default FormEngine
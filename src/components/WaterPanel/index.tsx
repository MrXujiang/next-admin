import React, { useState, useEffect } from 'react';
import { ColorPicker, Flex, Form, Input, InputNumber, Slider, Watermark, Drawer } from 'antd';
import type { ColorPickerProps, GetProp, WatermarkProps, DrawerProps } from 'antd';

type Color = GetProp<ColorPickerProps, 'color'>;

export interface WatermarkConfig {
  content: string;
  color: string | Color;
  fontSize: number;
  zIndex: number;
  rotate: number;
  gap: [number, number];
  offset?: [number, number];
}

interface IProps {
    children: React.ReactNode;
    visible: boolean;
    value?: any;
    onChange: (value: WatermarkConfig) => void;
    onClose: () => void;
}

const WaterPanel: React.FC<IProps> = (props) => {
  const { children, visible = false, onChange, onClose, value } = props;
  const [form] = Form.useForm();
  const [config, setConfig] = useState<WatermarkConfig>({
    content: '',
    color: 'rgba(0, 0, 0, 0.15)',
    fontSize: 16,
    zIndex: 11,
    rotate: -22,
    gap: [100, 100],
    offset: undefined,
  });
  const { content, color, fontSize, zIndex, rotate, gap, offset } = config;

  const watermarkProps: WatermarkProps = {
    content,
    zIndex,
    rotate,
    gap,
    offset,
    font: { color: typeof color === 'string' ? color : color && color.toRgbString(), fontSize },
  };

  useEffect(() => {
    value && setConfig(value)
  }, [value])



  return (
    <>
      <Watermark {...watermarkProps}>
        { children }
      </Watermark>
      <Drawer
        title="水印设置"
        placement="right"
        closable={true}
        open={visible}
        onClose={onClose}
      >
        <Form
            style={{ width: 280, flexShrink: 0, borderLeft: '1px solid #eee', paddingInlineStart: 16 }}
            form={form}
            layout="vertical"
            initialValues={config}
            onValuesChange={(_, values) => {
                setConfig(values);
                onChange && onChange(values);
            }}
        >
            <Form.Item name="content" label="水印内容">
            <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="color" label="水印颜色">
            <ColorPicker />
            </Form.Item>
            <Form.Item name="fontSize" label="字体大小">
            <Slider step={1} min={1} max={100} />
            </Form.Item>
            <Form.Item name="zIndex" label="层级">
            <Slider step={1} min={0} max={100} />
            </Form.Item>
            <Form.Item name="rotate" label="旋转">
            <Slider step={1} min={-180} max={180} />
            </Form.Item>
            <Form.Item label="间隔" style={{ marginBottom: 0 }}>
            <Flex gap="small">
                <Form.Item name={['gap', 0]}>
                <InputNumber placeholder="X" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name={['gap', 1]}>
                <InputNumber placeholder="Y" style={{ width: '100%' }} />
                </Form.Item>
            </Flex>
            </Form.Item>
            <Form.Item label="偏移" style={{ marginBottom: 0 }}>
            <Flex gap="small">
                <Form.Item name={['offset', 0]}>
                <InputNumber placeholder="左部偏移" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name={['offset', 1]}>
                <InputNumber placeholder="顶部偏移" style={{ width: '100%' }} />
                </Form.Item>
            </Flex>
            </Form.Item>
        </Form>
      </Drawer>
      
    </>
  );
};

export default WaterPanel;
import { useState, useEffect, useRef, useMemo, ReactNode } from 'react';
import { Tabs, Button, Modal, Input, Upload, Radio, type UploadProps, message, theme, Tooltip, Popover, Spin } from 'antd';
import type { TabsProps } from 'antd';
import {
    BuildOutlined,
    LayoutOutlined,
    MacCommandOutlined,
    SubnodeOutlined,
    FolderOpenOutlined
} from '@ant-design/icons';
import MetaItems from '@/components/MetaItems';
import TplItems from '@/components/TplItems';
import MaterialItems from '@/components/MaterialItems';
import PluginItems from '@/components/PluginItems';
import ProjectItems from '@/components/ProjectItems';
// import { } from './api';
import styles from './index.module.less';

interface IBarType {
    onDragStart?: (row: any) => void;
}

const EditorWrap = (props: IBarType) => {
    const {
        token: { colorBgContainer, colorTextLabel, colorFillContentHover, colorTextBase, colorLink },
      } = theme.useToken();

    const { onDragStart } = props;

    const items = useMemo(() => {
        const items = [
            {
                label: '组件',
                key: 'component',
                icon: <BuildOutlined />,
                children: <MetaItems onDragStart={onDragStart} />,
            },
            {
                label: '模板',
                key: 'tpl',
                icon: <LayoutOutlined />,
                children: <TplItems />,
            },
            {
                label: '素材',
                key: 'sucai',
                icon: <MacCommandOutlined />,
                children: <MaterialItems />,
            },
            {
                label: '插件',
                key: 'plugin',
                icon: <SubnodeOutlined />,
                children: <PluginItems />,
            },
            {
                label: '项目',
                key: 'project',
                icon: <FolderOpenOutlined />,
                children: <ProjectItems />
            }
        ]
        return items
    }, [])

    const renderTabBar: TabsProps['renderTabBar'] = (props: any, DefaultTabBar: any) => (
        <DefaultTabBar {...props} style={{ background: colorBgContainer }}>
        </DefaultTabBar>
    );
    

    return <div className={styles.leftBarWrap} style={{backgroundColor: colorBgContainer}}>
                <Tabs
                    defaultActiveKey="component"
                    items={items}
                    tabPosition={'left'}
                    renderTabBar={renderTabBar}
                />
            </div>
}

export default EditorWrap
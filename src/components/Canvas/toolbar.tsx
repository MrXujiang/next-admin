import { ReactNode } from 'react';
import {
    UngroupOutlined,
    GroupOutlined,
    PlusOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    AlignCenterOutlined,
    BorderTopOutlined,
    BorderBottomOutlined,
    PicCenterOutlined
} from '@ant-design/icons';

export type ToolItemType = {
    key: string,
    icon: ReactNode,
    text: string,
}

export const defaultDESize = [
    {
        type: '手机',
        size: [375, 667]
    },
    {
        type: '电脑网页',
        size: [1024, 768]
    },
    {
        type: 'PPT',
        size: [800, 600]
    }
]

const toolbar = {
    base: [
        {
            key: 'group',
            icon: <GroupOutlined />,
            text: '成组',
        },
        {
            key: 'ungroup',
            icon: <UngroupOutlined />,
            text: '取消成组'
        },
        // {
        //     key: 'add',
        //     icon: <PlusOutlined />,
        //     text: '添加'
        // },
        {
            key: 'left',
            icon: <AlignLeftOutlined />,
            text: '左对齐'
        },
        {
            key: 'right',
            icon: <AlignRightOutlined />,
            text: '右对齐'
        },
        {
            key: 'v-center',
            icon: <AlignCenterOutlined />,
            text: '垂直居中'
        },
        {
            key: 'h-center',
            icon: <AlignCenterOutlined style={{transform: 'rotate(-90deg)'}} />,
            text: '水平居中'
        },
        {
            key: 'top',
            icon: <BorderTopOutlined />,
            text: '顶对齐'
        },
        {
            key: 'bottom',
            icon: <BorderBottomOutlined />,
            text: '底对齐'
        },
        {
            key: 'v-space',
            icon: <PicCenterOutlined />,
            text: '垂直分布空间'
        },
        {
            key: 'h-space',
            icon: <PicCenterOutlined style={{transform: 'rotate(-90deg)'}} />,
            text: '水平分布空间'
        },
        
    ]
}

export default toolbar
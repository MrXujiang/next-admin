import { FundOutlined, LayoutOutlined, BarChartOutlined, DesktopOutlined, ScheduleOutlined, CalculatorOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import React from 'react';

const navList = [
    {
        key: '/',
        icon: <DesktopOutlined />,
        label: '数据大盘',
        children: [
            {
                key: '/dashboard',
                icon: <BarChartOutlined />,
                label: '自定义报表'
            },
            {
                key: '/dashboard/monitor',
                icon: <FundOutlined />,
                label: '数据监控'
            }
        ]
    },
    {
        key: '/user',
        icon: <UserOutlined />,
        label: '用户管理'
    },
    {
        key: '/formEngine',
        icon: <CalculatorOutlined />,
        label: '表单引擎'
    },
    {
        key: '/board',
        icon: <LayoutOutlined />,
        label: '办公白板'
    },
    {
        key: '/order',
        icon: <ScheduleOutlined />,
        label: '订单列表'
    },
    {
        key: '/resource',
        icon: <WalletOutlined />,
        label: '资产管理'
    },
    
]

export default navList
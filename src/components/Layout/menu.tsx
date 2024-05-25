import { 
    FundOutlined, 
    LayoutOutlined, 
    BarChartOutlined, 
    DesktopOutlined, 
    ScheduleOutlined, 
    CalculatorOutlined, 
    UserOutlined, 
    WalletOutlined,
    BuildOutlined,
    OpenAIOutlined,
    PartitionOutlined,
    FileExcelOutlined
} from '@ant-design/icons';
import React from 'react';

const getNavList = (t: any) => {
    return [
        {
            key: '/',
            icon: <DesktopOutlined />,
            label: t('dashboard'),
            children: [
                {
                    key: '/dashboard',
                    icon: <BarChartOutlined />,
                    label: t('customChart')
                },
                {
                    key: '/dashboard/monitor',
                    icon: <FundOutlined />,
                    label: t('monitor')
                },
                {
                    key: '/dashboard/rpa',
                    icon: <PartitionOutlined />,
                    label: t('rpa')
                }
            ]
        },
        {
            key: '/user',
            icon: <UserOutlined />,
            label: t('userManage')
        },
        {
            key: '/agents',
            icon: <OpenAIOutlined />,
            label: t('agents')
        },
        {
            key: '/excel',
            icon: <FileExcelOutlined />,
            label: t('excel')
        },
        {
            key: '/formEngine',
            icon: <CalculatorOutlined />,
            label: t('formEngine')
        },
        {
            key: '/dragMode',
            icon: <BuildOutlined />,
            label: t('dragMode')
        },
        {
            key: '/board',
            icon: <LayoutOutlined />,
            label: t('board')
        },
        {
            key: '/order',
            icon: <ScheduleOutlined />,
            label: t('orderList')
        },
        {
            key: '/resource',
            icon: <WalletOutlined />,
            label: t('resource')
        },
        
    ]
}

export default getNavList
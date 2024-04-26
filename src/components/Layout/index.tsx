'use client';
import React, { useState } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, ConfigProvider, Badge, Popover, type MenuProps } from 'antd';
import getNavList from './menu';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
    BellOutlined,
    MoonOutlined,
    SunOutlined,
    TransactionOutlined
} from '@ant-design/icons';
import { getThemeBg } from '@/utils';
import { Link, pathnames, usePathname } from '../../navigation';
import styles from './index.module.less';

const { Header, Content, Footer, Sider } = Layout;

interface IProps {
    children: React.ReactNode,
    curActive: string,
    defaultOpen?: string[]
}

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          切换账户
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/user/login">
          退出登录
        </a>
      ),
    },
  ];

const CommonLayout: React.FC<IProps> = ({ children, curActive, defaultOpen = ['/'] }) => {
  const {
    token: { borderRadiusLG, colorTextBase, colorWarningText },
  } = theme.useToken();

  const t = useTranslations('global');

  const locale = useLocale();
  const otherLocale:any = locale === 'en' ? ['zh', '中'] : ['en', 'En'];

  const router = useRouter();
  const pathname = usePathname();
  const navList = getNavList(t);

  const [curTheme, setCurTheme] = useState<boolean>(false);
  const toggleTheme = () => {
        setCurTheme(prev => !prev);
  }

  const handleSelect = (row: {key: string}) => {
    router.push(row.key)
  }

  return (
    <ConfigProvider
        theme={{
        algorithm: curTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
    >
        <Layout style={{minHeight: "100vh"}}>
            <Sider
                theme={curTheme ? "dark" : "light" }
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                }}
                onCollapse={(collapsed, type) => {
                }}
            >
                <span className={styles.logo} style={getThemeBg(curTheme)}>Next-Admin</span>
                <Menu 
                    theme={curTheme ? "dark" : "light" }
                    mode="inline" 
                    defaultSelectedKeys={[curActive]} 
                    items={navList} 
                    defaultOpenKeys={defaultOpen} 
                    onSelect={handleSelect}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, ...getThemeBg(curTheme), display: 'flex' }}>
                    <div className={styles.rightControl}>
                        <span className={styles.group}>
                            <Popover content={<div style={{width: '100%'}}><img src="/tech.png" /></div>} title="技术交流&分享">
                                { t('technological exchanges') }
                            </Popover>
                        </span>
                        <span className={styles.group}>
                            <Popover content={<div style={{width: '100%'}}><img width={180} src="/pay.png" /></div>} title="开源不易，支持作者">
                            <TransactionOutlined style={{color: 'red'}} /> 赞赏作者
                            </Popover>
                        </span>
                        <span className={styles.msg}>
                            <Badge dot>
                                <BellOutlined />
                            </Badge>
                        </span>
                        <Link href={pathname as any} locale={otherLocale[0]} className={styles.i18n} style={{color: colorTextBase}}>
                            {otherLocale[1]}
                        </Link>
                        <span onClick={toggleTheme} className={styles.theme}>
                            {
                                !curTheme ? <SunOutlined style={{color: colorWarningText}} /> : <MoonOutlined />
                            }
                        </span>
                        <div className={styles.avatar}>
                        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                            <Avatar style={{color: '#fff', backgroundColor: colorTextBase}}>Admin</Avatar>
                        </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                        padding: 24,
                        minHeight: 520,
                        ...getThemeBg(curTheme),
                        borderRadius: borderRadiusLG,
                        }}
                    >
                        { children }
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Next-Admin ©{new Date().getFullYear()} Created by <a href="https://github.com/MrXujiang">徐小夕</a>
                </Footer>
            </Layout>
        </Layout>
    </ConfigProvider>
  );
};

export default CommonLayout;
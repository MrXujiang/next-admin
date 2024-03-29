'use client';
// import { useTranslations} from 'next-intl';
import { Table, theme } from 'antd';
import { useRouter } from 'next/navigation';
import AvaForm from './AvaForm';
import { columns, data } from './column';
import Layout from '@/components/Layout';
import styles from './index.module.less';


export default function User() {
  // const t = useTranslations();
  const { token } = theme.useToken();

  const listStyle: React.CSSProperties = {
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 16
  };

  return (
    <Layout curActive='/user'>
        <main className={styles.userWrap}>
            <div className={styles.content}>
               <AvaForm />
                <div style={listStyle}>
                    <h3>用户列表</h3>
                    <Table columns={columns} dataSource={data} pagination={{pageSize: 5}} />
                </div>
            </div>
        </main>
    </Layout>
    
  );
}

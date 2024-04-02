'use client';
import { useTranslations} from 'next-intl';
import { Table, theme } from 'antd';
import { useRouter } from 'next/navigation';
import AvaForm from './AvaForm';
import { columns, data } from './column';
import Layout from '@/components/Layout';
import styles from './index.module.less';


export default function User() {
  const t = useTranslations('user');
  const { token } = theme.useToken();

  const listStyle: React.CSSProperties = {
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 12
  };

  return (
    <Layout curActive='/user'>
        <main className={styles.userWrap}>
            <div className={styles.content}>
               <AvaForm />
                <div style={listStyle}>
                    <h3>{ t('userList') }</h3>
                    <Table columns={columns} dataSource={data} pagination={{pageSize: 5}} scroll={{ x: 1000 }} />
                </div>
            </div>
        </main>
    </Layout>
    
  );
}

'use client'
// import { useTranslations} from 'next-intl';
import { Button, Spin } from 'antd';
import { useState, useRef, useEffect, Suspense } from 'react';
import { checkData } from './api';
import Layout from '@/components/Layout';
import Editor from './edit/Editor';

import styles from './index.module.less';


export default function Dashboard() {
  // const t = useTranslations();
  const boardContainerRef = useRef<any>();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkData().then((res: any) => {
        setList(res.data);
        setLoading(false);
    })
  }, []);

  return (
    <Layout curActive='/dashboard/chart'>
        <main className={styles.monitorWrap}>
            <Spin tip="数据加载中..." size="large" spinning={loading}>
                <div className={styles.content} ref={boardContainerRef}>
                    <Suspense>
                        <Editor />
                    </Suspense>
                </div>
            </Spin>
        </main>
    </Layout>
    
  );
}
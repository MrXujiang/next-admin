'use client'
// import { useTranslations} from 'next-intl';
import { Button, Spin } from 'antd';
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';

import styles from './index.module.less';

const Graph = dynamic(
    async () => (await import("./core")).default,
    {
      ssr: false,
    },
);


export default function Dashboard() {
  // const t = useTranslations();
  const boardContainerRef = useRef<any>();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setLoading(false);
  }, []);

  return (
    <Layout curActive='/dashboard/rpa'>
        <main className={styles.monitorWrap}>
            <Graph />
        </main>
    </Layout>
  );
}
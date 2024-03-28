'use client'
// import { useTranslations} from 'next-intl';
import { Empty, Button } from 'antd';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';


export default function Order() {
  const router = useRouter();
  return (
    <Layout curActive='/order'>
        <main style={{minHeight: 'calc(100vh - 260px)'}}>
        <Empty
            image="/landing.svg"
            imageStyle={{ height: 410, paddingTop: 160 }}
            description={"正在建设中......"}
        >
            <Button type="primary" onClick={() => router.push('/dashboard')}>返回首页</Button>
        </Empty>
        </main>
    </Layout>
    
  );
}

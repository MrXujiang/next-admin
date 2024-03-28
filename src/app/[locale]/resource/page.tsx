'use client'
// import { useTranslations} from 'next-intl';
import { Tabs, Empty, type TabsProps } from 'antd';
import Layout from '@/components/Layout';

const MyEmpty = <Empty
    image="/landing.svg"
    imageStyle={{ height: 410, paddingTop: 160 }}
    description={"空空如也~"}
  ></Empty>

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '图片',
    children: MyEmpty,
  },
  {
    key: '2',
    label: '音频',
    children: MyEmpty,
  },
  {
    key: '3',
    label: '视频',
    children: MyEmpty,
  },
];


export default function Resource() {
  return (
    <Layout curActive='/resource'>
        <main style={{minHeight: 'calc(100vh - 260px)'}}>
          <Tabs defaultActiveKey="1" items={items} />
        </main>
    </Layout>
    
  );
}

import { useEffect, useState } from 'react'
import { theme, Tooltip, Input, Tabs, Segmented, Button, type TabsProps } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.module.less'

interface IProps {
    width?: number,
}

const MaterialList = (props: IProps) => {
  const { width = 230 } = props;
  const {
    token: { colorBgLayout, colorTextLabel, colorTextBase },
  } = theme.useToken();
  const [list, setList] = useState(() => []);
  const [curCate, setCurCate] = useState('public');

  const ListDom = <Scrollbars 
  style={{ width, height: 521 }} autoHide
  autoHideTimeout={1000}
  autoHideDuration={200}
>
  <div className={styles.list}>
    {
      new Array(20).fill(0).map((v, i:number) => {
        return <div className={styles.item} key={i}>
                <img src="/landing.svg" alt="" />
                <Button className={styles.useBtn} size="small" type="primary">使用</Button>
              </div>
      })
    }
  </div>
</Scrollbars>

  const items: TabsProps['items'] = [
    { key: 'img', label: '图片', children: ListDom
     },
    { key: 'audio', label: '音频', children: ListDom },
    { key: 'video', label: '视频', children: ListDom },
    { key: 'file', label: '文件', children: ListDom },
  ];

  const handleCateChange = (row: 'web' | 'blocks' | 'flavorite') => {
    setCurCate(row);
  }

  const handleTplCateChange = () => {

  }
  return <div className={styles.mItemWrap}>
            <Input placeholder="关键词搜索" style={{marginTop: 10, width: 'calc(100% - 16px)'}} />
            <div className={styles.cateBar}>
              <Segmented
                defaultValue={curCate}
                style={{ marginBottom: 8 }}
                onChange={(value: any) => handleCateChange(value)}
                options={[
                  {label: '公共素材', value: 'public'}, {label: '我的素材', value: 'my'}
                ]}
              />
            </div>
            <div className={styles.tplCate}>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={handleTplCateChange}
                centered
              />
            </div>
          </div>
}

export default MaterialList
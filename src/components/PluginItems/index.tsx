import { useEffect, useState } from 'react'
import { theme, Tooltip, Input, Tabs, Button, type TabsProps } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.module.less'

interface IProps {
    width?: number,
}

const PluginList = (props: IProps) => {
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
                <Button className={styles.useBtn} size="small" type="primary">安装</Button>
              </div>
      })
    }
  </div>
</Scrollbars>

  const items: TabsProps['items'] = [
    { key: 'plugin', label: '公共插件', children: ListDom
     },
    { key: 'my', label: '我的插件', children: ListDom },
  ];

  const handleTplCateChange = () => {

  }
  return <div className={styles.pluginItemWrap}>
            <Input placeholder="关键词搜索" style={{marginTop: 10, width: 'calc(100% - 16px)'}} />
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

export default PluginList
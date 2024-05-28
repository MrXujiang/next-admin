import { useEffect, useState, type DragEventHandler } from 'react'
import { theme, Tooltip } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars';
import { toolBarMap, toolbar, type ToolItemType } from './toolbar'
import { hideElementById } from '@/utils/dom';
import { memoryManage } from '@/utils/index';
import styles from './index.module.less'

interface IProps {
    width?: number,
    onDragStart?: (row: any) => void
}

const MetaList = (props: IProps) => {
  const { width = 230, onDragStart } = props;
  const {
    token: { colorBgLayout, colorTextLabel, colorTextBase },
  } = theme.useToken();
  const [list, setList] = useState(() => {
    return Object.entries(toolbar).map((v) => {
        return {
            label: toolBarMap[v[0] as keyof typeof toolBarMap],
            data: v[1]
        }
    })
  })

  return <Scrollbars 
            style={{ width, height: 666 }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
          >
            <div className={styles.metaItemWrap}>
                {
                  list.map((v, i) => {
                    return <div key={i} className={styles.item}>
                      <div className={styles.label}>{ v.label }</div>
                      <div className={styles.list}>
                        {
                          v.data.map((v, i) => {
                            return <Tooltip title={v.text} key={i}>
                                      <span 
                                        className={styles.icon} 
                                        onDragStart={(e) => {
                                          e.dataTransfer.setData("text/plain", JSON.stringify(v));
                                          memoryManage.set('curDragItem', v);
                                          onDragStart && onDragStart(v);
                                        }} 
                                        onDragEnd={(e) => {
                                          hideElementById('cube_holder_block');
                                          memoryManage.remove('curDragItem');
                                        }}
                                        style={{backgroundColor: colorBgLayout}} 
                                        draggable
                                      >
                                        { (v as ToolItemType).icon || <span className={styles.textIcon}>{ v.text }</span> }
                                      </span>
                                    </Tooltip>
                          })
                        }
                      </div>
                    </div>
                  })
                }
              </div>
          </Scrollbars>
}

export default MetaList
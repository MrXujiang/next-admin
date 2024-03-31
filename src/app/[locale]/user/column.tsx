import { Space, Tag, type TableProps } from 'antd';

interface DataType {
    key: string;
    name: string;
    role: number;
    desc: string;
    tags: string[];
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      fixed: 'left',
      width: 100
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: role => role === 1 ? '超级管理员' : '开发者'
    },
    {
      title: '简介',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: '徐小夕',
      role: 1,
      desc: 'H5-Dooring作者, 掘金签约作者，知乎专栏作家',
      tags: ['前端工程师', 'developer'],
    },
    {
        key: '2',
        name: '张三',
        role: 2,
        desc: '知乎专栏作家',
        tags: ['前端工程师', 'developer' , 'Dooring'],
    },
    {
        key: '3',
        name: '李盟',
        role: 2,
        desc: 'Dooring共建者',
        tags: ['后端工程师', 'V6.Dooring' , 'Dooring'],
    },
    {
        key: '4',
        name: '王阿明',
        role: 2,
        desc: '技术合伙人',
        tags: ['全栈工程师', '橙子表单'],
    },
    {
        key: '5',
        name: '张小明',
        role: 2,
        desc: '技术合伙人',
        tags: ['全栈工程师', '橙子表单'],
    },
    {
        key: '6',
        name: 'Tom',
        role: 2,
        desc: '技术合伙人',
        tags: ['全栈工程师', 'Next-Admin'],
    },
    {
        key: '7',
        name: 'Json',
        role: 2,
        desc: '技术合伙人',
        tags: ['全栈工程师', 'Next-Admin'],
    },
  ];

  export {
    columns,
    data
  }
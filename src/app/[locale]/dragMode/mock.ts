const schema = {
    "Button": {
        id: 'wep_001',
        name: 'Button',
        type: 'base', // 基础类型组件
        base: {
            width: 120,
            height: 36,
            transform: 'translate(100px,100px)'
        }
    },
    "Image": {
        id: 'wep_002',
        name: 'Image',
        type: 'base', // 基础类型组件
        base: {
            width: 120,
            height: 120,
            url: '',
            transform: 'translate(300px,160px)'
        }
    }
}

export default schema
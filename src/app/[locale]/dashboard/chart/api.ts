import req from '@/utils/req';

const checkData = () => req.get('/chart')

export {
    checkData
}
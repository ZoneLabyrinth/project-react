
const baseURL = 'http://rap2api.taobao.org/app/mock/229547';
const imageURL = 'http://www.baidu.com/images';

console.log(process);
// if ( process.env.NODE_ENV === 'development') {
//     baseURL = 'http://rap2api.taobao.org/app/mock/229547/'
// }else{
//     // baseURL = 'http://superset.yonyou.com:8018/api/v1'
// }

const envconfig = {
    baseURL,
    imageURL,
};

export default envconfig;

import axios from 'axios'
import { MessageBox } from 'element-ui'
import qs from 'qs'
const baseURL = window.baseUrl
const service = axios.create({
    baseURL:baseURL,
    timeout:1000000,
    crossDomain: true == !(document.all)
})
service.interceptors.request.use(config => {
    if(config.method === 'get'||config.method === 'post'){
        //如果是get或post请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
        config.paramsSerializer = function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    }
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        const res = response.data
        if(!res.code){
            return res
        }else{
            if(res.code==400 || res.code==500 || res.code==404){
                MessageBox.alert(res.msg,'提示',{
                    type:'error',
                    confirmButtonText: '确定',
                    callback: () => {
                    }
                })
            }else if(res.code!='200'){  //其他错误
                MessageBox.alert(res.msg,'提示',{
                    type: "warning",
                    dangerouslyUseHTMLString: true,
                    message: '<pre style="max-height:350px;overflow-y: auto;">'+res.msg+'</pre>',
                    customClass:'customClass'
                });
            }
            return res
        }
    },
    function (error) {
        return Promise.reject(error);
    }
)

export default service

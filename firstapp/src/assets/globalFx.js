const methods={
    checklogin(){
        return new Promise((resolve, reject)=>{
            if(this.$cookies.get('id')==null || this.$cookies.get('key')==null){
                reject('Login None');
            }else{
                const body={
                    id:this.$cookies.get('id'),
                    key:this.$cookies.get('key'),
                }
                fetch('https://rable.duckdns.org/auth/checklogin/',{
                    method:'post',
                    body: JSON.stringify(body),
                    headers:{
                    'Content-Type':'application/json'
                    }
                }).then(response=>{
                    if(!response.ok){
                        throw new Error('인증 실패');
                    }
                    return response.json();
                }).then((data)=>{
                    resolve(data);
                }).catch(err=>{
                    console.log(err.message);
                    this.$cookies.remove('id');
                    this.$cookies.remove('key');
                    reject(err.message);
                });
            }
        })
    }
}
const requestURL = 'https://rable.duckdns.org/'

export default{
    name:'globalFxAssets',
    install(Vue){
        Vue.config.globalProperties.$checklogin = methods.checklogin;
        Vue.config.globalProperties.$requestURL = requestURL;
    }
}
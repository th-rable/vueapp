<template>
    
    <div class="common-layout">
        <el-container>
            <el-header>
                <Navbar/>
            </el-header>
            <el-main>
                <el-space fill wrap direction="vertical" style="width: 100%;">
                    
                    <div>
                        <p>아이디를 입력해주세요</p>
                        <el-input type="text" v-model="id" placeholder="아이디"
                            @keyup.enter="idcheck()" style="width: 240px;"/>
                        
                        <p></p>
                        <el-button @click="idcheck()" type="primary" round>다음</el-button>
                    </div>
                </el-space>
                            
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Navbar from './Navbar.vue';

    export default {
        name: 'LoginComponents',
        data(){
            return{
                id:'',
            }
        },
        components:{
            Navbar:Navbar,
        },
        created(){
            this.$checklogin().then(()=>{
                //this.$router.push({name:'home'});
                window.location.href = '/home';
            }).catch(()=>{
            });
        },
        methods:{
            idcheck(){
                const body={
                    id:this.id,
                }
                fetch(this.$requestURL+'api/auth/loginid_check/',{
                    method:'post',
                    body: JSON.stringify(body),
                    headers:{
                    'Content-Type':'application/json'
                    }
                }).then(response=>{
                    if(!response.ok){
                        throw new Error('서버에 오류가 발생했어요');
                    }
                    return response.json();
                }).then((data)=>{
                    console.log(data);
                    if(data.result){
                        this.$router.push('/login?id='+body.id);
                    }
                    else this.$router.push('/register?id='+body.id);
                    
                }).catch(err=>{
                    alert(err.message);
                });
            }
        }
    }
    
</script>
<style>
    
</style>
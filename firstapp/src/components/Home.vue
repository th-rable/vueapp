<template>
    <div class="main">
        <h1>{{now}}</h1>
    </div>
    <div class="main">
        <h2 v-for="(p,i) in 3" :key=i>{{id}}, 안녕하세요</h2>
    </div>
    <p></p>
    <HomeNabar :menu="1"/>
</template>
<script>
    import HomeNabar from './HomeNabar.vue';
    export default {
        name: 'HomeComponents',
        data(){
            return{
                id: this.$cookies.get('id'),
                key: this.$cookies.get('key'),
                now: '',
            }
        },
        components:{
            HomeNabar:HomeNabar,
        },
        created(){
            this.$checklogin().then((data)=>{
                console.log(data);
            }).catch(()=>{
                this.$router.push({name:'main'});
            });
        },
        mounted(){
            setInterval(()=>{
                let today = new Date();
                this.now=today.toLocaleString();
            },100);
        }
    }
</script>
<style>
.main{
    box-shadow: 2px 2px 2px 2px rgb(194, 194, 194);
    border-radius: 5px;
}
</style>
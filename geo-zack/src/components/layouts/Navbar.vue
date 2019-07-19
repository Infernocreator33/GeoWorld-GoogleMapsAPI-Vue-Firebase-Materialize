<template>
    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <router-link :to="{name: 'GMap'}" class="logo left">Zack's GeoWorld!</router-link>
                <ul class="right">
                    <li v-if="!user"><router-link :to="{name: 'Signup'}"><p class="navlist">Sign Up</p></router-link></li>
                    <li v-if="!user"><router-link :to="{name: 'Login'}"><p class="navlist">Login</p></router-link></li>
                    <li v-if="user"><a><p class="navlist">{{user.email}}</p></a></li>
                    <li v-if="user"><a @click="logout"><p class="navlist">Logout</p></a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
    name: 'Navbar',
    data(){
        return {
            user: null
        }
    },
    methods:{
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.push({name: 'Login' })
            })
        }
    },
    created(){
        //let user = firebase.auth().currentUser
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                //user is logged in
                this.user = user
            }
            else{
                //user has logged out
                this.user = null
            }
        })
    }
}
</script>
<style>
@media screen and (min-width: 768px) {
.logo{
    font-size: 2.4em;
}
.navlist{
    font-size: 1.0em;
    
}
.login{
    max-width: 40%;
    margin-top: 25px;
}
.login h2{
    font-size: 1.5em;
}
.login .field{
    margin-bottom: 18px;
}
}
@media screen and (max-width: 768px){
.logo{
    font-size: 1.4em;
}
.navlist{
    font-size: 0.6em;
    
}
.login{
    max-width: 40%;
    margin-top: 25px;
}
.login h2{
    font-size: 1.5em;
}
.login .field{
    margin-bottom: 18px;
}
}
@media screen and (max-width: 400px){
.logo{
    font-size: 0.9em;
}
.navlist{
    font-size: 0.5em;
    
}
.login{
    max-width: 40%;
    margin-top: 25px;
}
.login h2{
    font-size: 1.5em;
}
.login .field{
    margin-bottom: 18px;
}
}
</style>

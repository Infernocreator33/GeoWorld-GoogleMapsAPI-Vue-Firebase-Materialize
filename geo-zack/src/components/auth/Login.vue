<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center deep-purple-text">Login</h2>
            <div class="field">
                <label for="email">Email: </label>
                <input type="email" name="email" v-model="email"/>
            </div>
            <div class="field">
                <label for="password">Password: </label>
                <input type="password" name="password" v-model="password"/>
            </div>
            <div class="field">
                <p class="red-text center" v-if="feedback">{{feedback}}</p>    
            </div>
            <div class="field">
                <button class="btn  deep-purple">Login</button>
            </div>
        </form>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name: 'Login',
    data(){
        return{
            email: null,
            password: null, 
            feedback: null
        }
    }, 
    methods: {
        login(){
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    console.log(cred.user)
                    this.$router.push({name: 'GMap'})
                }).catch(error => {
                    this.feedback = error.message
                })
                this.feedback = null
            }
            else{
                this.feedback = 'Please fill both fields or try signing up again'
            }
        }
    }
}
</script>
<style>
.login{
    max-width: 400px;
    min-width: 66%;
    margin-top: 30px;

}
.login h2{
    font-size: 2.4em;
}
.login .field{
    margin-bottom: 15px;
}
</style>



<template> 
    <div class="signup container">
        <form class="card-panel" @submit.prevent="signUp">
            <h2 class="center deep-purple-text text-darken-1">Sign Up</h2>
            <div class="field">
                <label for="email">Email: </label>
                <input type="email" name="email" v-model="email"/>
            </div>
            <div class="field">
                <label for="password">Password: </label>
                <input type="password" name="password" v-model="password"/>
            </div>
            <div class="field">
                <label for="alias">Alias: </label>
                <input type="text" name="alias" v-model="alias"/>
            </div>
            <div class="field">
                <p class="red-text center" v-if="feedback">{{feedback}}</p>
            </div>
            <div class="field center">
                <button class="btn deep-purple">Sign Up</button>
            </div>
        </form>
    </div>
</template>
<script>
import slugify from 'slugify'
import database from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'Signup',
    data(){
        return{
            email: null,
            password: null,
            alias: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signUp(){
            if(this.alias && this.email && this.password){
                this.slug = slugify(this.alias, {
                    replacement: '-', 
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                let ref = database.collection('Users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'This alias already exists'
                    }
                    else{
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            console.log("ID: " + cred.user.uid);
                            ref.set({
                                alias: this.alias,
                                geolocation: null,
                                user_id: cred.user.uid
                            })
                        }).then(() => {
                            this.$router.push({name: 'GMap'})
                        })
                        .catch(error =>{
                            console.log(error);
                            this.feedback = error.message;
                        })
                        this.feedback = 'This alias is free to use'
                    }
                })
                console.log(this.slug);
            }
            else{
                this.feedback ='You must enter all fields!'
            }
        }
    }
}
</script>
<style>
.signup{
    max-width: 400px;
    margin-top: 30px;

}
.signup h2{
    font-size: 2.4em;
}
.signup .field{
    margin-bottom: 15px;
}
</style>

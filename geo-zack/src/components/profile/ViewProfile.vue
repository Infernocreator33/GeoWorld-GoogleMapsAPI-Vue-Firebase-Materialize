<template>
    <div class="view-profile container">
        <div v-if="profile" class="card">
            <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in comments" :key="index">
                    <div class="deep-purple-text">{{comment.from}}</div>
                    <div class="grey-text text-darken-2">{{comment.content}}</div>
                    <div class="orange-text text-darken-4">{{comment.timestamp}}</div>
                </li>
            </ul>
            <form @submit.prevent="addComment">
                <div class="field">
                    <p v-if="feedback" class="red-text center">{{feedback}}</p>
                    <label for="comment">Add a Comment</label>
                    <input type="text" name="comment" v-model="newComment"/>
                    <a class="btn-floating btn-small right added purple darken-3"><i class="tiny material-icons" @click="addComment">add</i></a>
                    
                </div>
            </form>
        </div>
        

    </div>
</template>
<script>
import database from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'
export default {
    name: 'ViewProfile',
    data(){
        return{
            
            profile: null,
            newComment: null,
            feedback: null,
            user: null,
            comments: []
        }
    },
    created(){
        let ref = database.collection('Users')

        //get current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                this.user = doc.data(),
                this.user.id = doc.id
            })
        })

        //profile data

        ref.doc(this.$route.params.id).get().then(user =>{
            this.profile = user.data()
        })

        //comments
            
            database.collection('Comments').where('to', '==', this.$route.params.id)
            .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change =>{
                if(change.type == 'added'){
                    this.comments.push({
                        from: change.doc.data().from,
                        content: change.doc.data().content,
                        timestamp: moment(change.doc.data().timestamp).format('llll')
                    })
                }
            })
        })
        
    },
    methods:{
        addComment(){
            if(this.newComment){
                this.feedback = null
                database.collection('Comments').add({
                    to: this.$route.params.id,   //grab the slug from the url
                    from: this.user.alias,
                    content: this.newComment, 
                    timestamp: Date.now()
                }).then(() =>{
                    this.newComment = null
                })
            }
            else{
                this.feedback = 'You must enter a comment to add it to the wall'
            }
        }
    }
}
</script>
<style>
.view-profile .card{
    padding: 15px;
    margin-top: 40px;

}
.view-profile h2{
    font-size: 2.1em;
    margin-top: 0;
}
.added{
    position: absolute;
    right: 20px;
    bottom: 35px;
    font-size: 1.5em;
    cursor: pointer;
}
.view-profile li{
    padding: 10px;
    border-bottom: 1px solid #eee;
}
body{
    background-color: #ddd
}
</style>

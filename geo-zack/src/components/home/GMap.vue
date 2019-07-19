<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>
<script>
import firebase from 'firebase'
import database from '@/firebase/init'
export default {
    name: 'GMap',
    data(){
        return{
            lat: 0, 
            lng: 0
        }
    },
    methods: {
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng },
                zoom: 18, 
                maxZoom: 20,
                minZoom: 1,
                streetViewControl: true //allows the user to view the street from the said location and we don't want users to do that if false

            })
            database.collection('Users').get().then(users =>{
                users.docs.forEach(doc =>{
                    let data = doc.data()
                    if(data.geolocation){
                        let marker = new google.maps.Marker({
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            },
                            map
                        })
                        //add click event to marker
                        marker.addListener('click', () =>{
                            this.$router.push({name: 'ViewProfile', params: {id: doc.id}})
                        })
                    }
                })
            })
        }
    },
    mounted(){
        //get the current user
        let user = firebase.auth().currentUser

        console.log(user)
        //get user geolocation
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(pos =>{ //three parameters here notice the syntax
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude

                //find the user record and then update geo coordinate
                database.collection('Users').where('user_id', '==', user.uid).get()
                .then(snapshot =>{
                    snapshot.forEach((doc) => {
                      database.collection('Users').doc(doc.id).update({
                          geolocation: {
                              lat: pos.coords.latitude,
                              lng: pos.coords.longitude
                          }
                      })
                    })
                }).then(() =>{
                    this.renderMap()
                })
            }, (error) =>{
                console.log(error)
                this.renderMap()
            }, {maximumAge: 60000, timeout: 3000})
        }
        else{
            //position center by default values
            this.renderMap()
        }
        
        

    }
}
</script>
<style>
.google-map{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

// export a new http function
export const getBostonAreaWeather = functions.https.onRequest((request, response) => {
    // query boston area doc
    admin.firestore().doc('areas/greater-boston').get()
    // handling promse from get request
    .then(areaSnapshot => {
         // Convert to JavaScript Object and access the document property called cities for cities ID
        const cities = areaSnapshot.data().cities
        // array to capture all promises 
        const promises = []
        // build array to reference every city's doc
        for (const city in cities) {
            // each get returns a promise so there will be multiple replies
            const p = admin.firestore().doc(`cities-weather/${city}`).get()
            // collect pending promises
            promises.push(p)
            // Returns after all the promises are fulfilled (completes then)
            return Promise.all(promises)
        }
    })
    // since prior promise was fulfilled, we want to manupulate the response data 
    .then(citySnapshots => {
        const results = []
        // array of snapshots from the get
        citySnapshots.forEach(citySnap => {
            // iterate over each snaphot to capture each cities data 
            const data = citySnap.data()
            // getting each id
            data.city = citySnap.id
            // store data in results array
            results.push(data)
        })
        // send response data to client
        response.send(results)
    })
    // handle if promse is rejected with an error
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    })
})

export const onBostonWeatherUpdate = functions.firestore.document("cities-weather/boston-ma-us").onUpdate(change => {
    const after = change.after.data()
    const payload = {
        data: {
            temp: String(after.temp),
            conditions: after.conditions
        }
    }
    return admin.messaging().sendToTopic("weather_boston-ma-us", payload)
    .catch(error => {
        console.error("FCM failed", error)
    })
})

// export a new http function
export const getBostonWeather = functions.https.onRequest((request, response) => {
    // requests to get cities data at firestore
    admin.firestore().doc('cities-weather/boston-ma-us').get()
    // handling promse from get request
    .then(snapshot => {
        // Convert to JavaScript Object
        const data = snapshot.data()
        // send response to client in json format
        response.send(data)
    })
    .catch(error => {
        console.log(error)
        // handle if promse is rejected with an error
        response.status(500).send(error)
    })
})
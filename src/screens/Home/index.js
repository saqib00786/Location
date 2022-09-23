import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { collection, addDoc, doc, setDoc, getFirestore, query, onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import App from '../../../api/firebase'



export default function Home() {
  const db = getFirestore(App)
  const [location, setLocation] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  let keys = []


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000
      }, (location) => {
        SetLocation(location)
      })

      //let location = await Location.getCurrentPositionAsync({});
      // setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    })();
    GetLocation()
  }, []);


  const SetLocation = async (location) => {
    try {
      const docRef = await setDoc(doc(db, "Location", '12-Bor Pistor'), {
        lat: location.coords.latitude,
        long: location.coords.longitude
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const GetLocation = async () => {
    const q = query(collection(db, "Location"))
    try {
      unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          keys.push(doc.data())
        })
        setLocation(keys)
        console.log(location)
        keys = []
      })
    } catch (e) {
      console.log(e)
    }
  }


  let text = 'Waiting..';

  if (errorMsg) {
    text = errorMsg
  }
  // } else if (location) {
  //   text = JSON.stringify(location);
  //   obj = JSON.parse(text)
  //   console.log(text)
  // }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {location.map((loc,index) => (
          <Marker
            coordinate={{ latitude: loc.lat, longitude: loc.long }}
            key={index}
            image={require('../../../assets/marker.png')}
            title={"دریا"}
            description={"Description"}
            style={{ width: 40, height: 40 }}
          >

          </Marker>
        ))}
      </MapView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  paragraph: {
    fontSize: 30
  }
});

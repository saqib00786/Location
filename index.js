import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import app from './api';
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { query, collection, onSnapshot, getFirestore, getDoc, doc, addDoc } from "firebase/firestore";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
   //-----------------------use effect-----------------------------------
  useEffect(() => {
    //----------------------------------------------------------------
    fetchLocation();
    setData();
    getData();
  }, [location]);
  //-------------------------use effect--------------------------------
  const fetchLocation = async () => {
    if (Platform.OS === 'android' && !Device.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let foregroundSubscrition = Location.watchPositionAsync(
      {
        // Tracking options
        accuracy: Location.Accuracy.High,
        //distanceInterval: 100,
        timeInterval: 10000
      },
      (location) => {
        setLocation(location);
      }
    )

  }
  const setData = async () => {
    if (location) {
      try {
        const docRef = await addDoc(collection(db, "address"), {
          lat: location.coords.latitude,
          long: location.coords.longitude
        })
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.log('waiting....')
    }
  }
  const getData = async () => {
    const q = query(collection(db, "address"))
    try {
      let keys = []
      unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          keys.push(doc.data())
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(text)
  //------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        {location ?
          <Marker styles={{ width: 10, height: 10 }} coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
            <Image style={{ height: 50, width: 50 }} source={require('../locationApp/assets/marker.jpeg')} />
          </Marker> : null}
      </MapView>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
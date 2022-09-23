import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import App from '../../../api/firebase'

const SignUp = (props) => {
    const db = getFirestore(App)
    const [password, setPassowrd] = useState()
    const [email, setEmail] = useState()

    const onLogin = () => {
        props.navigation.goBack()
    }

    const onSignup = async() => {
        const auth = getAuth();
        if (email.includes('@') && password) {
            try {
                console.log("enter")
                await addDoc(collection(db, email),{});

                let res= await createUserWithEmailAndPassword(auth, email, password)
                alert("User Create Sucessfully")

                props.navigation.goBack()
            } catch (error) {
                console.log(error)
                alert("SomeThing went Wrong")
            }

        } else {
            alert("Kindly enter email and password")
        }
    }
    return (
        <View style={styles.container}>
            <Image style={[styles.logo]}
                source={require('../../../assets/marker.png')}
            />

            <View style={{ ...styles.card, height: 60, width: '100%' }}>
                <TextInput
                    style={{ padding: 20, borderColor: 'gray', borderWidth: 0.7, borderRadius: 20 }}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                />

            </View>

            <View style={{ ...styles.card, height: 60, width: '100%' }}>
                <TextInput
                    style={{ padding: 20, borderColor: 'gray', borderWidth: 0.7, borderRadius: 20 }}
                    placeholder={'Password'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(t) => setPassowrd(t)}
                />

            </View>


            <TouchableOpacity
                style={[styles.btn, { marginTop: 30 }]}

                onPress={() => onSignup()}
            >
                <Text style={styles.textWrapper}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.forgotPwd, { marginTop: 20, marginBottom: 8 }]}
                onPress={() => onLogin()}
            >
                <Text style={styles.textWrapper}>Already Have Account</Text>
            </TouchableOpacity>

        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,

    },
    btn: {
        backgroundColor: "gray",
        height: 50,
        borderRadius: 100,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 0,
        margin: 8,
        borderColor: "black",
        borderWidth: 0.5,
    },
    textWrapper: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    forgotPwd: {
        alignSelf: 'center'
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginBottom: 25
    }
})

export default SignUp
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = (props) => {

    const [password, setPassowrd] = useState()
    const [email, setEmail] = useState()

    const onLogin = async () => {
        const auth = getAuth();
        try {
            let res = await signInWithEmailAndPassword(auth, email, password)
            alert("You Are Login Successfully")
            props.navigation.replace('Home', { email: email })
        } catch (error) {
            alert("SomeThing went Wrong")
        }

    }
    const onSignup = () => {
        props.navigation.navigate('SignUp')
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
                onPress={() => onLogin()}
            >
                <Text style={styles.textWrapper}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => onSignup()}
            >
                <Text style={styles.textWrapper}>SignUp</Text>
            </TouchableOpacity>

        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderColor : "black",
        borderWidth : 0.5,
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
    }
})


export default SignIn
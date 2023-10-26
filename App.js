import { View, Text,Button, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


export default function App() {


  const [user, setUser] = useState(null);
  console.log(user.photo);
  
  

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      setUser(result.user); // Use result.user.photoURL for the image URL
    }  catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error)
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "260077431748-7epi06v9tk1li3igmj13o345gg0akl0n.apps.googleusercontent.com", 
      offlineAccess: true
    });
  }, [])
  return (
    <View>
      <Text>App</Text>
      <Button title='click' onPress={GoogleSingUp} />
      
      {user && <Image source={{ uri: user.photo }} style={{ width: 100, height: 100 }} />}
      {user && <Text> user name :{user.name}</Text>}
      {user && <Text> user id  :{user.id}</Text>}
      <Button title='click' onPress={signOut} />
    </View>
  )
}









// PS D:\Social login\googlelogin\android\app> keytool -list -v -keystore my_release_key.keystore -alias my_key_alias
// Enter keystore password:  
// Alias name: my_key_alias
// Creation date: Oct 25, 2023
// Entry type: PrivateKeyEntry
// Certificate chain length: 1
// Certificate[1]:
// Owner: CN=sameer, OU=sameer, O=sameer, L=shivpuri, ST=mp, C=in
// Issuer: CN=sameer, OU=sameer, O=sameer, L=shivpuri, ST=mp, C=in
// Serial number: 3176ed78e2aaca50
// Valid from: Wed Oct 25 12:00:11 IST 2023 until: Sun Mar 12 12:00:11 IST 2051
// Certificate fingerprints:
//          SHA1: 56:E6:16:80:AC:98:ED:43:D7:1A:8D:92:59:4C:5C:BB:B5:A5:D7:65
//          SHA256: 40:45:FB:AC:67:19:09:CF:E8:60:4E:0C:B0:B0:22:BA:E2:6A:45:D5:92:34:44:A4:EC:D0:7E:0C:70:18:31:6A
// Signature algorithm name: SHA256withRSA
// Subject Public Key Algorithm: 2048-bit RSA key
// Version: 3

// Extensions:

// #1: ObjectId: 2.5.29.14 Criticality=false
// SubjectKeyIdentifier [
// KeyIdentifier [
// 0000: A0 D0 81 1C 3F 59 00 1D   BC 4B 0C 36 56 83 99 B0  ....?Y...K.6V...
// 0010: 47 3D 04 ED                                        G=..
// ]
// ]

// PS D:\Social login\googlelogin\android\app> 
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { registerUser } from '../../services/api';


export default function RegisterScreen() {

const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [phone,setPhone] = useState('');
const [address,setAddress] = useState('');

const [loading,setLoading] = useState(false);
const [error,setError] = useState('');

const router = useRouter();



const handleRegister = async()=>{

if(!name || !email || !phone || !address){

setError("Please complete all required fields.");
return;

}


setLoading(true);
setError('');

try{

await registerUser({

fullName:name.trim(),
email:email.trim().toLowerCase(),
phone,
address

});


Alert.alert(
"Success",
"Account created successfully"
);


router.replace('/auth/login');


}

catch(error){

setError(error.message || "Registration failed");

Alert.alert(
"Registration failed",
error.message
);

}

finally{

setLoading(false);

}

};



return (

<SafeAreaView style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContent}>


<View style={styles.card}>


<Image

source={require('../../../assets/images/logo.png')}

style={styles.logo}

resizeMode="contain"

/>


<Text style={styles.badgeText}>
Join now
</Text>


<Text style={styles.title}>
Create your account
</Text>


<Text style={styles.subtitle}>
Start building a calmer, better-organized care routine.
</Text>



{
error ?
<Text style={styles.errorText}>{error}</Text>
:null
}





{/* FULL NAME */}

<View style={styles.inputGroup}>

<Ionicons
name="person-outline"
size={18}
color="#60a5fa"
style={styles.inputIcon}
/>


<TextInput

style={styles.input}

placeholder="Full name"

placeholderTextColor="#94a3b8"

value={name}

onChangeText={setName}

/>

</View>





{/* EMAIL */}

<View style={styles.inputGroup}>

<Ionicons
name="mail-outline"
size={18}
color="#60a5fa"
style={styles.inputIcon}
/>


<TextInput

style={styles.input}

placeholder="Email address"

placeholderTextColor="#94a3b8"

value={email}

onChangeText={setEmail}

keyboardType="email-address"

autoCapitalize="none"

/>

</View>





{/* CONTACT */}

<View style={styles.inputGroup}>

<Ionicons
name="call-outline"
size={18}
color="#60a5fa"
style={styles.inputIcon}
/>


<TextInput

style={styles.input}

placeholder="Contact"

placeholderTextColor="#94a3b8"

value={phone}

onChangeText={setPhone}

keyboardType="phone-pad"

/>

</View>





{/* ADDRESS */}

<View style={styles.inputGroup}>

<Ionicons
name="location-outline"
size={18}
color="#60a5fa"
style={styles.inputIcon}
/>


<TextInput

style={styles.input}

placeholder="Address"

placeholderTextColor="#94a3b8"

value={address}

onChangeText={setAddress}

/>

</View>




<TouchableOpacity

style={styles.primaryButton}

onPress={handleRegister}

disabled={loading}

>

<Text style={styles.primaryButtonText}>

{loading ? "Creating account..." : "Create account"}

</Text>

</TouchableOpacity>





<TouchableOpacity

onPress={()=>router.push('/auth/login')}

style={styles.secondaryAction}

>

<Text style={styles.footerText}>

Already have an account?

<Text style={styles.highlightText}>
 Sign in
</Text>

</Text>

</TouchableOpacity>



</View>


</ScrollView>

</SafeAreaView>

);

}





const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:'#f4f9ff'
},


scrollContent:{
flexGrow:1,
justifyContent:'center',
padding:20
},


card:{
backgroundColor:'#fff',
borderRadius:28,
padding:24,
elevation:6
},


logo:{
width:140,
height:70,
alignSelf:'center'
},


badgeText:{
textAlign:'center',
color:'#2563eb',
fontWeight:'700',
marginBottom:10
},


title:{
fontSize:24,
fontWeight:'700',
color:'#1e3a8a',
marginBottom:6
},


subtitle:{
fontSize:14,
color:'#64748b',
marginBottom:20
},


inputGroup:{
flexDirection:'row',
alignItems:'center',
backgroundColor:'#f8fbff',
borderRadius:16,
paddingHorizontal:14,
marginBottom:12,
borderWidth:1,
borderColor:'#e2e8f0'
},


inputIcon:{
marginRight:10
},


input:{
flex:1,
height:48,
color:'#0f172a'
},


primaryButton:{
backgroundColor:'#3b82f6',
borderRadius:999,
paddingVertical:14,
alignItems:'center',
marginTop:10
},


primaryButtonText:{
color:'#fff',
fontWeight:'700'
},


errorText:{
color:'red',
marginBottom:10
},


secondaryAction:{
marginTop:20,
alignItems:'center'
},


footerText:{
color:'#64748b'
},


highlightText:{
color:'#2563eb',
fontWeight:'700'
}


});
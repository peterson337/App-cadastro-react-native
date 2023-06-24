import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { 
StyleSheet, 
Text,
View,
Image,
TextInput,
Button,
TouchableOpacity,
Animated,
Dimensions
} from 'react-native';

export const Logar = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [logado, setarlogado] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const login = () => {
        alert('Você está logado')
        setarlogado(true);
        setShowModal(false);
    }

  return (
    <View>
        {
            logado?
            <View>
                <Text> Você está logado</Text>
            </View>
            
            :

           <View>
             <TextInput
            placeholder='Escreva o seu email'
            style={styles.TextInput}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            secureTextEntry={true}
            placeholder='Escreva a sua senha'
            style={styles.TextInput}
            value={senha}
            onChangeText={text => setSenha(text)}
          />

          
          <TouchableOpacity style={styles.TouchableOpacity} 
            onPress={login}>
            <Text style={styles.TouchableOpacityText}>Fazer login</Text>
          </TouchableOpacity>
           </View>
        }
           
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#01b0f1',

      
    },

  Image: {
    width: 400,
    height: 220,
  },

  divImage: {
    position: 'relative',
    marginTop: 40,
    right: 10,
    

},

  TextInput: {
    marginHorizontal: 20,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 40,
    marginBottom: -20,
    borderBottomColor: 'black',
    borderWidth: 1,
  },

  TouchableOpacity: {
    marginHorizontal: 20,
    width: '90%',
    height: 40,
    backgroundColor: '#ff262a',
    borderRadius: 20,
    marginTop: 40,
    justifyContent: 'center',
  },

  TouchableOpacityText: {
    color: 'white',
    textAlign: 'center',
  },

  animatedView: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  backgroundModal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
    paddingBottom: 790,
    
  },

  modal: {
    position: 'relative',
    backgroundColor: 'white',
    height: 370,
    width: '95%',
    marginHorizontal: 10,
    position: 'absolute',
    left: 0,
    top: '50%',
//!    370 / 2 = 185   
   marginTop: 185,
    padding: 10,
    borderRadius: 20,
  },

  close: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 20,
    color: "white",
    width: 35, 
    marginRight: 10,
    marginTop: 10,
},  

title: {
  fontSize: 25,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  margin: 20,
  marginHorizontal: 70,
  textAlign: 'center',
  paddingBottom: 10,
},

});


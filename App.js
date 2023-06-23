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

import {db, auth} from "./Firebase";

import {
  addDoc, 
  collection, 
  orderBy, 
  onSnapshot, 
  query
} from "firebase/firestore";

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


export default function App() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [login, setLogin] = useState(false);
    const [logar, setLogar] = useState(false);


    const cadastro = () => {
      if (!nome.trim() || !email.trim() || !senha.trim()) { // <----- Se nao tiver vazio, nao faz nada
        alert("Escreva alguma coisa para adicionar  uma tarefa");
        return
      }
      createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          alert("A sua conta foi criada com sucesso 😁");
          setNome('');
          setSenha('');
          setEmail('');
          setLogin(true);

        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const fadeAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
      }).start();

//?        Código para a animção desaparecer

/* 
Todo          let timeout = setTimeout(() => {
!              Animated.timing(fadeAnim, {
*                toValue: 0,
*                duration: 5000,
!              }).start();
Todo            },7000)

Todo            return() => {
*              clearInterval(timeout)
Todo          }            
 */
  }, [])
    

  return (
    <View style={styles.container}>
      <StatusBar hidden />
  
      <Animated.View style={{ ...styles.animatedView, opacity: fadeAnim }}>
        <View style={styles.divImage}>
          <Image
            style={styles.Image}
            source={{ uri: 'https://i.ytimg.com/vi/CykxdejAobY/maxresdefault.jpg' }}
          />
        </View>
  
        {login ? (
          <View>
            <TouchableOpacity style={styles.TouchableOpacity} onPress={() => setLogin(false)}>
              <Text style={styles.TouchableOpacityText}>Deslogar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              placeholder='Escreva o seu nome'
              style={styles.TextInput}
              value={nome}
              onChangeText={text => setNome(text)}
            />
  
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
  
            <TouchableOpacity style={styles.TouchableOpacity} onPress={cadastro}>
              <Text style={styles.TouchableOpacityText}>Cadastrar-se</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.TouchableOpacity} 
              onPress={() => setLogar(true)}
              >
              <Text style={styles.TouchableOpacityText}>Abrir modal para logar</Text>
            </TouchableOpacity>
          </>
        )}
  
        {logar && (
       
           <View style={styles.backgroundModal}>
          
            <View style={styles.modal} />

          </View>
        )}
      </Animated.View>
    </View>
  );
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#01b0f1',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },

  Image: {
    width: 400,
    height: 220,
  },

  divImage: {
    position: 'relative',
    right: 25,
},

  TextInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 40,
    marginBottom: -20,
  },

  TouchableOpacity: {
    width: '100%',
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

  },


});

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

import { 
createUserWithEmailAndPassword, 
updateProfile,
signInWithEmailAndPassword,
onAuthStateChanged 
 } from 'firebase/auth';
 
import { AntDesign } from '@expo/vector-icons'; 



export default function App() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [user, setUser] = useState('');

    const [login, setLogin] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user != null) {
          setUser(user.displayName);
        }
      });
    
      return () => unsubscribe(); // Certifique-se de cancelar a inscrição quando o componente for desmontado
    }, []);
    

    const cadastro = () => {
      if (!nome.trim() || !email.trim() || !senha.trim()) { // <----- Se nao tiver vazio, nao faz nada
        alert("Escreva alguma coisa para adicionar  uma tarefa");
        return
      }
      createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          alert("A sua conta foi criada com sucesso 😁 ");
          setNome('');
          setSenha('');
          setEmail('');
          setLogin(true);
          setUser(email);
          setShowModal(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    };

    const sendLogin = () => {
      signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert("O login foi feito com sucesso 😁");
        setNome('');
        setSenha('');
        setEmail('');
        setLogin(true);
        setUser(email);
        setShowModal(false);

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
    
  const logout = () => {
    auth.signOut();
    setLogin(false);
  }

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

              <Text
              style={{...styles.title,
                        color: 'white',
                        borderBottomWidth: 0,

                        marginHorizontal: 30,


              }}
              >Bem-vindo de volta ao app {user}
              </Text>

              
              <Text
              style={{...styles.title,
                        color: 'white',
                        borderBottomWidth: 0,
                        marginHorizontal: 30,
                        fontSize: 30,

              }}
              >Ainda não tem curso neste app 😔
              </Text>

            <TouchableOpacity style={styles.TouchableOpacity} 
               onPress={logout}>
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
  
            <TouchableOpacity style={styles.TouchableOpacity} 
              onPress={cadastro}>
              <Text style={styles.TouchableOpacityText}>Cadastrar-se</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.TouchableOpacity} 
              onPress={() => setShowModal(true)}
              >
              <Text style={styles.TouchableOpacityText}
              >Abrir modal para logar</Text>
            </TouchableOpacity>
          </>
        )}
  
        {
        showModal && (
       
           <View style={styles.backgroundModal}>
           {/*  <TouchableOpacity
              onPress={() => setLogar(false)}
            
            > */}
                
            <View style={styles.modal} >

            <AntDesign name="close" size={24} color="red" 
              onPress={() => setShowModal(false)}
              style={styles.close}
              />

              

              <Text
              style={styles.title}
              >
              Logar
             </Text>

             <TextInput
            placeholder='Escreva o seu email'
            style={{...styles.TextInput,
                         borderBottomColor: 'black',
                         borderWidth: 1,

            }}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            secureTextEntry={true}
            placeholder='Escreva a sua senha'
            style={{...styles.TextInput,
                           borderWidth:1,
                          borderBottomColor: 'black',

            }}
            value={senha}
            onChangeText={text => setSenha(text)}
          />

          
          <TouchableOpacity style={styles.TouchableOpacity} 
            onPress={sendLogin}>
            <Text style={styles.TouchableOpacityText}>Fazer login</Text>
          </TouchableOpacity>

            </View>

            {/* </TouchableOpacity> */}
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

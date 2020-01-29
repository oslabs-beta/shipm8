// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Input } from 'react-native-elements';
// import { withNavigation } from 'react-navigation';
// import Icon from 'react-native-vector-icons/FontAwesome';

// // Load FontAwesome icons
// Icon.loadFont();

// // state for the changing input fields
// const AddCluster = props => {
//   const [addState, setAddState] = useState({
//     addIP: '',
//     addAPI: '',
//   });

//   const validate = () => {
//     if (addState.addIP !== '' && addState.addAPI !== '') {
//       props.navigation.navigate('Main');
//     } else {
//       alert('Invalid Cluster and/or API Token');
//     }
//   };

//   let content = (
//     <View style={styles.container}>
//       <Input
//         onChangeText={text => setAddState({ ...addState, addIP: text })}
//         style={{ marginBottom: 20 }}
//         label="Cluster Info"
//         placeholder="Enter Cluster Info Here"
//         leftIcon={{
//           type: 'font-awesome',
//           name: 'chevron-right',
//           marginRight: 10,
//           color: 'gray',
//         }}
//       />
//       <Input
//         onChangeText={text => setAddState({ ...addState, addAPI: text })}
//         style={{ marginTop: 20 }}
//         label="Api Key"
//         placeholder="Enter API Key Here"
//         leftIcon={
//           <Icon
//             name="lock"
//             size={24}
//             style={{ marginRight: 10, color: 'gray' }}
//           />
//         }
//       />
//       <View style={{ paddingTop: 30 }}>
//         <TouchableOpacity style={styles.buttonContainer} onPress={validate}>
//           <Text style={styles.buttonText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
//   return content;
// }

// export default withNavigation(AddCluster)

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     width: 325,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 80,
//     paddingTop: 35,
//   },
//   buttonContainer: {
//     backgroundColor: 'blue',
//     paddingVertical: 15,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// })
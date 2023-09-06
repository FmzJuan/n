import { StyleSheet, Text } from 'react-native';

export default function Texthead(){
    return(

      <Text style={styles.text}>
        aprendendo a ultilizar react native , usando expo
        </Text>

);
}
const styles =StyleSheet.create({
    text :{
        color:'#ffff',
        margin:1,
        marginBottom:15,
        paddingBottom:15
    }
})
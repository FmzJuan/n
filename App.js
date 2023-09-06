import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import EmojiSticker from './components/EmojiSticker';
import EmojiList from './components/EmojiList';
import EmojiPicker from './components/EmojiPicker';
import CircleButton from './components/Circlebutton';
import IconButton from './components/IconButton';
import Button from './components/Button';
import Texthead from './components/headtext';
import ImageViewer from './components/ImageViewer';

import * as ImagePicker from 'expo-image-picker';

const Placeholderimg = require('./assets/images/background-image.png');

export default function App() {

  const [pickedEmoji , setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage,setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOption] = useState(false);

  const onReset = ()=>{
    setShowAppOption(false);
  };

  const onAddSticker = () =>{
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {

  };


  
  
  const pickImageAsync = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing:true,
    quality:1
  });

  if(!result.canceled) {
    setSelectedImage(result.assets[0].uri);
    setShowAppOption(true);
  }else {
    alert('Você não selecionou nenhuma imagem.');
  }
};

  return (
    <GestureHandlerRootView style={styles.container}>
       
        <View style={styles.imageConteiner}>
       
            <Texthead/>
            <ImageViewer 
            placeholderImageSource={Placeholderimg} 
            selectedImage={selectedImage}
            />
            {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>:null}
        </View> 
        {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />

          </View>
        </View>

        ):(

        <View style={styles.footerConteiner}>
             <Button theme="primary" label="Escolha uma foto" onPress={pickImageAsync}/>
             <Button label="Use essa foto" onPress={() =>setShowAppOption(true)}/> 
        </View>  )}


        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
         <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
            
            <StatusBar style="auto" />
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding:45,
  },
  imageConteiner:{
    flex:1 ,
    paddingTop:58,
  },
  footerConteiner:{
    flex:1 / 3,
    alignItems:'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import ProgressBar from '../components/ProgressBar';
import EmptyGallery from '../components/EmptyGallery';
import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../firebaseConfig";


import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { addDoc,collection, onSnapshot } from 'firebase/firestore';
import { UploadingAndroid } from '../components/UploadingAndroid';
import { Video } from 'expo-av';

export default function UploadScreen() {
    
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress,setProgress] = useState(0);
  const [files,setFiles] = useState([]);

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db,"Pallavi_photos"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if(change.type === "added"){
            console.log("New File",change.doc.data());
            setFiles((prevFiles) => [...prevFiles,change.doc.data()])
          }
        })
      })

      return () => unsubscribe();

    }, []);

    async function pickImage(){
      let ressult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,4],
        quality: 1
      });
      if(!ressult.canceled){
        setImage(ressult.assets[0].uri);
        // upload the image
        await uploadImage(ressult.assets[0].uri,"image");
      }
    }

    async function pickVideo(){
      let ressult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [3,4],
        quality: 1,
      });
      if(!ressult.canceled){
        setImage(ressult.assets[0].uri);
        // upload the image
        await uploadImage(ressult.assets[0].uri,"video");
      }
    }

    async function uploadImage(uri,fileType){
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage,"pallavi/" + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef,blob);

      //listen for events
      uploadTask.on("state_changed",(snapshot)=>{
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is "+ progress + "% done");

        setProgress(progress.toFixed());

      },
      (error) => {
        //handle error
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at ",downloadURL);
          //save record
          await saveRecord(fileType,downloadURL,new Date().toISOString());
          setImage("");
          setVideo("");
        });
      }
      )
    }

    async function saveRecord(fileType,url,createdAt){
      try {
        const docRef = await addDoc(collection(db,"Pallavi_photos"),{
          fileType,
          url,
          createdAt
        })
        console.log("document saved correctly",docRef.id );
      } catch (e) {
        console.log(e)
      }
    }
    
   
  return (
    <View style={styles.mainContainer}>
    {/* <View style={styles.cardStyle}>
      <EmptyGallery />
    </View> */}
    
    <View style={{flex: 1}}>

        <FlatList 
          data={files}
          keyExtractor={(item) => item.url}
          renderItem={({item}) => {
           if(item.fileType === "image"){
            return(
              <Image
                source={{ uri: item.url }}
                // source="https://picsum.photos/seed/696/3000/2000"
                style={{width: "34%", height: 100}}
              />
            );
           }else{
            return(
              <Video 
                source={{ uri: item.url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode='cover'
                shouldPlay
                // isLooping
                style={{width: "34%",height: 100}}
                useNativeControls
              />
              
            );
           }
          }}
          numColumns={3}
          contentContainerStyle={{gap: 2}}
          columnWrapperStyle={{ gap: 2}}
        />

        {image && <UploadingAndroid image={image} video={video} progress={progress}/>}        
        <TouchableOpacity
          onPress={pickImage}
          style={{
            position: "absolute",
            bottom: 90,
            right:30,
            width: 44,
            height: 44,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
        >
          <Ionicons name='image' size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={pickVideo}
          style={{
            position: "absolute",
            bottom: 150,
            right: 30,
            width: 44,
            height:44,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
        >
          <Ionicons name='videocam' size={24} color="white" />
        </TouchableOpacity>
    </View>
  </View>
  );
}
const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    cardHeading:{
        fontSize:20,
        fontWeight:"500",
        
    },
    cardStyle:{
       flex: 1,

    }
})
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { BlurView,VibrancyView } from '@react-native-community/blur'
import { Video } from 'expo-av'
import ProgressBar from './ProgressBar'

export default function Uploading({image,video,progress}) {
  return (
    <View style={[StyleSheet.absoluteFill,styles.conatiner]}>
        <BlurView blurType="light" style={StyleSheet.absoluteFill}>
        </BlurView>
        <BlurView style={styles.blurView} blurType='light'>
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                        borderRadius: 6,
                    }}
                />
            )}
            {video && (
                <Video
                    source={{
                        uri: video,
                    }}
                    videoStyle={{}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode='contain'
                    // shouldPlay
                    // isLooping
                    style={{width: 200,height: 200}}
                    // useNativeControls
                />
            )}
            <Text style={{ fontSize: 12}}>
                Uploading...
            </Text>
            <ProgressBar progress={progress}/>
            <View 
                style={{
                    height: 1,
                    borderWidth: StyleSheet.hairlineWidth,
                    width: "100%",
                    borderColor: "#00000020"
                }}
            />
            <TouchableOpacity>
                <Text style={{fontWeight: 500,color: "#3478F6", fontSize: 17}}>
                    Cancel
                </Text>
            </TouchableOpacity>
        </BlurView> 
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        zIndex: 1,
        
    },
    blurView:{
        width: "70%",
        height:200,
        alignItems: "center",
        rowGap: 12,
        borderRadius: 14,
        margin: 20,
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SvgComponent from '../assets/SVG'

export default function EmptyGallery() {
  return (
    <View style={styles.container}>
      <SvgComponent />
      <Text style={styles.titleText}>
        No Photo Uploaded yet
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText:{
        color: "gray",
        marginTop: 20
    }
})
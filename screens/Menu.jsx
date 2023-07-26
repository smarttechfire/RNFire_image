import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, Switch } from 'react-native-paper'

export default function Menu() {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const _goBack = () => console.log("Went back");
  return (
    <View style={styles.mainContainer}>
      <Appbar.Header style={{backgroundColor: "#0FBCF9"}}>
        <Appbar.BackAction onPress={_goBack} color='white' />
        <Appbar.Content title="Title" color='white' />
      </Appbar.Header>
      <View style={styles.cardStyle}>
        <Text style={styles.cardHeading}>Active</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color='#0FBCF9'/>
      </View>
    </View>
  )
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
        margin: 20,
        padding:10,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        // shadow
        shadowColor: "gray",
        elevation:4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .4,
        shadowRadius: 7,

    }
})
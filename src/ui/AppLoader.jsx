import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import THEME from '../theme'

export const AppLoader = () =>{
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size={24} color={THEME.default}></ActivityIndicator>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
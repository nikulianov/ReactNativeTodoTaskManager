import React from 'react'
import {View,StyleSheet} from "react-native";

export default AppCart = (props) =>{
	return(
		<View style={{...styles.cart,...props.style}}>{props.children}</View>

	)
}

const styles = StyleSheet.create({
	cart:{
		padding:10,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		shadowRadius:2,
		shadowColor:'#000',
		shadowOpacity:0.3,
		shadowOffset:{width:0,height:1},
		elevation:8,
		backgroundColor:'#fff',
		borderRadius:5,
		marginBottom:15
	}
})
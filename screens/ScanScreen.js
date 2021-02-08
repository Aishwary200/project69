import * as React from 'react';
import{Text,View,Image,StyleSheet,TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission:status==='granted',
            buttonState:'clicked',
            scanned:false
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    
    render(){
        const hasCameraPermissions=this.state.hasCameraPermission
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState
        if(buttonState==='clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState==='normal'){
            return(
                <View style={styles.container}>
                <Image source={require("../scanner.jpg")} style={{width:100,height:100,marginLeft:100}}/>
                <Text style={styles.displayText}>Barcode Scanner App</Text>
                <Text style={styles.displayText}>
                    Scanned data:{hasCameraPermissions===true?this.state.scannedData:'request Camera Permission'} 
                </Text>
                <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission}>
                <Text style={styles.displayText}>Scan BarCode</Text>
                </TouchableOpacity>
                </View>
            )
        }
        
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
        margin:50
    },
    scanButton:{
        backgroundColor:'red',
        padding:10,
        margin:100,
        alignItems:'center',
        justifyContent:'center',
        width:150,
        height:50,
        borderRadius:10
    }
})
import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Home from "./Home";
import { ValidateAuthToken } from "../lib/API";
import { UserContext } from "../Contexts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage"

type State = {
    token: string,
    message: string
}

export default class Auth extends React.Component<NativeStackScreenProps<RootParamList, 'Auth'>, State> {
    static contextType = UserContext
    context!: React.ContextType<typeof UserContext>
    
    state: State = {
        token: '',
        message: ''
    }

    attemptLogin = async () => {
        let res = await ValidateAuthToken(this.state.token)
        if (!res.ok) {
            this.setState({
                token: '',
                message: res.message.replace('i', 'I')
            })
            return
        } else {
            this.setState({
                message: ""
            })
            await AsyncStorage.setItem("@token", this.state.token)
            this.context.setUser(this.state.token)
            this.props.navigation.replace('Home')
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Text style={styles.message}>{this.state.message}</Text>
                        <TextInput style={styles.secureInput} secureTextEntry={true}value={this.state.token} onChangeText={(val) => {
                            this.setState({
                                token: val
                            })
                        }} placeholder={"Enter Secure Token"}></TextInput>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.attemptLogin()}>
                            <View style={styles.continueButton}>
                                <Text>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    secureInput: {
        padding: 8,
        borderColor: 'gray',
        borderWidth: 2,
        width: '80%',
        borderRadius: 12,
        fontSize: 18
    },
    continueButton: {
        backgroundColor: '#22ccff',
        padding: 12,
        paddingHorizontal: 42,
        borderRadius: 12,
        margin: 12
    },
    message: {
        fontSize: 16,
        padding: 12
    }
})
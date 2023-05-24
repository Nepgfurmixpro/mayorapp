import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import firebase from "firebase/firestore"

type PagePostProps = {
    id: string
}

export default function PagePost({ navigation, route }: NativeStackScreenProps<RootParamList, 'Post'>) {
    useEffect(() => {
        navigation.setOptions({
            title: route.params.id
        })
    }, [])
    
    return (
        <View>
            <Text>{route.params.id}</Text>
        </View>
    )
}

export type {
    PagePostProps
}
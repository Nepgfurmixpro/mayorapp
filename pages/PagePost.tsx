import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import firebase from "firebase/firestore"
import { PostInfo } from "../lib/schemas";
import { GetPostById } from "../lib/API";
import Loading from "../components/Loading";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { openMapsApp } from "../lib/map";
import { UserContext } from "../Contexts";

type PagePostProps = {
    id: string
}

export default function PagePost({ navigation, route }: NativeStackScreenProps<RootParamList, 'Post'>) {
    const [post, setPost] = useState<PostInfo>()
    const [loading, setLoading] = useState(true)
    const context = useContext(UserContext)

    const loadInfo = async () => {
        setLoading(true)
        let getPost = await GetPostById(route.params.id)
        if (typeof (getPost as any).message == "string") {
            navigation.goBack()
        }
        console.log(getPost)
        navigation.setOptions({
            title: getPost.title
        })
        setPost(getPost)
        setLoading(false)
    }

    useEffect(() => {
        navigation.setOptions({
            title: 'Loading...'
        })
        loadInfo()
    }, [])
    
    return (
        <View style={styles.container}>
            {loading ? 
            <View style={styles.loadingContainer}>
                <Loading color={"#00ffaa"} size={"medium"} />
            </View> :
            <>
                <View>
                    <View>
                        <MapView style={styles.locationMap} initialRegion={{
                            latitude: post!.lat,
                            longitude: post!.long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                            <Marker title={post!.title} coordinate={{
                                latitude: post!.lat,
                                longitude: post!.long,
                            }}></Marker>
                        </MapView>
                    </View>
                    <View style={styles.oimbContainer}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            openMapsApp(post!.lat, post!.long, post!.title)
                        }}>
                            <View style={styles.openInMapsButton}>
                                <Text style={styles.oimbText}>Open in Maps</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{post!.description}</Text>
                        <View style={styles.postDateContainer}>
                            <Text style={styles.postDate}>{new Date(post!.time).toLocaleString()}</Text>
                        </View>
                    </View>
                </View>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    postDateContainer: {
        paddingTop: 18
    },
    locationMap: {
        width: '100%',
        aspectRatio: 1
    },
    description: {
        fontSize: 18,
    },
    openInMapsButton: {
        width: '100%',
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#30c0f0',
        borderRadius: 12
    },
    oimbText: {
        fontSize: 20,
    },
    oimbContainer: {
        padding: 12
    },
    descriptionContainer: {
        padding: 12
    },
    postDate: {
        fontSize: 12
    }
})

export type {
    PagePostProps
}
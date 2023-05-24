import { faPlus, faUser, faUserMinus, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Post from "../components/Post";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import Loading from "../components/Loading";
import { PostInfo } from "../lib/schemas";
import { GetPosts } from "../lib/API";
import { UserContext } from "../Contexts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }: NativeStackScreenProps<RootParamList, 'Home'>) {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState<PostInfo[]>([])
    const context = useContext(UserContext)

    const loadPosts = async () => {
        setLoading(true)
        let posts = await GetPosts()

        setPosts(posts)
        setLoading(false)
    }

    useEffect(() => {
        loadPosts()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                <Text style={styles.topBarTitle}>Where's My Mayor?</Text>
            </View>
            <View style={styles.body}>
                <ScrollView onScrollEndDrag={(ev) => {
                    if (ev.nativeEvent.contentOffset.y <= -150 && !loading) {
                        loadPosts()
                    }
                }} style={styles.posts} contentContainerStyle={styles.postsContainer}>
                    <View style={{alignItems: 'center'}}>
                        <View style={!loading ? {top: -150, position: 'absolute'} : {}}>
                            <Loading size="small" color="#00ffaa" />
                        </View>
                    </View>
                    {!loading ? <>
                        {posts.map((v, i) => {
                            return (
                                <Post key={i} onPress={() => {
                                    navigation.push('Post', {
                                        id: v.id
                                    })
                                }} id={v.id} title={v.title} description={v.description} created={v.time} />
                            )
                        })}
                        {posts.length <= 0 && <Text style={styles.noContent}>Sorry, no content</Text>}
                    </> : <></>}
                </ScrollView>
            </View>
            <View style={styles.bottomNav}>
                {context.user == "" ? <View></View> : <TouchableOpacity
                    onPress={() => {
                        AsyncStorage.setItem("@token", "")
                        context.setUser("")
                    }}>
                        <FontAwesomeIcon icon={faUserSlash} size={32} />
                </TouchableOpacity>}
                <TouchableOpacity
                    onPress={() => {
                        if (context.user == "") {
                            navigation.push("Auth")
                        } else {
                            navigation.push("CreatePost")
                        }
                    }}>
                        <FontAwesomeIcon icon={context.user == "" ? faUser : faPlus} size={32} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    topBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    topBarTitle: {
        fontSize: 32,
        fontWeight: '700',
    },
    body: {
        flex: 1,
        width: '100%',
    },
    bottomNav: {
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center'
    },
    posts: {
        paddingVertical: 32,
    },
    postsContainer: {
        gap: 10,
        paddingHorizontal: 10,
        paddingBottom: 40
    },
    noContent: {
        textAlign: 'center',
        fontSize: 20
    }
})
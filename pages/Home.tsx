import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Post from "../components/Post";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import Loading from "../components/Loading";
import { PostInfo } from "../lib/supabase";
import { DatabaseContext } from "../Contexts";

export default function Home({ navigation }: NativeStackScreenProps<RootParamList, 'Home'>) {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState<PostInfo[]>([])
    const supabase = useContext(DatabaseContext)

    const loadPosts = async () => {
        let { error, data } = await supabase!.from("posts").select("*").order('id', {
            ascending: true
        })

        setPosts(data! as PostInfo[])
    }

    useEffect(() => {
        loadPosts()
    })

    return (
        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                <Text style={styles.topBarTitle}>Where's My Mayor?</Text>
            </View>
            <View style={styles.body}>
                <ScrollView onScrollEndDrag={(ev) => {
                    if (ev.nativeEvent.contentOffset.y <= -200 && !loading) {
                        setLoading(true)
                        setTimeout(() => {
                            setLoading(false)
                        }, 100)
                    }
                }} style={styles.posts} contentContainerStyle={styles.postsContainer}>
                    <View style={{alignItems: 'center'}}>
                        <View style={!loading ? {top: -200, position: 'absolute'} : {}}>
                            <Loading size="small" color="#00ffaa" />
                        </View>
                    </View>
                    {posts.map((v, i) => {
                        return (
                            <Post key={i} onPress={() => {
                                navigation.push('Post', {
                                    id: i.toString()
                                })
                            }} id={""} title="At the Potato Festival!" description="Come meet me here at the potato festival! I will be hanging out there for the day. This is some text to increase the length of the description" />
                        )
                    })}
                </ScrollView>
            </View>
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    onPress={() => {
                        alert("User")
                    }}>
                        <FontAwesomeIcon icon={faUser} size={32} />
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
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingVertical: 12,
    },
    posts: {
        paddingVertical: 32,
    },
    postsContainer: {
        gap: 10,
        paddingHorizontal: 10,
        paddingBottom: 40
    }
})
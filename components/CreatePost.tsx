import { View } from "react-native";
import { PredicteWithMaps } from "../lib/API";
import { useEffect } from "react";

export default function CreatePost() {
    useEffect(() => {
        PredicteWithMaps("176 Eagle Creek")
    }, [])
    return (
        <View>

        </View>
    )
}
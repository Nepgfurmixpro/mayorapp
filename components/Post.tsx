import { faMapPin, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

type Props = {
    id: string,
    title: string,
    description: string,
    created: string,
    onPress: () => void
}

export default class Post extends React.Component<Props> {
    render() {
        return (
            <TouchableHighlight style={{
                borderRadius: 16,
            }} onPress={() => {
                this.props.onPress()
            }}>
                <View style={styles.container}>
                    <View>
                        <FontAwesomeIcon icon={faLocationDot} size={38} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text>{this.props.description.slice(0, 120).trim()}{this.props.description.length > 120 ? "..." : ""}</Text>
                        <Text style={styles.location}>Created: {new Date(this.props.created).toLocaleString()}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: "#f0f0f0",
        borderRadius: 16
    },
    info: {
        padding: 3
    },
    title: {
        fontSize: 18,
        fontWeight: '700'
    },
    location: {
        paddingVertical: 4,
        fontWeight: '500'
    }
})
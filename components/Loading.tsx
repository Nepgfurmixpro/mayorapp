import React from "react";
import { Easing } from "react-native";
import { ColorValue } from "react-native";
import { StyleSheet } from "react-native";
import { View, Animated } from "react-native";

type Props = {
    color: ColorValue,
    size: "small" | "medium" | "large"
}

export default class Loading extends React.Component<Props> {
    spin = new Animated.Value(0)

    componentDidMount(): void {
        Animated.loop(
            Animated.timing(this.spin, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.linear
            }), 
        {
            iterations: Number.MAX_SAFE_INTEGER,
        }).start()
    }

    render() {
        let spinInter = this.spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <Animated.View style={[styles.spinner, styles[this.props.size], {
                borderRightColor: this.props.color,
                transform: [
                    {
                        rotate: spinInter
                    }
                ]
            }]}>
                
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    spinner: {
        borderRadius: 99999,
        borderWidth: 2,
        aspectRatio: 1,
        borderColor: 'gray',
    },
    small: {
        width: 40
    },
    medium: {
        width: 60
    },
    large: {
        width: 80
    }
})
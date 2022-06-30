import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, Pre, Pressable, Te } from "react-native";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 12px;
  align-self: center;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = (duration) => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
      duration: duration,
    }).start(toggleUp);
  };

  const height = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [50, 100],
  });
  const width = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [50, 100],
  });
  const borderBottomLeftRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [120, 0],
  });
  const borderTopRightRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [180, 0],
  });
  const borderBottomRightRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [0, 60],
  });
  const borderTopLeftRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [0, 60],
  });
  const rotation = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const bgColor = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(156, 207, 19)", "rgb(253, 255, 0)"],
  });
  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, -100, 100, 300],
    outputRange: [1, 0, 0, 1],
  });
  Y_POSITION.addListener(() => {
    console.log(rotation);
    console.log("Y VALUE:", Y_POSITION);
    console.log("rotation VALUE:", rotation);
    console.log("bgColor VALUE:", bgColor);
  });

  const StyledAnimatedBox = (props) => {
    return (
      <Pressable
        onPress={() => {
          moveUp(props.second*1000);
        }}
      >
        <AnimatedBox
          style={{
            height,
            width,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            borderTopLeftRadius,
            backgroundColor: bgColor,
            opacity,
            transform: [{ rotateY: rotation }, { translateY: Y_POSITION }],
          }}
        >
          <Text>{props.second} sec</Text>
        </AnimatedBox>
      </Pressable>
    );
  };

  return (
    <Container>
        <StyledAnimatedBox second={1}></StyledAnimatedBox>
        <StyledAnimatedBox second={3}></StyledAnimatedBox>
        <StyledAnimatedBox second={5}></StyledAnimatedBox>
    </Container>
  );
}

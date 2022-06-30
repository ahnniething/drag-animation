import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, Pre, Pressable} from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
      duration:3000,
    }).start(toggleUp);
  };
  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, -100, 100, 300],
    outputRange: [1, 0.1, 0.1, 1],
  });
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  Y_POSITION.addListener(() => {
    console.log("Y VALUE:", Y_POSITION);
    console.log("opacity VALUE:", opacity);
    console.log("borderRadius VALUE:", borderRadius);
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox style={{
          opacity,
          borderRadius,
          transform: [{ translateY: Y_POSITION }] }} />
      </Pressable>
    </Container>
  );
}

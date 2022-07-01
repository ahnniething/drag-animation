import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Dimensions, Easing, Pre, Pressable, Te } from "react-native";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  justify-content: center;
  width: 200px;
  height: 200px;
`;

const Text = styled.Text`
  font-size: 12px;
  align-self: center;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const [xColor, setXColor] = useState(false);
  const position = useRef(new Animated.ValueXY({ x: -SCREEN_WIDTH / 2 + 100, y: -SCREEN_HEIGHT / 2 + 100})).current;
  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    duration:3000,
    useNativeDriver: false,
  });

  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    duration:3000,
    useNativeDriver: false,
  });

  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    duration:3000,
    useNativeDriver: false,
  });

  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    duration:3000,
    useNativeDriver: false,
  });

  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };

  const rotation = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const bgColorY = position.y.interpolate({
    inputRange: [-300,  300],
    outputRange: ["rgb(252, 239, 207)","rgb(0, 0, 0)"],
  });
  const bgColorX = position.x.interpolate({
    inputRange: [-95,  95],
    outputRange: ["rgb(1, 239, 207)", "rgb(0, 0, 0)"],
  });

  position.y.addListener(() => {
    JSON.stringify(position.y).replace('-','') === "322" ? setXColor(true) :  setXColor(false);
  });

  const StyledAnimatedBox = (props) => {
    return (
      <Pressable
        onPress={() => {
          moveUp(3000);
        }}
      >
        <AnimatedBox
          style={{
            borderRadius :100,
            backgroundColor : xColor ?  bgColorX : bgColorY,
            transform: [...position.getTranslateTransform()],
          }}
        >
          <Text>ahnniething</Text>
        </AnimatedBox>
      </Pressable>
    );
  };

  return (
    <Container>
      <StyledAnimatedBox></StyledAnimatedBox>
    </Container>
  );
}

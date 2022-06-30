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
  const [up, setUp] = useState(false);
  const position = useRef(new Animated.ValueXY({ x: -SCREEN_WIDTH / 2 + 100, y: -SCREEN_HEIGHT / 2 + 100})).current;
  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });

  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });

  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
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
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(156, 207, 19)", "rgb(253, 255, 0)"],
  });
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  position.y.addListener(() => {
    console.log("Y VALUE:", position);
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
            borderRadius,
            backgroundColor: bgColor,
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

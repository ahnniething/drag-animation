import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, Pre, Pressable} from "react-native";


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {


  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
      duration:3000,
    }).start(toggleUp);
  };
  const borderTopRightRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [120, 60],
  });
  const height = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [60, 100],
  });
  const width = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [60, 100],
  });
  const borderBottomLeftRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [180, 60],
  });
  const rotation = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const bgColor = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(156, 207, 19)", "rgb(253, 255, 0)"],
  });
  Y_POSITION.addListener(() => {
    console.log(rotation);
    console.log("Y VALUE:", Y_POSITION);
    console.log("rotation VALUE:", rotation);
    console.log("bgColor VALUE:", bgColor);
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox style={{
          height,
          width,
          borderTopRightRadius,
          borderBottomLeftRadius,
          backgroundColor: bgColor,
          transform: [{ rotateY: rotation},{translateY: Y_POSITION }] }} />
      </Pressable>
    </Container>
  );
}

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, PanResponder } from "react-native";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  justify-content: center;
  width: 150px;
  height: 150px;
`;

const Text = styled.Text`
  font-size: 12px;
  align-self: center;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);


export default function App() {
  const position = useRef(new Animated.ValueXY({ x:0, y: 0})).current;


  const bgColor = position.y.interpolate({
    inputRange: [-300,  300],
    outputRange: ["rgb(252, 239, 207)","rgb(0, 0, 0)"],
  });

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      position.setValue({
        x: dx,
        y: dy
      });
    }
  })).current;
  return (
    <Container>
      <AnimatedBox
      {...panResponder.panHandlers}
          style={{
            borderRadius :100,
            backgroundColor :bgColor ,
            transform: [...position.getTranslateTransform()],
          }}
        >
          <Text>ahnniething</Text>
        </AnimatedBox>
    </Container>
  );
}

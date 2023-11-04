import React from 'react'
import { TPoint } from './App';

type TProps = {
  name: string;
  positionFrom: TPoint;
  positionTo: TPoint;
}

export const CircleKeyframe: React.FC<TProps> = ({name, positionFrom, positionTo}) => {
  return (
    <style>
      {`@keyframes ${name} {
        0% {
          top: ${positionFrom.y}px;
          left: ${positionFrom.x}px;
        }
        100% {
          top: ${positionTo.y}px;
          left: ${positionTo.x}px;
        }
      }`}
    </style>
  );
}

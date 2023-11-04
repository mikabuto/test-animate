import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { CircleKeyframe } from './CircleKeyframe';

export type TPoint = {
  x: number;
  y: number;
}

function App() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(5);
  const intervalRef = useRef<NodeJS.Timer | undefined>();
  const [circleCoordinatesFrom, setCircleCoordinatesFrom] = useState<TPoint | null>(null);
  const [circleCoordinatesTo, setCircleCoordinatesTo] = useState<TPoint | null>(null);

  useEffect(() => {
    if (isButtonDisabled) {
      intervalRef.current = setInterval(() => setTimer(time => {
        if (time === 1) {
          clearInterval(intervalRef.current);
          setIsButtonDisabled(false);
          return 5;
        }
        return time - 1;
      }), 1000);
    }
  }, [isButtonDisabled]);

  useEffect(() => {
    if (isButtonDisabled) {
      const elemFrom = document.getElementById('block1');
      const elemTo = document.getElementById('block2');
      const sourceCoordinates = elemFrom?.getBoundingClientRect();
      const destinationCoordinates = elemTo?.getBoundingClientRect();
      if (elemFrom && elemTo && sourceCoordinates && destinationCoordinates) {

        const [sourceX, sourceY] = [sourceCoordinates.left + elemFrom.clientWidth / 2, sourceCoordinates.top + elemFrom.clientHeight / 2];
        const [destX, destY] = [destinationCoordinates.left + elemTo.clientWidth / 2, destinationCoordinates.top + elemTo.clientHeight / 2];
        if (sourceX && sourceY && destX && destY) {
          setCircleCoordinatesFrom({x: sourceX, y: sourceY});
          setCircleCoordinatesTo({x: destX, y: destY});
        }
      }
    }
  }, [isButtonDisabled]);

  useEffect(() => {
    if (circleCoordinatesFrom) {
      setTimeout(() => setCircleCoordinatesFrom(null), 2000);
    }
  }, [circleCoordinatesFrom]);

  return (
    <div className="App">
      {circleCoordinatesFrom && circleCoordinatesTo && 
        <>
          <CircleKeyframe name='circleMove' positionFrom={circleCoordinatesFrom} positionTo={circleCoordinatesTo} />
          <div className='circle'></div>
        </>
      }
      <div className='block-container'>
        <div className='block-wrapper block-wrapper-with-animation'>
          <div id='block1' className='block block1'>1</div>
        </div>
        <div className='block-wrapper block-wrapper2'>
          <div id='block2' className='block block2'>2</div>
        </div>
      </div>
      <div className='button-wrapper'>
        <button 
          id='start-button' 
          className={`button`} 
          disabled={isButtonDisabled} 
          onClick={() => {
            if (!isButtonDisabled) {
              console.log('click');
              setIsButtonDisabled(true);
            }
          }}
        >{isButtonDisabled ? timer : 'Start'}</button>
      </div>
    </div>
  );
}

export default App;

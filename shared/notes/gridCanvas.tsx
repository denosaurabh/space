import useNotes from '@state/notes';
import { styled } from '@styled';
import { useEffect, useRef, useState } from 'react';

const Selection = styled('div', {
  position: 'absolute',

  backgroundColor: '$grey-200',
});

const GridCanvas: React.FC = () => {
  const [selection, setSelection] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>();
  const selectionRef = useRef<HTMLDivElement>();

  const addNote = useNotes(({ addNote }) => addNote);

  let mouseDownPos;
  let selectionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  let parentRectPosition = {
    top: 0,
    left: 0,
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const { innerWidth: width, innerHeight: height } = window;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    console.log(canvasRef.current);

    const context = canvasRef.current.getContext('2d');

    for (let x = 0; x <= width; x += 10) {
      for (let y = 0; y <= height; y += 10) {
        context.fillStyle = '#212529';
        context.beginPath();
        context.rect(x, y, 1, 1);
        context.fill();
      }
    }
  }, [canvasRef]);

  const handleDragMove = (e) => {
    console.log('drag moving');

    if (!selectionRef.current) return;
    setSelection({
      x: mouseDownPos.x,
      y: mouseDownPos.y,
      width: e.clientX - mouseDownPos.y,
      height: e.clientY - mouseDownPos.x,
    });

    selectionBox = {
      x: mouseDownPos.x,
      y: mouseDownPos.y,
      width: e.clientX - mouseDownPos.y,
      height: e.clientY - mouseDownPos.x,
    };
  };

  const onDragStartHandler = (e) => {
    const { top, left } = e.target.getBoundingClientRect();
    parentRectPosition = { top, left };

    mouseDownPos = { x: e.clientY, y: e.clientX };
    setSelection({ ...selection, x: e.clientY, y: e.clientX });

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', onDragEndHandler);
  };

  const onDragEndHandler = () => {
    console.log('drag ended');

    const { top, left } = parentRectPosition;

    if (selectionBox.width >= 200 && selectionBox.height >= 100) {
      addNote({
        position: { x: selectionBox.y - left, y: selectionBox.x - top },
        size: { width: selectionBox.width, height: selectionBox.height },
        text: '',
      });
    }

    mouseDownPos = { x: 0, y: 0 };
    setSelection({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    document.removeEventListener('mousemove', handleDragMove, {
      capture: false,
    });
    document.removeEventListener('mouseup', onDragEndHandler, {
      capture: false,
    });
  };

  const onMouseDownHandler = (e) => {
    if (e.target.className.includes('grid-canvas')) {
      onDragStartHandler(e);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="grid-canvas"
        onMouseDown={onMouseDownHandler}
      />

      <Selection
        ref={selectionRef}
        css={{
          top: `${selection.x}px`,
          left: `${selection.y}px`,
          width: `${selection.width}px`,
          height: `${selection.height}px`,
        }}
      />
    </>
  );
};

export default GridCanvas;

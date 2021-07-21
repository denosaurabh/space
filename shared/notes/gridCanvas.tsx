import { styled } from '@styled';
import { useEffect, useRef, useState } from 'react';

import { NotePosition, NoteSize } from '@lib/store/notes';

const Selection = styled('div', {
  position: 'fixed',
  backgroundColor: '$grey-200',
});

interface GridCanvasI {
  className: string;
  width: number;
  height: number;
  gridSize: number;
  enableCanvas: boolean;
  onSelectionComplete: ({
    position,
    size,
  }: {
    position: NotePosition;
    size: NoteSize;
  }) => void;
}

const GridCanvas: React.FC<GridCanvasI> = ({
  className,
  width,
  height,
  gridSize,
  enableCanvas,
  onSelectionComplete,
}) => {
  const [selection, setSelection] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>();
  const selectionRef = useRef<HTMLDivElement>();

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

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const context = canvasRef.current.getContext('2d');

    if (!enableCanvas) return;

    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        context.fillStyle = '#212529';
        context.beginPath();
        context.rect(x, y, 1, 1);
        context.fill();
      }
    }
  }, [canvasRef, width, height, gridSize, enableCanvas]);

  const handleDragMove = (e) => {
    if (!selectionRef.current && !canvasRef.current) return;

    const canvasBox = canvasRef.current.getBoundingClientRect();

    // When Selection Go outside the bound
    if (
      e.clientY < canvasBox.top ||
      e.clientY > canvasBox.bottom ||
      e.clientX > canvasBox.right ||
      e.clientX < canvasBox.left
    ) {
      setSelection({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });

      selectionBox = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };

      return;
    }

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
    const { top, left } = parentRectPosition;

    // Calling the Func
    onSelectionComplete({
      position: { x: selectionBox.y - left, y: selectionBox.x - top },
      size: { width: selectionBox.width, height: selectionBox.height },
    });

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
    if (e.target.className.includes(className)) {
      onDragStartHandler(e);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        onMouseDown={onMouseDownHandler}
        style={{ zIndex: 100, opacity: enableCanvas ? 1 : 0 }}
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

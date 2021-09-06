import { styled } from '@styled';
import { useEffect, useRef, useState } from 'react';

import { NotePosition, NoteSize } from '@lib/store/notes';
import useSettings from '@state/settings';

import isDblTouchTap from '@utils/doubleTouchTap';
import mRound from '@utils/mRound';

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
  onDoubleClick: ({ pos }: { pos: NotePosition }) => void;
}

const GridCanvas: React.FC<GridCanvasI> = ({
  className,
  width,
  height,
  gridSize,
  enableCanvas,
  onSelectionComplete,
  onDoubleClick,
}) => {
  const isDarkTheme = useSettings((state) => state.darkTheme);

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
        context.fillStyle = isDarkTheme ? '#adb5bd' : '#212529';
        context.beginPath();
        context.rect(x, y, 1, 1);
        context.fill();
      }
    }
  }, [canvasRef, width, height, gridSize, enableCanvas, isDarkTheme]);

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

    const selectionObj = {
      x: mRound(mouseDownPos.x, gridSize),
      y: mRound(mouseDownPos.y, gridSize),
      width: mRound(e.clientX - mouseDownPos.y, gridSize),
      height: mRound(e.clientY - mouseDownPos.x, gridSize),
    };

    setSelection(selectionObj);
    selectionBox = selectionObj;
  };

  const onDragStartHandler = (e) => {
    const { top, left } = e.target.getBoundingClientRect();
    parentRectPosition = { top, left };

    // Cursor to Crosshair
    document.body.style.cursor = 'crosshair';
    document.body.style.userSelect = 'none';

    mouseDownPos = {
      x: mRound(e.clientY, gridSize),
      y: mRound(e.clientX, gridSize),
    };
    setSelection({ ...selection, ...mouseDownPos });

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', onDragEndHandler);
  };

  const onDragEndHandler = () => {
    const { top, left } = parentRectPosition;

    // Cursor to Crosshair
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'unset';

    // Calling the Func
    onSelectionComplete({
      position: {
        x: mRound(selectionBox.y - left, gridSize),
        y: mRound(selectionBox.x - top, gridSize),
      },
      size: {
        width: mRound(selectionBox.width, gridSize),
        height: mRound(selectionBox.height, gridSize),
      },
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

  const onDoubleClickHandler = (e, type = 'mouse') => {
    if (!canvasRef.current) return;

    const { top, left } = canvasRef.current.getBoundingClientRect();

    const x = type === 'mouse' ? e.clientX : e.touches[0].clientX;
    const y = type === 'mouse' ? e.clientY : e.touches[0].clientY;

    const pos = { x: mRound(x - left, gridSize), y: mRound(y - top, gridSize) };
    onDoubleClick({ pos });
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        onMouseDown={onMouseDownHandler}
        onDoubleClick={onDoubleClickHandler}
        onTouchStart={(e) => {
          if (isDblTouchTap(e)) {
            onDoubleClickHandler(e, 'touch');
          }
        }}
        style={{
          zIndex: 100,
          opacity: enableCanvas ? 1 : 0,
        }}
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

import { useEffect, useRef } from 'react';

const GridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>();

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

  //   function handleBoardDragMove(e) {
  //     if (!canvasRef.current) return;

  //     const context = canvasRef.current;
  //     const canvas = canvasRef.current.getContext('2d');

  //     const rect = context.getBoundingClientRect();
  //     console.log(e, rect);

  //     console.log(
  //       e.clientX,
  //       e.clientY,
  //       e.clientX - rect.left,
  //       e.clientY - rect.top
  //     );

  //     const absWidth = e.clientX - rect.left;
  //     const absHeight = e.clientY - rect.top;

  //     canvas.fillStyle = '#adb5bd';
  //     canvas.beginPath();
  //     canvas.rect(e.clientX, absHeight, absWidth, absHeight);
  //     canvas.fill();
  //   }

  //   const onDragStartHandler = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     // console.log(e.target.className);
  //     console.log(
  //       // e.target.className.includes('notes-container') ? 'dragged' : 'not',
  //       e.target
  //     );

  //     document.addEventListener('mousemove', handleBoardDragMove);
  //     document.addEventListener('mouseup', onDragEndHandler);
  //   };

  //   const onDragEndHandler = (e) => {
  //     // console.log(e);

  //     document.removeEventListener('mousemove', handleBoardDragMove);
  //     document.removeEventListener('mouseup', handleBoardDragMove); // onDragStartHandler
  //   };

  return (
    <canvas
      ref={canvasRef}
      id="grid-canvas"
      draggable
      //   onDragStart={onDragStartHandler}
      //   onDragEnd={onDragEndHandler}
    />
  );
};

export default GridCanvas;

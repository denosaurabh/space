import { useEffect, useRef, useState } from 'react';
import { styled } from '@styled';

import GridCanvas from '@shared/notes/gridCanvas';

import { NotePosition, NoteSize } from '@lib/store/notes';

const AllNotesContainerStyled = styled('div', {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

interface AllNotesContainerI {
  css: Record<string, unknown>;
  canvasClassName: string;
  containerClassName: string;
  enableCanvas: boolean;
  gridSize: number;
  onSelectionComplete: ({
    position,
    size,
  }: {
    position: NotePosition;
    size: NoteSize;
  }) => void;
}

const AllNotesContainer: React.FC<AllNotesContainerI> = ({
  css,
  canvasClassName,
  containerClassName,
  onSelectionComplete,
  enableCanvas,
  gridSize,
  children,
}) => {
  const notesContainerRef = useRef<HTMLDivElement>();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!notesContainerRef.current) return;

    const { width, height } = notesContainerRef.current.getBoundingClientRect();
    setSize({ width, height });
  }, []);

  return (
    <AllNotesContainerStyled
      className={containerClassName}
      ref={notesContainerRef}
      css={css}
    >
      <GridCanvas
        className={canvasClassName}
        width={size.width}
        height={size.height}
        onSelectionComplete={onSelectionComplete}
        gridSize={gridSize}
        enableCanvas={enableCanvas}
      />
      {children}
    </AllNotesContainerStyled>
  );
};

export default AllNotesContainer;

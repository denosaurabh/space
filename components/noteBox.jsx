import { useState, useEffect } from 'react';
import { styled } from '@styled';

const NoteContainer = styled('div', {
    width: '20rem',
    height: '30rem',
    border: '1px solid #000',
    borderRadius: '$small',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.25s',
    '&:active': {
        boxShadow: '5px 5px 10px 0px #E9ECEF',
    }
});

const NoteHeader = styled('div', {
    width: '100%',
    height: '20px',
    borderBottom: '1px solid #000',
    '&:hover': {
        cursor: 'grab'
    },
    '&:active': {
        cursor: 'grabbing'
    }
})

const NoteContent = styled('textarea', {
    width: '100%',
    height: '100%',
    padding: '1rem',
    fontFamily: '$mono',
    fontSize: '0.8rem',
    resize: 'none',
    border: 'none',
    borderRadius: '$small',
    outline: 'none'
})

const NoteBox = () => {
    const [state, setState] = useState({
        x: 100,
        y: 100,
        dragging: false
    });
    const [localWindow, setWindow] = useState(null)

    useEffect(() => {
        if (!window) return;
        setWindow(window)
    }, [])

    // const mouseMoving = e => {
    //     console.log('moving')
    //     // setState({ ...state, x: e.clientY, y: e.clientX })
    // }

    // const handleDragStart = e => {
    //     console.log('drag start')

    //     localWindow.addEventListener('mousemove', mouseMoving, { passive: false, useCapture: false })
    // }

    // const handleDrag = e => {
    //     console.log('dragging')
    //     setState({ ...state, draggable: true })
    // }

    // const handleDragEnd = e => {
    //     console.log('drag ended')

    //     document.removeEventListener("mousemove", mouseMoving);
    // }

    return (
        <NoteContainer css={{
            transform: `translateY(${state.x}px) translateX(${state.y}px)`,
            // left: `${state.y}px`
        }}>
            <NoteHeader 
                // draggable 
                // onDragStart={handleDragStart} 
                // onDrag={handleDrag} 
                // onDragEnd={handleDragEnd}
            >

            </NoteHeader>

            <NoteContent placeholder="Type your pins here ....." />
        </NoteContainer>
    )
}

export default NoteBox;
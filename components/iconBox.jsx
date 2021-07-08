import { styled } from '@styled';

const Icon = styled('div', {
    width: '3rem',
    height: '3rem',
    backgroundColor: '$icon',
    borderRadius: '$small',
    display: 'grid',
    placeItems: 'center',
    fontSize: '1.4rem',
    transition: '$medium',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: '$iconHover'
    }
})

const IconBox = ({ icon }) => {
    return (
        <Icon>
            {icon}
        </Icon>
    )
}

export default IconBox;
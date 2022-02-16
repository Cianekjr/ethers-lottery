import styled from '@emotion/styled'

export const SHeader = styled.header({
  fontSize: '1rem',
  padding: '0 2em',
  backgroundColor: '#282c34',
  height: '3em',
  display: 'flex',
  alignItems: 'center',

  '@media (min-width: 768px)': {
    fontSize: '1.5rem',
  },
})

export const SLogo = styled.h1({
  color: '#fff',
  fontSize: '1em',
})

export const SAddress = styled.span({
  color: '#fff',
  fontSize: '1em',
  maxWidth: '6em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  display: 'block',
})

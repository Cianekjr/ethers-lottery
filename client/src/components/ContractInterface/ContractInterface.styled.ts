import styled from '@emotion/styled'

export const SParagraph = styled.p({
  fontSize: '1.5em',
  padding: '0.5em 0',
})

export const SHeading = styled.h2({
  fontSize: '2em',
  marginBottom: '1em',
})

export const SInputWrapper = styled.div({
  fontSize: '1.2em',
  display: 'grid',
  gridAutoFlow: 'column',
  marginBottom: '2em',

  '& :placeholder': {},
})

export const SInput = styled.input({
  fontSize: '1em',
  height: '2em',
  paddingLeft: '1em',
  borderRadius: '1.5em 0 0 1.5em',
})

export const SInputButton = styled.button({
  cursor: 'pointer',
  fontSize: '1em',
  padding: '0 1em',
  height: '2em',
  border: 'none',
  backgroundColor: '#282c34',
  color: '#fff',
  borderRadius: '0 1.5em 1.5em 0',
})

export const SActionButton = styled.button({
  cursor: 'pointer',
  fontSize: '1.5em',
  padding: '0 1em',
  border: '2px solid #282c34',
  backgroundColor: 'transparent',
  color: '#282c34',
  borderRadius: '1.5em',
})

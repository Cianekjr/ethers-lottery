import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

export const SWrapper = styled.section({
  fontSize: '1em',
  textAlign: 'center',
})

const rotateAnimation = keyframes`
  from {
		transform: rotate(0deg);
  }
	to {
    transform: rotate(360deg);
  }
`

export const SAnimatedSvg = styled.img({
  width: '40vmin',
  pointerEvents: 'none',
  userSelect: 'none',

  '@media(prefers-reduced-motion: no-preference)': {
    animation: `${rotateAnimation} infinite 12s linear`,
  },
})

export const SParagraph = styled.p({
  fontSize: '1.5em',
  padding: '1em',
})

export const SActionButton = styled.button({
  cursor: 'pointer',
  fontSize: '1.2em',
  padding: '0.5em 1em',
  border: 'none',
  backgroundColor: '#282c34',
  color: '#fff',
  borderRadius: '1.5em',
})

import styled, { css } from 'styled-components'

const variants = {
  primary: {
    color: '#ffffff',
    backgroundColor: '#1D3461',
    border: 'none',
  },
}

type ButtonProps = {
  variant: keyof typeof variants
}

export const Button = styled.button<ButtonProps>`
  ${({ variant }) => {
    const style = variants[variant]

    return css`
      color: ${style.color};
      background-color: ${style.backgroundColor};
      border: ${style.border};
    `
  }}
`

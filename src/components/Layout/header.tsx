"use client"
import Link from 'next/link'
import styled from 'styled-components'

const HeaderRoot = styled.header`
    padding: 0px 0px;  
    border-bottom: 1px solid;
  `
const Header = () => {
  return (
    <>
      <HeaderRoot>
        <nav>
          <Link href="/">トップ</Link>
        </nav>
      </HeaderRoot>
    </>
  )
}

export default Header

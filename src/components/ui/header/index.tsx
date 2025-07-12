"use client"
import Link from 'next/link'
import styled from 'styled-components'

const HeaderRoot = styled.header`
    padding: 0px 0px;  
    border-bottom: 1px solid;
  `

const Ul = styled.ul`
    display: flex;
    padding: 0;
  `
const Li = styled.li`
    list-style: none;
    margin-right: 20px;
  `
const Header = () => {
  return (
    <>
      <HeaderRoot>
        <nav>
          <Ul>
            <Li>
              <Link href="/">トップ</Link>
            </Li>
            <Li>
              <Link href="/header/app1">アプリ１</Link>
            </Li>
            <Li>
              <Link href="/header/app2">アプリ２</Link>
            </Li>
          </Ul>
        </nav>
      </HeaderRoot>
    </>
  )
}

export default Header

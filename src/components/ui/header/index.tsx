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
  const links = [
    { path: "/", label: "トップ" },
    { path: "app1", label: "アプリ１" },
    { path: "app2", label: "アプリ２" },
    { path: "app3", label: "アプリ３" },
  ];

  return (
    <>
      <HeaderRoot>
        <nav>
          <Ul>
            {links.map(({ path, label }, index) => {
              const href = path === "/" ? "/" : `/header/${path}`;
              return (
                <Li key={index} >
                  <Link href={href} >{label}</Link>
                </Li>
              )
            })}
          </Ul>
        </nav>
      </HeaderRoot>
    </>
  )
}

export default Header

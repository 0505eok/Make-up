import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLogin } from "../store/store";
import { LogedHeader } from "./LogedHeader";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const HeaderOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -2px -2px 4px #ececec,
    3px 3px 8px #b8b8b8;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
`

const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  /* transition: all 0.5s; */
  @media only screen and (max-width: 1200px) {
    width: 768px;
  }

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 501px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
`

const Logo = styled.div`
  grid-column: span 3;
  height: 30px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  color: black;

  @media only screen and (max-width: 501px) {
    grid-column: span 2;
  }
`

const Search = styled.input`
  grid-column: 4 / span 7;
  @media only screen and (max-width: 501px) {
    display: none;
  }
`

const ButtonBox = styled.div`
  grid-column: 11 / span 2;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
  @media only screen and (max-width: 501px) {
    grid-column: 4 / span 3;
  }
`

const Btn = styled.div`
  height: 30px;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  flex: 1;
  margin: 0 10px;
  &:hover {
    background-color: #dbdbdb;
  }
`

interface IProps {
  isLoginModalOn: boolean;
  loginModalHandler: (modalState: number) => void;
  isSignupModalOn: boolean;
  signupModalHandler: (modalState: number) => void;
}

export const Header = ({isLoginModalOn, loginModalHandler, isSignupModalOn, signupModalHandler}: IProps) => {

  const [login, setLogin] = useRecoilState(isLogin)

  if (login) {
    return <LogedHeader/>
  }

  return (
    <HeaderOuter>
      {isLoginModalOn ? 
        (!isSignupModalOn ?
          (<LoginModal isLoginModalOn={isLoginModalOn} loginModalHandler={loginModalHandler} signupModalHandler={signupModalHandler}/>) : 
          (<SignupModal isSignupModalOn={isLoginModalOn} loginModalHandler={loginModalHandler} signupModalHandler={signupModalHandler} isLoginModalOn={isLoginModalOn}/>)
        )
        : ''
      }
      <Container>
        <Link to='/'>
          <Logo>LOGO</Logo>
        </Link>
        <Search type={"text"}/>
        <ButtonBox>
          <Btn onClick={() => {
            loginModalHandler(0)
          }}>로그인</Btn>
          <Btn onClick={() => {
            loginModalHandler(0)
            signupModalHandler(0)
          }}>회원가입</Btn>
        </ButtonBox>
      </Container>
    </HeaderOuter>
  )
}
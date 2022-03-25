import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  followerModal,
  following,
  followModal,
  isLogin,
  hamberger,
} from "../store/store";
const Container = styled.div`
  z-index: 999;
  font-family: "SUIT-Light";
  transition: 1s;
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

const SideBar = styled.div<{ hamberger: RecoilState<boolean> }>`
  background-color: #fff;
  width: 300px;
  height: 100%;
  position: fixed;
  right: 0px;
  display: flex;
  flex-direction: column;

  > div {
    margin: 20px;
    margin-right: 40px;
    margin-left: auto;
    text-align: right;
    width: 100px;
    :after {
      display: block;
      content: "";
      border-bottom: solid 5px var(--main-color);
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    :hover:after {
      transform: scaleX(1);
      transform-origin: 100% 0%;
    }
  }
  > link > div {
    margin: 20px;
    margin-right: 40px;
    margin-left: auto;
    text-align: right;
    width: 100px;
    :after {
      display: block;
      content: "";
      border-bottom: solid 5px var(--main-color);
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    :hover:after {
      transform: scaleX(1);
      transform-origin: 100% 0%;
    }
  }
`;

const Search = styled.input`
  &:focus {
    outline: none;
    border-bottom: 3px solid var(--main-color);
  }
  font-family: "SUIT-Light";
  font-size: 16px;
  text-align: right;
  width: 70%;
  height: 17px;
  padding: 5px;
  border: none;
  margin: 20px;
  margin-top: 30px;
  margin-left: 40px;
  border-bottom: 3px solid #b9b9b960;
`;
interface IProps {
  query: string;
  setQuery: (str: string) => void;
  loginModalHandler: (modalState: number) => void;
  signupModalHandler: (modalState: number) => void;
}

function HambergerSideBar({
  query,
  setQuery,
  loginModalHandler,
  signupModalHandler,
}: IProps) {
  const [follower, setFollower] = useState(0);
  const [follow, setFollow] = useState(0);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();
  const [Hamberger, setHamberger] = useRecoilState(hamberger);
  const [isFollowModalOn, setIsFollowModalOn] = useRecoilState(followModal);
  const [isFollowerModalOn, setIsFollowerModalOn] =
    useRecoilState(followerModal);
  const login = useRecoilValue(isLogin);
  const setIsFollowing = useSetRecoilState(following);
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const accessToken = window.localStorage.getItem("accessToken");
    if (!userId) {
      return;
    }
    axios
      .get(`http://52.79.250.177:8080/user?id=${userId}&cursor=-1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setFollower(res.data.user.follower);
        setFollow(res.data.user.following);
        setUsername(res.data.user.nickname);
        setProfile(res.data.user.profile);
        setUserId(res.data.user.id);
        if (res.data.user.following !== 0) {
          setIsFollowing(true);
        }
      });
  }, [login, setIsFollowing]);

  const handlePost = () => {
    setHamberger(false);
    navigate("/createpost");
  };

  const handleMakeup = () => {
    setHamberger(false);
    navigate("/makeup");
  };
  return (
    <Container>
      <SideBar hamberger={hamberger}>
        <Search
          placeholder="search..."
          type={"text"}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              // Search 함수
              if (query === "") {
                return;
              }
              setHamberger(false);
              navigate(`/search/${query}`, {
                state: query,
              });
              // setIsMiniOpen(false);
            }
          }}
        />

        <Link
          style={
            login
              ? { textAlign: "right" }
              : { display: "none", textAlign: "right" }
          }
          className="link"
          onClick={() => setHamberger(false)}
          to={`/mypage/${userId}`}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10%",
              borderRadius: "50%",
            }}
            className="photo"
            src={profile}
            alt=""
          />
        </Link>
        <div
          style={login ? { display: "none" } : {}}
          onClick={() => {
            setHamberger(false);
            loginModalHandler(0);
          }}
        >
          LOGIN
        </div>
        <div
          style={login ? { display: "none" } : {}}
          onClick={() => {
            setHamberger(false);
            loginModalHandler(0);
            signupModalHandler(0);
          }}
        >
          SIGNUP
        </div>
        <div
          style={login ? {} : { display: "none" }}
          onClick={() => {
            setHamberger(false);
            setIsFollowerModalOn(true);
          }}
        >
          팔로워 {follower}
        </div>
        <div
          style={login ? {} : { display: "none" }}
          onClick={() => {
            setHamberger(false);
            setIsFollowModalOn(true);
          }}
        >
          팔로우 {follow}
        </div>

        <div onClick={handleMakeup}>화장하러 가기</div>

        <div style={login ? {} : { display: "none" }} onClick={handlePost}>
          게시글 작성
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/icon3.ico`}
          alt="뽀"
          style={{
            marginRight: "20px",
            marginLeft: "auto",
            marginBottom: "20%",
            marginTop: "auto",
            width: "30px",
            height: "auto",
          }}
        />
      </SideBar>
    </Container>
  );
}

export default HambergerSideBar;
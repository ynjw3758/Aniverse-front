import { useState, useMemo, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

interface user_info {
  nickname: string;
  id: string;
  img: string;
}

function  useMentionHandler (value:string) {
  const [emoticon, setEmoticon] = useState("");
  const [textmention, setTextmention] = useState("");
  const [mentionsize, setMentionsize] = useState<string[]>([]);
  const [userinfo, setUserinfo] = useState<user_info[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [iskeyboard, setIskeyboard] = useState(true);
  const[mentioninfo,setMentioninfo]=useState<user_info[]>([]);
  const IsSearchCheck = useRef<boolean>(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  console.log("values : ", value)
  const Searchbound = useMemo(() =>
    debounce((values: string) => {
      setTextmention(values);
      const access_token = localStorage.getItem("a_id")!;
      axios.defaults.headers.common['Authorization'] = access_token;

      axios.get("http://localhost:8080/Pets-social/acccheck")
        .then(() => {
          axios.get("http://localhost:8088/Pets-social/Search/Person", { params: { Word: values } })
            .then((response) => {
              if (response.status === 200) {
                setUserinfo(response.data || []);
                setIskeyboard(false);
                setSearchLoading(true);
              }
            }).catch(handleError);
        }).catch(handleError);
    }, 200)
  , [textmention]);

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        const refresh_token = cookies.get("refresh_token");
        const id = localStorage.getItem("id");
        axios.post("http://localhost:8080/Pets-social/token/refresh", { refresh_token, id })
          .then(response => {
            if (response.status === 200) {
              localStorage.setItem("p_exp", response.data.data.exp);
              localStorage.setItem("a_id", response.data.data.access_token);
              navigate("/main");
            }
          }).catch(() => navigate("/error/auth"));
      } else if (status === 500) {
        navigate("/error/se-error");
      } else {
        navigate("/error");
      }
    }
  }

  const commentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lastAt = value.lastIndexOf("@");

    if (value.length - 1 === lastAt && iskeyboard) {
      if (searchLoading) setSearchLoading(false);
      IsSearchCheck.current = true;
    } else if (value.includes("@") && iskeyboard && IsSearchCheck.current) {
      const sliceVal = value.slice(lastAt + 1);
      Searchbound(sliceVal);
    }

    if (value === "") {
      setSearchLoading(false);
      setEmoticon("");
      setMentionsize([]);
      IsSearchCheck.current = false;
    }

    setEmoticon(value);
  };

  const InsertMention = (data: user_info) => {
    setMentioninfo(prev => [...prev, data]);
    const name = `@${data.nickname}`;
    const updatedText = mentionsize.length
      ? mentionsize.map(n => `@${n}`).join('') + name
      : name;

    setEmoticon(updatedText);
    setTextmention("");
    setSearchLoading(false);
    setIskeyboard(false);
    IsSearchCheck.current = false;
    setMentionsize(prev => [...prev, data.nickname]);
  };

  return {
    emoticon,
    commentHandler,
    InsertMention,
    userinfo,
    searchLoading,
    mentionsize,
    mentioninfo
  };
};

export default useMentionHandler;
import Label from "../components/atoms/Label";
import Sticker from "../components/atoms/Sticker";
import Title from "../components/atoms/Title";
import Toast from "../components/atoms/Toast";

function Home() {
  return (
    <>
      <h1>Hello World!</h1>
      <Label labelId="id" labelName="스터디이름" />
      <Toast text="비밀번호가 일치하지 않습니다. 다시 입력해주세요." type="warning"/>
      <Title
        nickName="이유디"
        title="개발 공장"
        isColorBlack={false}
        highlightColor="yellow"
      />
      <Sticker color="green" num={5}/>
    </>
  );
}

export default Home;

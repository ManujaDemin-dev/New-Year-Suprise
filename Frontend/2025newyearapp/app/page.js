import Countdown from "../components/Countdown";
import SnowEffect from "../components/snowEffect";
// import { Title } from "../components/timerhead"; not working :(


export default function Home() {
  return (
    <div>
      {/* <Title/> not working  */}
      <h1>
        Welcome to my website!
      </h1>
      <Countdown />
      <SnowEffect />
    </div>

  );
}

import Countdown from "../components/Countdown";
import SnowEffect from "../components/snowEffect";
// import { Title } from "../components/timerhead"; not working :(


export default function Home() {
  return (
    <div>
      {/* <Title/> not working  */}
      <Countdown />
      <SnowEffect />
    </div>

  );
}

import Countdown from "../components/Countdown";
// import SnowEffect from "../components/snowEffect";    snow effect codepen has been removed bro
// import { Title } from "../components/timerhead"; not working :(


export default function Home() {
  return (
    <div>
      {/* <Title/> not working  */}
      <h1 className="poppins_title">Countdown to New Year</h1>
      <h1 className="poppins_head">
        2025
      </h1>
      <Countdown />
      {/* <SnowEffect /> */}
    </div>

  );
}

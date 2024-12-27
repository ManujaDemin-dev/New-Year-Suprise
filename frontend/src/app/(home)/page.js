import Timer from "../components/Timer";
import CreateWishModal from "../components/CreateWishModal";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <div
        style={{ height: "calc(100vh - 80px)" }}
        className="flex flex-col justify-center items-center"
      >
        <p className="text-6xl text-white">Countdown to New Year</p>

        <p className="text-[220px] font-black tracking-tighter text-white">
          2025
        </p>

        <Timer />

        <CreateWishModal />
      </div>

      <Footer />
    </>
  );
}

import CreateWishModal from "@/app/components/CreateWishModal";
import Footer from "@/app/components/Footer";
import Timer from "@/app/components/Timer";
import config from "@/app/config";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import axios from "axios";

export default async function NewWishPage({ params }) {
  const wish_id = (await params).wish_id;
  let data = null;

  const axios_headers = {
    Accept: "application/json",
  };

  try {
    const response = await axios.get(
      `${config.BASE_API_URL}/wishes/${wish_id}`,
      axios_headers
    );
    data = response.data;
  } catch (error) {
    console.log("Failed to fetch the data. Please try again.");
    console.log("Error: " + error.message);
  }

  if (!data) {
    return (
      <>
        <div
          style={{ height: "calc(100vh - 80px)" }}
          className="flex flex-col justify-center items-center"
        >
          <p className="text-center text-white text-6xl font-semibold tracking-tight">
            Oops! We couldn't find the wish you're looking for. ✨
          </p>
          <p className="text-center text-white text-2xl mt-4">
            It seems like the wish you're trying to view doesn't exist. Please
            check the link or create a new wish.
          </p>

          <Link href="/">
            <Button radius="sm" color="primary" className="mt-10">
              Return back home
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div
        style={{ height: "calc(100vh - 80px)" }}
        className="flex flex-col justify-center items-center"
      >
        <p className="text-center text-white text-4xl break-words container">
          ✨ Hey <span className="font-semibold">{data.name}</span>, may your
          year ahead be as brilliant as the stars, as vibrant as the fireworks,
          and as joyful as every moment shared with loved ones. Here’s to making
          2024 your best year yet! 🎉
        </p>

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

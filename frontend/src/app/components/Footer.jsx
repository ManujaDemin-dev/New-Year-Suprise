import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-[80px]">
      <p className="text-white font-light">
        Carefully cooked by&nbsp;
        <Link
          className="footer-link-white font-medium"
          href="https://github.com/Saikomantisu"
        >
          @Saikomantisu
        </Link>
        &nbsp;and&nbsp;
        <Link
          className="footer-link-white font-medium"
          href="https://github.com/ManujaDemin-dev"
        >
          @Annonixli
        </Link>
      </p>
    </footer>
  );
};

export default Footer;

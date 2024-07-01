// import { Montserrat, Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";

export const noto = localFont({
  src: [
    {
      path: "../fonts/NotoSansJP-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansJP-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansJP-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansJP-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansJP-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansJP-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansJP-Thin.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

export const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

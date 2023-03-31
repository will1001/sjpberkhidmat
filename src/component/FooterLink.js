import { useRouter } from "next/router";
import React from "react";

function FooterLink() {
  const router = useRouter();

  return (
    <>
      <span
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        Pemilu 2024
      </span>

      <span
        className="cursor-pointer"
        onClick={() => {
          router.push("/publikasi/SemuaPublikasi");
        }}
      >
        Publikasi
      </span>

      <span
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        Gallery
      </span>

      <span
        className="cursor-pointer"
        onClick={() => {
          router.push("Aspirasi");
        }}
      >
        Rumah Aspirasi
      </span>

      <span
        className="cursor-pointer"
        onClick={() => {
          router.push({
            pathname: "Daftar",
            query: { type: "relawan" },
          });
        }}
      >
        Daftar Relawan
      </span>

      <span
        className="cursor-pointer"
        onClick={() => {
          router.push({
            pathname: "Daftar",
            query: { type: "simpatisan" },
          });
        }}
      >
        Daftar Simpatisan
      </span>
    </>
  );
}

export default FooterLink;

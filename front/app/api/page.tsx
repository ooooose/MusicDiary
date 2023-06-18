import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Hello, World!!!</h1>
      <Link href="/">
        Homeに戻る
      </Link>
    </>
  );
}
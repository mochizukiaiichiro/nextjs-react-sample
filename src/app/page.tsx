import Home from "@/components/home/home";

export default function Page() {
  return (
    <>
      <Home />
    </>
  )
}

export function generateMetadata() {
  return {
    title: "トップページ",
    description: "トップページ",
  };
}
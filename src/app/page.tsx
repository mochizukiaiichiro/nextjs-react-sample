import TopPage from "@/components/toppage/toppage";

export default function Page() {
  return (
    <>
      <TopPage />
    </>
  )
}

export function generateMetadata() {
  return {
    title: "トップページ",
    description: "トップページ",
  };
}
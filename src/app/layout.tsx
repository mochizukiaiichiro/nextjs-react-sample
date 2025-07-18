
import Header from "@/components/Layout/header";
import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <StyledComponentsRegistry>
        <body>
          <Header />
          {children}
        </body>
      </StyledComponentsRegistry>
    </html>
  )
}
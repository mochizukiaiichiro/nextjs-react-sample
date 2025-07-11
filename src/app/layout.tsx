
import Header from "@/components/organisms/Header";
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
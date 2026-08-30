import TrustBadge from "@/components/TrustBadge";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function MarketingLayout({ children }) {
  return (
    <>
      <TrustBadge />
      <Nav />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}

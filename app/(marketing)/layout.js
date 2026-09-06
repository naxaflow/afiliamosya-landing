import TrustBadge from "@/components/TrustBadge";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import WelcomeOfferModal from "@/components/WelcomeOfferModal";

export default function MarketingLayout({ children }) {
  return (
    <>
      <TrustBadge />
      <Nav />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <WelcomeOfferModal />
    </>
  );
}

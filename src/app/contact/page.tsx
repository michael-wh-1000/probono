import type { Metadata } from "next";
import ContactPage from "@/pageComponents/contact/contactpage";

export const metadata: Metadata = {
  title: "Contact | Probono",
  description: `We’d love to hear from you! Whether you have questions, want to
                collaborate, or need more information about our initiatives,
                feel free to reach out. Connect with us through the channels
                below, and let’s make a difference together.`,
};

export default function Contact() {
  return <ContactPage />;
}

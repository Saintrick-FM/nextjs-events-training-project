import "@/styles/globals.css";

import Layout from "@/components/layout/layout";
import Notification from "@/components/notification/notification";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Notification
        title={"Success notification"}
        message="This a test message"
        status={"success"}
      />
    </Layout>
  );
}

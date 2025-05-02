import commonAssets from "@/assets/commonAssets";
import Header from "@/components/Header";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="p-5">
      <Header />
      <main className="max-w-screen-xl mx-auto pt-5 md:pt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <aside className="relative hidden md:block">
            <div className="sticky top-20">
              <Image src={commonAssets.images.logoBlack} alt="" />

              <div className="pt-10">
                <h1 className="text-3xl font-medium">Privacy Policy</h1>
                <p className="text-lg">
                  Welcome to Space Star. Your privacy is important to us. This
                  Privacy Policy explains how we collect, use, and protect your
                  personal information when you visit our website
                  ([yourwebsite.com]) and make a purchase. By using our website,
                  you agree to the terms outlined in this policy.
                </p>
              </div>
            </div>
          </aside>

          <section className="space-y-20">
            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">Information We Collect</h1>

              <p className="text-lg">
                We collect the following types of data when you interact with
                our website:
              </p>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">1 Personal Information</h1>

              <p className="text-lg">
                When you place an order, register for an account, or subscribe
                to our newsletter, we may collect:
              </p>

              <ul className="list-disc pl-5 text-lg">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Billing & Shipping Address</li>
                <li>
                  Payment Information (processed securely via third-party
                  gateways like Stripe, bkash, SSLCommerz, etc.)
                </li>
              </ul>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                2 Non-Personal Information
              </h1>

              <p className="text-lg">
                We also collect certain data automatically to improve your
                experience, including:
              </p>

              <ul className="list-disc pl-5 text-lg">
                <li>IP Address</li>
                <li>Browser Type & Device Information</li>
                <li>Website Interaction Data (Pages visited, clicks, etc.)</li>
              </ul>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">Privacy Policy</h1>
              <p className="text-lg">
                We use your information for the following purposes:
              </p>
              <ul className="text-lg">
                <li>
                  ✅ Order Processing: To confirm, process, and ship your order.
                </li>
                <li>
                  ✅ Customer Support: To respond to inquiries and resolve
                  issues.
                </li>
                <li>
                  ✅ Marketing & Promotions: To send exclusive offers, updates,
                  and discounts (only if you opt-in).
                </li>
                <li>
                  ✅ Website Optimization: To analyze traffic and improve user
                  experience.
                </li>
                <li>
                  ✅ Fraud Prevention & Security: To protect against
                  unauthorized transactions.
                </li>
              </ul>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                Data Protection & Security
              </h1>
              <p className="text-lg">
                We take strong security measures to protect your data:
              </p>
              <ul className="list-disc pl-5 text-lg">
                <li>
                  SSL Encryption: All transactions are encrypted for maximum
                  security.
                </li>
                <li>
                  Secure Payment Processing: We do not store your card details;
                  payments are handled by trusted third-party gateways.
                </li>
                <li>
                  Restricted Access: Only authorized personnel can access
                  personal data.
                </li>
              </ul>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                Cookies & Tracking Technologies
              </h1>
              <p className="text-lg">
                We use cookies to enhance your browsing experience. Cookies help
                us:
              </p>
              <ul className="text-lg">
                <li>🍪 Remember your preferences and settings</li>
                <li>🍪 Analyze site traffic for better performance</li>
                <li>🍪 Deliver personalized content and offers</li>
              </ul>
              <p className="text-lg">
                You can disable cookies in your browser settings, but some
                features of our website may not function properly without them.
              </p>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">Sharing Your Information</h1>
              <p className="text-lg">
                We do not sell or rent your personal information. However, we
                may share data with:
              </p>
              <ul className="list-disc pl-5 text-lg">
                <li>
                  Payment Processors (Stripe, SSLCommerz, etc.) for secure
                  transactions.
                </li>
                <li>
                  Shipping & Courier Services (Pathao, Steedfast, Sundarban,
                  etc.) to deliver your orders.
                </li>
                <li>Legal Authorities if required by law.</li>
              </ul>
              <p className="text-lg">
                All third-party service providers are required to keep your data
                confidential.
              </p>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">Your Rights & Choices</h1>
              <p className="text-lg">
                You have full control over your personal information. You can:
              </p>
              <ul className="text-lg">
                <li>
                  ✅ Access & Edit Your Data – Update your details from your
                  account settings.
                </li>
                <li>
                  ✅ Request Data Deletion – Contact us if you wish to delete
                  your account.
                </li>
                <li>
                  ✅ Opt-Out of Marketing Emails – Unsubscribe anytime via the
                  email footer.
                </li>
              </ul>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">Changes to This Policy</h1>
              <p className="text-lg">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with the updated date. If there are
                significant changes, we will notify you via email.
              </p>
            </article>

            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">Contact Us</h1>
              <p className="text-lg">
                For any privacy-related inquiries, feel free to contact us:
              </p>
              <ul className="list-disc pl-5 text-lg">
                <li>📧 Email: support@[yourbrand].com</li>
                <li>📍 Address: [Your Business Address]</li>
                <li>📞 Phone: [Your Contact Number]</li>
              </ul>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}

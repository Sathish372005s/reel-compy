"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ContactForm from "../components/Contactform";
import ThemedRoutePage from "../components/sections/ThemedRoutePage";
import BookingPayment from "../components/BookingPayment";

function ContactContent() {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package") || "Smart Shot";
  const price = searchParams.get("price") || "1499";

  return (
    <>
      <div className="w-full">
        <BookingPayment packageName={packageName} totalPrice={price} />
      </div>
      <div>
        <ContactForm />
      </div>
    </>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-16">
      <ThemedRoutePage
        eyebrow="Contact"
        title="Book your next"
        accent="shoot"
        description="Tell us what you need filmed, where you need us, and when the content should go live. We will shape the fastest route from shoot to publish."
      />
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
        </div>
      }>
        <ContactContent />
      </Suspense>
    </main>
  );
}



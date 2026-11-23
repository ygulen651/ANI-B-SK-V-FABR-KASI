"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";

const TOPICS: Record<string, string> = {
  genel: "Genel bilgi",
  urun: "Ürün bilgisi",
  ihracat: "İhracat / iş ortaklığı",
  kalite: "Kalite ve belgeler",
  kariyer: "Kariyer",
};

type Errors = Partial<Record<"name" | "email" | "message" | "kvkk", string>>;

/**
 * Bu sitede sunucu tarafı form gönderim altyapısı yoktur.
 * Form; alanları doğrular ve mesajı kullanıcının e-posta uygulamasında hazır hale getirir.
 * Mesajın gönderildiği iddia edilmez.
 */
export function ContactForm({ email }: { email: string }) {
  const params = useSearchParams();
  const id = useId();
  const initialTopic = params.get("konu") && TOPICS[params.get("konu")!] ? params.get("konu")! : "genel";
  const initialProduct = params.get("urun") ?? "";
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const mail = String(f.get("email") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const company = String(f.get("company") ?? "").trim();
    const topic = String(f.get("topic") ?? "genel");
    const message = String(f.get("message") ?? "").trim();
    const kvkk = f.get("kvkk") === "on";
    const errs: Errors = {};
    if (name.length < 2) errs.name = "Lütfen adınızı ve soyadınızı yazın.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) errs.email = "Geçerli bir e-posta adresi yazın (ör. ad@ornek.com).";
    if (message.length < 10) errs.message = "Mesajınız en az 10 karakter olmalı.";
    if (!kvkk) errs.kvkk = "Devam etmek için bilgilendirmeyi onaylayın.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      setReady(null);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const subject = `[${TOPICS[topic]}] ${name}${company ? ` – ${company}` : ""}`;
    const body = [message, "", "—", `Ad Soyad: ${name}`, `E-posta: ${mail}`, phone && `Telefon: ${phone}`, company && `Firma: ${company}`]
      .filter(Boolean)
      .join("\n");
    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(href);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  const field =
    "mt-2 block w-full rounded-2xl border-0 bg-cream-50 px-4 py-3.5 text-base font-semibold text-choco-900 shadow-[inset_0_0_0_2px_rgba(43,22,10,.14)] placeholder:text-choco-500 focus:shadow-[inset_0_0_0_2.5px_var(--ani-red)] focus:outline-none aria-[invalid=true]:shadow-[inset_0_0_0_2.5px_var(--ani-red-700)]";
  const errCount = Object.keys(errors).length;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby={`${id}-note`}>
      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {errCount > 0 && (
          <div role="alert" className="rounded-2xl bg-red-700 px-5 py-4 font-bold text-white">
            Formda {errCount} alan düzeltilmeli.
          </div>
        )}
        {ready && (
          <div role="status" className="rounded-2xl bg-[var(--c-gofret)] px-5 py-5 text-choco-900">
            <p className="font-display text-xl font-extrabold">Mesajınız hazır — henüz gönderilmedi.</p>
            <p className="mt-1 font-semibold">
              Bu sitede çevrimiçi gönderim altyapısı bulunmuyor. Aşağıdaki düğme, mesajınızı e-posta uygulamanızda {email} adresine hazır olarak açar;
              göndermek için e-posta uygulamanızdan onaylamanız gerekir.
            </p>
            <a href={ready} className="btn btn-dark mt-4">
              E-posta uygulamasında aç
            </a>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="font-bold">
            Ad Soyad <span aria-hidden className="text-red-700">*</span>
          </label>
          <input id={`${id}-name`} name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} className={field} />
          {errors.name && <p id={`${id}-name-err`} className="mt-1.5 text-sm font-bold text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="font-bold">
            E-posta <span aria-hidden className="text-red-700">*</span>
          </label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined} className={field} />
          {errors.email && <p id={`${id}-email-err`} className="mt-1.5 text-sm font-bold text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="font-bold">Telefon <span className="font-semibold text-choco-700">(isteğe bağlı)</span></label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-company`} className="font-bold">Firma <span className="font-semibold text-choco-700">(isteğe bağlı)</span></label>
          <input id={`${id}-company`} name="company" autoComplete="organization" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-topic`} className="font-bold">Konu</label>
        <select id={`${id}-topic`} name="topic" defaultValue={initialTopic} className={field}>
          {Object.entries(TOPICS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="font-bold">
          Mesajınız <span aria-hidden className="text-red-700">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          defaultValue={initialProduct ? `${initialProduct} hakkında bilgi almak istiyorum.` : ""}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          className={field}
        />
        {errors.message && <p id={`${id}-message-err`} className="mt-1.5 text-sm font-bold text-red-700">{errors.message}</p>}
      </div>
      <div>
        <label className="flex items-start gap-3 font-semibold">
          <input type="checkbox" name="kvkk" aria-invalid={!!errors.kvkk} aria-describedby={errors.kvkk ? `${id}-kvkk-err` : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[var(--ani-red)]" />
          <span>Yazdığım bilgilerin, talebime yanıt verilmesi amacıyla e-posta yoluyla Anı Bisküvi&apos;ye iletileceğini biliyorum.</span>
        </label>
        {errors.kvkk && <p id={`${id}-kvkk-err`} className="mt-1.5 text-sm font-bold text-red-700">{errors.kvkk}</p>}
      </div>
      <p id={`${id}-note`} className="text-sm text-choco-700">
        * zorunlu alanlar. Form, mesajınızı e-posta uygulamanızda hazırlar; doğrudan gönderim yapmaz.
      </p>
      <button type="submit" className="btn btn-primary">
        Mesajı hazırla
      </button>
    </form>
  );
}

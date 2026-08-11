"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { rsvpSchema, type RSVPFormValues } from "@/lib/rsvp-schema"

type FormStatus = "idle" | "loading" | "success" | "error"

function isApiError(val: unknown): val is { error: string } {
  return (
    typeof val === "object" &&
    val !== null &&
    "error" in val &&
    typeof (val as { error: unknown }).error === "string"
  )
}

const inputClass =
  "w-full rounded-[11px] border-0 bg-ivory px-4 py-3 font-sans text-sm text-ink placeholder:text-taupe/60 focus:outline-none min-h-[44px]"

const labelClass = "block font-sans text-xs text-taupe tracking-widest uppercase mb-2"

const fieldWrapClass =
  "p-px rounded-xl bg-gold-shimmer focus-within:ring-2 focus-within:ring-rose focus-within:ring-offset-2 focus-within:ring-offset-ivory"

export function RSVPForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestCount: 1, _honeypot: "" },
  })

  const attending = watch("attending")

  async function onSubmit(data: RSVPFormValues) {
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus("success")
        return
      }

      const payload: unknown = await res.json().catch(() => null)
      let msg = "Something went wrong. Please try again."

      if (res.status === 429) {
        msg = "You've already submitted a few times today. Please wait before trying again."
      } else if (res.status === 500) {
        msg = "Something went wrong on our end. Please try again in a moment."
      } else if (res.status === 400 && isApiError(payload)) {
        msg = payload.error
      }

      setErrorMsg(msg)
      setStatus("error")
    } catch {
      setErrorMsg(
        "We couldn't send your RSVP. Please check your connection and try again."
      )
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-center py-12 px-4"
      >
        <p className="font-serif text-2xl md:text-3xl text-ink mb-3">
          Your RSVP has been received.
        </p>
        <p className="font-serif text-base text-taupe italic">
          We look forward to celebrating with you.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 max-w-lg mx-auto"
    >
      {/* Honeypot — off-screen, aria-hidden, tabIndex -1 keeps it out of tab order */}
      <input
        type="text"
        {...register("_honeypot")}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] opacity-0 pointer-events-none"
      />

      {/* Name */}
      <div>
        <label htmlFor="rsvp-name" className={labelClass}>Full name</label>
        <div className={cn(fieldWrapClass, errors.name && "bg-rose/60")}>
          <input
            id="rsvp-name"
            type="text"
            autoComplete="name"
            aria-describedby={errors.name ? "rsvp-name-error" : undefined}
            aria-invalid={!!errors.name}
            {...register("name")}
            className={inputClass}
            placeholder="Your full name"
          />
        </div>
        {errors.name && (
          <p id="rsvp-name-error" role="alert" className="mt-1 font-sans text-xs text-rose">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="rsvp-email" className={labelClass}>Email address</label>
        <div className={cn(fieldWrapClass, errors.email && "bg-rose/60")}>
          <input
            id="rsvp-email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? "rsvp-email-error" : undefined}
            aria-invalid={!!errors.email}
            {...register("email")}
            className={inputClass}
            placeholder="your@email.com"
          />
        </div>
        {errors.email && (
          <p id="rsvp-email-error" role="alert" className="mt-1 font-sans text-xs text-rose">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Attending toggle */}
      <div>
        <p className={labelClass} id="rsvp-attending-label">Will you be attending?</p>
        <div
          role="group"
          aria-labelledby="rsvp-attending-label"
          aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
          className="flex gap-3"
        >
          {(["yes", "no"] as const).map((opt) => {
            const selected =
              opt === "yes" ? attending === true : attending === false
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={selected}
                onClick={() => setValue("attending", opt === "yes", { shouldValidate: true })}
                className={cn(
                  "flex-1 min-h-[44px] rounded-full border font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
                  selected
                    ? "border-rose bg-rose text-ivory"
                    : "border-hairline bg-ivory text-taupe hover:border-rose hover:text-rose"
                )}
              >
                {selected && (
                  <Check size={14} aria-hidden="true" className="shrink-0" />
                )}
                {opt === "yes" ? "Joyfully accepts" : "Regretfully declines"}
              </button>
            )
          })}
        </div>
        {errors.attending && (
          <p id="rsvp-attending-error" role="alert" className="mt-1 font-sans text-xs text-rose">
            Please let us know if you can attend
          </p>
        )}
      </div>

      {/* Guest count — only shown when attending */}
      {attending === true && (
        <div>
          <label htmlFor="rsvp-guest-count" className={labelClass}>
            Number of guests (including yourself)
          </label>
          <div className={fieldWrapClass}>
            <select
              id="rsvp-guest-count"
              {...register("guestCount", { valueAsNumber: true })}
              className={cn(inputClass, "cursor-pointer")}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Dietary notes */}
      <div>
        <label htmlFor="rsvp-dietary" className={labelClass}>
          Dietary requirements <span className="normal-case tracking-normal text-taupe">(optional)</span>
        </label>
        <div className={fieldWrapClass}>
          <textarea
            id="rsvp-dietary"
            rows={2}
            {...register("dietaryNotes")}
            className={cn(inputClass, "resize-none")}
            placeholder="Any allergies or dietary needs"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="rsvp-message" className={labelClass}>
          Message <span className="normal-case tracking-normal text-taupe">(optional)</span>
        </label>
        <div className={fieldWrapClass}>
          <textarea
            id="rsvp-message"
            rows={3}
            {...register("message")}
            className={cn(inputClass, "resize-none")}
            placeholder="A note for the couple"
          />
        </div>
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div role="alert" aria-live="polite" className="rounded-xl border border-rose/30 bg-rose/5 px-4 py-3">
          <p className="font-sans text-sm text-rose">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full min-h-[44px] rounded-full bg-rose px-8 py-3 font-sans text-sm text-ivory transition-colors duration-200 hover:bg-rose-dark disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
      >
        {status === "loading" ? (
          "Sending…"
        ) : (
          <span className="inline-flex items-center gap-2">
            Send RSVP
            <Send size={15} aria-hidden="true" />
          </span>
        )}
      </button>
    </form>
  )
}

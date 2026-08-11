import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

/* -------------------------------------------------------------------------
 * PAGES — each markdown file in src/content/pages composes a page out of
 * component blocks via its `pageSections` frontmatter. See README for the
 * full section catalog.
 * ------------------------------------------------------------------------- */
const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pageSections: z.array(z.any()),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: pageSchema,
});

/* -------------------------------------------------------------------------
 * Shared helper — hex color validator used across client + theme-presets.
 * ------------------------------------------------------------------------- */
const hexColor = z
  .string()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Must be a hex color like #1a3a5c");

/* -------------------------------------------------------------------------
 * CLIENT — single source of truth for everything practice-specific.
 * Edit src/content/client/client.yml when spinning up a new site.
 * Invalid or missing fields fail the build with a clear error.
 * ------------------------------------------------------------------------- */

/** Derive a tel: link from a display phone number ("(847) 455-8383" -> "tel:+18474558383"). */
function toTelLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`;
}

const clientSchema = z
  .object({
    /* --- Practice identity --- */
    practiceName: z.string().min(1),
    phone: z.string().min(7, "Display phone number, e.g. (555) 555-5555"),
    /** Optional override; derived from `phone` when omitted. */
    phoneLink: z.string().startsWith("tel:").optional(),
    address: z.string(),
    bookingLink: z.string().min(1, "Online scheduling URL, or '#contact' to scroll to a form"),
    mapLink: z.string().optional().default(""),
    mapEmbedUrl: z.string().optional(),
    hours: z.array(z.object({ day: z.string(), hours: z.string() })).default([]),

    /* --- Logos --- */
    logo: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    footerLogo: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),

    /* --- Header --- */
    header: z
      .object({
        announcementBar: z.array(z.string()).default([]),
        bookBtnText: z.string().default("Schedule Online"),
      })
      .default({}),

    /* --- Theme (CSS variables injected site-wide) ---
     * Writers pick a preset in CloudCannon which fills in these values;
     * they can then tweak any individual color independently. */
    theme: z
      .object({
        brand: hexColor.optional(),
        brandText: hexColor.optional(),
        accent: hexColor.optional(),
        accentText: hexColor.optional(),

        announcementBg: hexColor.optional(),
        announcementText: hexColor.optional(),
        heroBg: hexColor.optional(),
        heroText: hexColor.optional(),

        brandMuted: hexColor.optional(),
        brandSubtle: hexColor.optional(),
        dark: hexColor.optional(),
        link: hexColor.optional(),
        linkHover: hexColor.optional(),
        bg: hexColor.optional(),
        bgSurface: hexColor.optional(),
        bgMuted: hexColor.optional(),
        bgAccent: hexColor.optional(),
        bgHighlight: hexColor.optional(),
        text: hexColor.optional(),
        textStrong: hexColor.optional(),
        textMuted: hexColor.optional(),
        textInverse: hexColor.optional(),
        border: hexColor.optional(),
        borderInputs: hexColor.optional(),
        borderStrong: hexColor.optional(),
        borderSubtle: hexColor.optional(),

        /* ---- Component-specific overrides ---- */
        bookBtnBg: hexColor.optional(),
        bookBtnText: hexColor.optional(),
        phoneColor: hexColor.optional(),
      })
      .default({}),

    /* --- Typography ---
     * Fonts come from the curated list, or "Custom" + Google Fonts name.
     * Presets pair heading + body fonts sensibly. */
    typography: z
      .object({
        headingsFont: z.string().default("Poppins"),
        headingsFontCustom: z.string().nullable().optional(),
        bodyFont: z.string().default("Poppins"),
        bodyFontCustom: z.string().nullable().optional(),
        baseSize: z.enum(["sm", "md", "lg"]).default("md"),
        headingScale: z.enum(["compact", "balanced", "dramatic"]).default("balanced"),
      })
      .default({}),

    /* --- Footer --- */
    footer: z
      .object({
        layout: z
          .enum(["logo-info-map", "logo-map-info", "info-logo-map", "stacked"])
          .default("logo-info-map"),
        showMap: z.boolean().default(true),
        bgColor: hexColor.optional(),
        accentColor: hexColor.optional(),
        phoneColor: hexColor.optional(),
        disclaimer: z.string().default(""),
      })
      .default({}),

    /* --- Calls to action --- */
    cta: z
      .object({
        /** Mobile-only fixed bottom bar with Call + Book buttons. */
        stickyBar: z
          .object({
            enabled: z.boolean().default(true),
            callText: z.string().default("Call Now"),
            bookText: z.string().default("Book Online"),
            mapText: z.string().optional(),
          })
          .default({}),
      })
      .default({}),

    /* --- Tracking (all optional — anything left blank/null is simply not loaded) --- */
    tracking: z
      .object({
        /** GA4 Measurement ID, e.g. "G-XXXXXXXXXX" */
        ga4MeasurementId: z.string().nullable().optional(),
        /** Simplifi advertiser GUID, e.g. "d0839950-0d38-0137-dfb5-06a9ed4ca31b" */
        simplifiId: z.string().nullable().optional(),
        /** CallTrackingMetrics account ID, e.g. "256838" */
        ctmAccountId: z.string().nullable().optional(),
        /** Fire click events on tel: links and booking buttons (needs GA4). */
        trackConversions: z.boolean().default(true),
      })
      .default({}),
  })
  .transform((client) => ({
    ...client,
    phoneLink: client.phoneLink ?? toTelLink(client.phone),
  }));

const clientCollection = defineCollection({
  loader: glob({
    pattern: ["**/*.{yml,yaml}", "!**/*.cloudcannon.*"],
    base: "./src/content/client",
  }),
  schema: clientSchema,
});

export const collections = {
  pages: pagesCollection,
  client: clientCollection,
};

export type ClientConfig = z.output<typeof clientSchema>;
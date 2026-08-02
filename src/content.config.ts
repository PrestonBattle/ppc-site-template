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
 * THEME PRESETS — curated color palettes. Writers pick one in client.yml
 * as `theme.preset`; PPCLayout.astro loads it as the base, and explicit
 * theme.* fields in client.yml override the preset per-field.
 *
 * To add a new preset, drop a YAML file in src/content/theme-presets/ and
 * add its slug to the `theme.preset` enum below.
 * ------------------------------------------------------------------------- */
const themePresetSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
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
    text: hexColor.optional(),
    textStrong: hexColor.optional(),
    textMuted: hexColor.optional(),
    border: hexColor.optional(),
  })
  .passthrough();

const themePresetsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{yml,yaml}", base: "./src/content/theme-presets" }),
  schema: themePresetSchema,
});

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

    /* --- Theme (CSS variables injected site-wide) --- */
    theme: z
      .object({
        /* ---- Preset ----
         * Names must match a filename in src/content/theme-presets/
         * (without the .yml extension), or the literal "custom" which
         * skips preset loading entirely. */
        preset: z
          .enum(["dental-blue", "dental-teal", "warm-earthy", "bold-red", "classic-navy", "custom"])
          .default("dental-blue"),

        /* ---- Overrides — all optional. Any field set here wins over the
         * preset's value for that field. When preset is "custom", these
         * are the only source of truth. ---- */
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

        /* ---- Component-specific (kept for backward compat) ---- */
        bookBtnBg: hexColor.optional(),
        bookBtnText: hexColor.optional(),
        phoneColor: hexColor.optional(),
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

    /* --- Tracking (all optional — anything left blank is simply not loaded) --- */
    tracking: z
      .object({
        /** GA4 Measurement ID, e.g. "G-XXXXXXXXXX" */
        ga4MeasurementId: z.string().optional(),
        /** Google Tag Manager container, e.g. "GTM-XXXXXXX" */
        gtmContainerId: z.string().optional(),
        /** Google Ads conversion ID, e.g. "AW-XXXXXXXXX" (loaded via gtag) */
        googleAdsId: z.string().optional(),
        /** Meta (Facebook) Pixel ID */
        metaPixelId: z.string().optional(),
        /** CallRail (or other call-tracking) script src URL */
        callTrackingSrc: z.string().optional(),
        /** Microsoft Clarity project ID */
        clarityId: z.string().optional(),
        /** Fire click events on tel: links and booking buttons (needs GA4/gtag). */
        trackConversions: z.boolean().default(true),
      })
      .default({}),
  })
  .transform((client) => ({
    ...client,
    phoneLink: client.phoneLink ?? toTelLink(client.phone),
  }));

const clientCollection = defineCollection({
  loader: glob({ pattern: "**/*.{yml,yaml}", base: "./src/content/client" }),
  schema: clientSchema,
});

export const collections = {
  pages: pagesCollection,
  client: clientCollection,
  themePresets: themePresetsCollection,
};

export type ClientConfig = z.output<typeof clientSchema>;
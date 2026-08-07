declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    NEXT_PUBLIC_SANITY_DATASET: string
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
    RESEND_API_KEY: string
    NEXT_PUBLIC_SITE_URL: string
  }
}

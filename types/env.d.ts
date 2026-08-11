declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    NEXT_PUBLIC_SANITY_DATASET: string
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SITE_URL: string
    SUPABASE_SERVICE_ROLE_KEY: string
    RESEND_API_KEY: string
  }
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sdpsybr8c3ukjwlahah9sq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkcHN5YnI4YzN1a2p3bGFoYWg5c3EiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMzg1Mjc3MiwiZXhwIjoyMDQ5NDI4NzcyfQ.szBP6vPe'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
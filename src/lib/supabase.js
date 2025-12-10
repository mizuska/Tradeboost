import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hngiuzuytvpfgrqkaplr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZ2l1enV5dHZwZmdycWthcGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODU0MjAsImV4cCI6MjA4MDk2MTQyMH0.NBeI41FSgImHpSAkOGiBMSuHsYKCq8AfxJvVCnN3Xys'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
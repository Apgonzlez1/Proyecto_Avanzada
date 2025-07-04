import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qwseojwizmzmsyczmrti.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2Vvandpem16bXN5Y3ptcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTc1NjQsImV4cCI6MjA2NzIzMzU2NH0.FaAP2p0bdfzdSOJ1g5UgyAFHA8NAn8Dw6C3T8J23uxA';

export const supabase = createClient(supabaseUrl, supabaseKey);

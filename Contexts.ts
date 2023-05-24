import React from 'react'
import { PagePostProps } from './pages/PagePost';
import { SupabaseClient } from '@supabase/supabase-js';

const UserContext = React.createContext<string>("");
const DatabaseContext = React.createContext<SupabaseClient<any, "public", any> | null>(null)

export {
    UserContext,
    DatabaseContext
}
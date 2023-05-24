import React from 'react'
import { PagePostProps } from './pages/PagePost';
import { SupabaseClient } from '@supabase/supabase-js';

const UserContext = React.createContext<{
    user: string,
    setUser: (val: string) => void
}>({
    user: '',
    setUser: (val) => {}
});

export {
    UserContext,
}
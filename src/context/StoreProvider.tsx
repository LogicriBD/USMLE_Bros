'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { appStore } from './store/redux-store';
import { EnhancedStore } from '@reduxjs/toolkit';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
})
{
  const storeRef = useRef<EnhancedStore>()
  if (!storeRef.current)
  {
    storeRef.current = appStore
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
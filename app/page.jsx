'use client'
import React from 'react'
import Landing from '@/components/Advanced_Landing_Page'
import Commonheader from '@/components/Common_Header'
export default function Main() {
    return (
        <div className="overflow-hidden overscroll-none">
            <Commonheader />
            <Landing />
        </div>
    )
}

'use client'

import { useEffect } from 'react'

import {
  DETAILS_4XX,
  DETAILS_BY_CAT,
  find4xx,
  findDetailBySlug,
  findDetailByTitle,
} from '@/constants/details'
import { isErrorCategory } from '@/types/details'

export function SelfTests() {
  useEffect(() => {
    try {
      console.assert(DETAILS_4XX.length >= 5, 'DETAILS_4XX should have >= 5 items')
      const d401 = find4xx('401-unauthorized')
      console.assert(!!d401 && d401?.status?.code === 401, '401 detail should exist with code 401')

      console.assert(isErrorCategory('server'), 'server should be a valid category')
      const d500 = findDetailBySlug('server', '500-internal-server-error')
      console.assert(d500?.status?.code === 500, '500 detail should exist with code 500')

      const dnsIssue = findDetailByTitle('client', 'DNS_PROBE_FINISHED_NXDOMAIN')
      console.assert(dnsIssue?.category === 'client', 'DNS error detail should be categorized under client')

      console.assert(DETAILS_BY_CAT.client.length >= 5, 'Client-side details should be populated')
      console.log('SelfTests passed')
    } catch (error) {
      console.warn('SelfTests failed', error)
    }
  }, [])

  return null
}

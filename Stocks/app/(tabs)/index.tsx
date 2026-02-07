/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - HOME TAB
 * Entry point that redirects to module entry
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Redirect } from 'expo-router';

export default function HomeTab() {
  // Redirect to module entry screen
  return <Redirect href="/module-entry" />;
}

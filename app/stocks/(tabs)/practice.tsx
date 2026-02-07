/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - PRACTICE TAB
 * Quick access to the stock simulator
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Redirect } from 'expo-router';

export default function PracticeTab() {
  // Redirect to simulator
  return <Redirect href="/stocks/simulator" />;
}

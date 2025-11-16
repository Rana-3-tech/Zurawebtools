/**
 * IndexNow Protocol Implementation
 * Automatically notifies search engines when pages are updated
 * Ultra Safe: Error handling, rate limiting, non-blocking
 */

const API_KEY = '6629aa3ca19241e481530aab5f1c13a9';
const SITE_URL = 'https://zurawebtools.com';

// Rate limiting: Only allow one notification per URL per session
const notifiedUrls = new Set<string>();

/**
 * Notify search engines about page updates via IndexNow protocol
 * @param urlPath - Relative path like "/tools/case-converter"
 */
export const notifyIndexNow = async (urlPath: string): Promise<void> => {
  // Don't run in development (check if running on localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('[IndexNow] Skipped in development mode');
    return;
  }

  const fullUrl = `${SITE_URL}${urlPath}`;

  // Rate limiting: Don't notify same URL twice in one session
  if (notifiedUrls.has(fullUrl)) {
    console.log('[IndexNow] Already notified:', fullUrl);
    return;
  }

  try {
    // Non-blocking: Don't await, let it run in background
    fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: 'zurawebtools.com',
        key: API_KEY,
        keyLocation: `${SITE_URL}/${API_KEY}.txt`,
        urlList: [fullUrl],
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Successfully notified search engines
          notifiedUrls.add(fullUrl);
        }
        // Silently handle non-OK responses in production
      })
      .catch(() => {
        // Silently fail - don't break user experience
        // Error handling can be added here for monitoring tools
      });
  } catch (error) {
    // Catch any unexpected errors silently
    // Error tracking can be added here for production monitoring
  }
};

addEventListener('fetch', function(event) {
  const { request } = event
  const response = handleRequest(request).catch(handleError)
  event.respondWith(response)
})

const IMAGE_URL_REGEX = /\.(jpg|png|gif|webp|jpeg|tiff|tif)$/i
const WEBP_ACCEPT_REGEX = /image\/webp/i
const MOBILE_USER_AGENT_REGEX = /(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera\ mini|avantgo|mobilesafari|docomo|KAIOS)/i

/**
 * Receives a HTTP request and replies with a response.
 * If the request is an image, send the request to Imagizer.
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const { url } = request
  const { pathname } = new URL(url)

  // Prevent any CDN loop from incoming Imagizer requests
  if (/imagizer/i.test(request.headers.get("User-Agent"))) {
    console.log("Ignore imagizer fetch");
    return fetch(request)
  }

  // Ignore any URL that does not look to be an image
  // Send the request as normal to the requested backend
  if (!IMAGE_URL_REGEX.test(pathname)) {
    console.log("URL not an image. passing");
    return fetch(request)
  }

  // Start a new URL
  const imageUrl = new URL(url)

  // Device detection
  // modify the cache key to allow for auto formatting
  // specific to device type
  const is_webp = WEBP_ACCEPT_REGEX.test(request.headers.get("Accept"));
  const is_mobile = MOBILE_USER_AGENT_REGEX.test(request.headers.get("User-Agent"));
  if (is_webp) {
    imageUrl.searchParams.append("webp", "true")
    console.log("WEBP Client detected")
  }
  if (is_mobile) {
    imageUrl.searchParams.append("mobile", "true")
    console.log("Mobile Client detected")
  }

  // Create a new request using the Imagizer Hostname
  imageUrl.hostname = IMAGIZER_ENDPOINT
  const imageRequest = new Request(
      imageUrl.toString(),
      new Request(request)
  );

  return fetch(imageRequest);
}

/**
 * Responds with an uncaught error.
 *
 * @param {Error} error
 * @returns {Response}
 */
function handleError(error) {
  console.error('Uncaught error:', error)

  const { stack } = error
  return new Response(stack || error, {
    status: 500,
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}
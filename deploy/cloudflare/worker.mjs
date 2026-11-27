const origin = 'https://aprincar.github.io';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    if (url.pathname === '/' || url.pathname === '/platform') {
      url.pathname = '/platform/';
      return Response.redirect(url.toString(), 302);
    }
    if (!url.pathname.startsWith('/platform/')) {
      return new Response('Not found', { status: 404 });
    }
    const upstream = new URL(origin);
    upstream.pathname = url.pathname;
    upstream.search = url.search;
    const headers = new Headers();
    for (const name of ['accept', 'accept-language', 'if-none-match', 'if-modified-since', 'range', 'if-range']) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }
    try {
      const response = await fetch(upstream, { method: request.method, headers, redirect: 'manual' });
      const outgoing = new Headers(response.headers);
      outgoing.delete('set-cookie');
      outgoing.set('X-Aprincar-Hosting', 'github-pages-origin');
      outgoing.set('Referrer-Policy', 'no-referrer');
      const location = outgoing.get('Location');
      if (location) {
        const target = new URL(location, upstream);
        if (target.origin === origin && target.pathname.startsWith('/platform/')) {
          target.protocol = url.protocol;
          target.host = url.host;
          outgoing.set('Location', target.toString());
        }
      }
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers: outgoing });
    } catch {
      return new Response('Aprincar temporariamente indisponível.', {
        status: 502,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }
  },
};

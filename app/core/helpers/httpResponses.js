import 'source-map-support/register';

export function html(res, content, charset = 'utf-8') {
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.setHeader('Content-Type', `text/html; charset=${charset}`);
  res.end(content);
}

export function error(err, req, res, next) {
  const message = 'Page not available';
  let body = '';

  if(err.stack && process.env.NODE_ENV === 'development') {
    body = `<pre>${err.stack}</pre>`;
  }

  if(err.message === 'Forbidden' || err.code === 'EBADCSRFTOKEN') {
    res.status(403);
  }
  else {
    res.status(500);
  }

  res.end(`
    <html>
      <head>
        <title>${message}</title>
      </head>
      <body id="errorPage">
        <h1>${message}</h1>
        ${body}
      </body>
    </html>
  `);
}

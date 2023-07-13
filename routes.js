const fs = require("fs");

const requestHandler = (res, req) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Send Message</title></head>");
    res.write(
      `<body><form action="/message" method="POST"><input name="message" type="text"> <button type="submit"></button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Node App</title></head>");
  res.write("<body>Hello world</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

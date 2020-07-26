import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";

const resource = {
  username: "@saruni",
};

const DOMAIN_A = express();

// Enable parsing of cookies on the request object.
DOMAIN_A.use(cookieParser());

// Serves contents of `public` directory (HTML, JavaScript)
// to `localhost:PORT/web-app`.
DOMAIN_A.use("/web-app", express.static("public"));

DOMAIN_A.get("/resource", (_, response) => {
  response
    .header("Access-Control-Allow-Origin", "*")
    .status(200)
    .send({ resource });
});

DOMAIN_A.get("/protected_resource", (request, response) => {
  response.set("Access-Control-Allow-Origin", "http://localhost:3000");
  response.set("Access-Control-Allow-Credentials", "true");

  if (!request.cookies["auth-cookie-name"]) {
    return response.sendStatus(401);
  }

  response.json({ secret: "saruni-secret" }).sendStatus(200);
});

DOMAIN_A.options("/resource", (_, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  response.sendStatus(200);
});

DOMAIN_A.post("/auth", (_, response) => {
  response.set("Access-Control-Allow-Origin", "http://localhost:3000");
  response.set("Access-Control-Allow-Credentials", "true");

  response
    .cookie("auth-cookie-name", "auth-cookie-value", { httpOnly: true })
    .sendStatus(204);
});

DOMAIN_A.post("/resource", bodyParser.json(), (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  resource.username = request.body.username;
  response.status(200);
  response.send({ resource });
});

DOMAIN_A.listen(4000, () => {
  console.log("DOMAIN_A is available on port 4000...");
});

const DOMAIN_B = express();

DOMAIN_B.use("/web-app", express.static("public"));

DOMAIN_B.listen(3000, async () => {
  console.log("DOMAIN_B is available on port 3000...");
});

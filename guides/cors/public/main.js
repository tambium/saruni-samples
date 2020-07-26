const get = async () => {
  const result = await fetch("http://localhost:4000/resource");
  console.log(await result.json());
};

const post = async () => {
  const result = await fetch("http://localhost:4000/resource", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "@saruni-next" }),
  });
  console.log(await result.json());
};

const protectedGet = async () => {
  try {
    const result = await fetch("http://localhost:4000/protected_resource", {
      method: "GET",
      credentials: "include",
    });

    console.log(await result.json());
  } catch {}
};

const setAuth = async () => {
  try {
    const result = await fetch("http://localhost:4000/auth", {
      method: "POST",
      credentials: "include",
    });

    console.log(await result.json());
  } catch {}
};

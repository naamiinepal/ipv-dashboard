type AccessToken = string | null;

const loggedInOrNot = (provided_token: AccessToken = null) => {
  let accessToken: AccessToken;
  if (provided_token) accessToken = provided_token;
  else {
    accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) return null;
  }
  console.log("AccessToken", accessToken);

  const parsedJwt = parseJwt(accessToken);

  if (parsedJwt.invalid) {
    console.log("AccessToken", parsedJwt.invalid);
    console.log("Invalid access token.");
    sessionStorage.removeItem("accessToken");
    return null;
  }
  const sub = parsedJwt?.sub;
  if (!sub) return null;

  console.log("AccessToken Check", parsedJwt);
  return sub;
};

interface JWT {
  sub?: string;
  exp?: number;
  invalid: boolean;
}

// Parses Jwt. **Doesn't throw any exception
const parseJwt = (token: string): JWT => {
  try {
    const baseSplit = token.split(".");
    if (baseSplit.length !== 3) throw new Error("Token has been tampered");
    const str = baseSplit[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsedJwt = JSON.parse(jsonPayload);
    if (Date.now() > parsedJwt.exp * 1000) {
      throw new Error("Token expired");
    }

    return { ...parsedJwt, invalid: false };
  } catch {
    return { invalid: true };
  }
};

// Converts string to title case
const toTitleCase = (str: string) =>
  str
    .split(/[\s_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export { loggedInOrNot, parseJwt, toTitleCase };

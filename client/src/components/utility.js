const loggedInOrNot = () => {
  // NOTE: This means The refresh token has not expired yet
  const accessToken = sessionStorage.getItem("accessToken");
  console.log("AccessToken", accessToken);
  if (accessToken) {
    const parsedJwt = parseJwt(accessToken);
    if (parsedJwt.invalid) {
      console.log("AccessToken", parsedJwt.invalid);
      console.log("Invalid access token.");
      sessionStorage.removeItem("accessToken");
      return false;
    } else if ("sub" in parsedJwt) {
      console.log("AccessToken Check", parsedJwt);
      return parsedJwt.sub;
    }
  }
  return false;
};

/**
 *
 * Parses Jwt. **Doesn't throw any exception**
 * @param {string} token
 * @returns {object}
 */
const parseJwt = (token) => {
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

/**
 *
 * Converts string to title case
 * @param {string} str
 * @returns {string}
 */
const toTitleCase = (str) =>
  str
    .split(/[\s_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export { loggedInOrNot, parseJwt, toTitleCase };

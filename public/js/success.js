window.onload = () => {
  main();
};

function main() {
  const fragment = new URLSearchParams(window.location.hash.slice(1));

  if (fragment.has("access_token")) {
    const urlState = fragment.get("state");
    const stateParameter = localStorage.getItem("stateParameter");
    if (stateParameter !== urlState) {
      return console.log("You may have been clickjacked!");
    }

    const accessToken = fragment.get("access_token");
    const tokenType = fragment.get("token_type");

    //
    sessionStorage.setItem("d_tokenType", tokenType);
    sessionStorage.setItem("d_access_token", accessToken);
    sessionStorage.setItem("d_state", urlState);

    window.location.href = "/";
  } else {
    const randStr = generateRandomString_v3();
    localStorage.setItem("stateParameter", randStr);
    window.location.href = "/#state=" + encodeURIComponent(btoa(randStr));
  }
}

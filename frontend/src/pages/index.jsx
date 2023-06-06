function IndexPage() {
  return (
    <div>
      {/* <!-- Ask the user to visit this page and click the verify button --> */}
      {/* <!-- Replace the URL as mentioned in Step 10 in README --> */}
      <a href="https://discord.com/api/oauth2/authorize?client_id=1115694953742467133&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fverify&response_type=code&scope=identify%20email%20guilds.join">
        Verify for Open Source BootCamp (Discord Auth Required)
      </a>
      <p>I know this can be styled better :)</p>
    </div>
  );
}

export default IndexPage;
